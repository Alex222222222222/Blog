interface Env {
  BLOG_VIEWS: KVNamespace;
  GOOGLE_ANALYTIC_PROPERTY_ID: string;
  GOOGLE_ANALYTIC_CREDENTIALS_CLIENT_EMAIL: string;
  GOOGLE_ANALYTIC_CREDENTIALS_PRIVATE_KEY: string;
  GOOGLE_ANALYTIC_CREDENTIALS_JWT_KID: string;
}

const ACCESS_TOKEN_ENDPOINT = "https://oauth2.googleapis.com/token";

interface GoogleAccessTokenResponse {
  access_token: string;
  expires_in: number;
  token_type: string;
  scope: string;
}
/**
 * Sample data:
 * {
 *   "dimensionHeaders": [
 *     {
 *       "name": "pagePath"
 *     }
 *   ],
 *   "metricHeaders": [
 *     {
 *       "name": "screenPageViews",
 *       "type": "TYPE_INTEGER"
 *     }
 *   ],
 *   "rows": [
 *     {
 *       "dimensionValues": [
 *         {
 *           "value": "/posts/2024-03-07-Run-Witcher3-On-MacOS.md"
 *         }
 *       ],
 *       "metricValues": [
 *         {
 *           "value": "3"
 *         }
 *       ]
 *     },
 *     {
 *       "dimensionValues": [
 *         {
 *           "value": "/posts/2024-05-10-TheSevenSnowWhitePrincessesAndTheEnviousDwarf.md"
 *         }
 *       ],
 *       "metricValues": [
 *         {
 *           "value": "3"
 *         }
 *       ]
 *     },
 *     {
 *       "dimensionValues": [
 *         {
 *           "value": "/i/"
 *         }
 *       ],
 *       "metricValues": [
 *         {
 *           "value": "2"
 *         }
 *       ]
 *     }
 *   ],
 *   "rowCount": 3,
 *   "metadata": {
 *     "currencyCode": "CNY",
 *     "timeZone": "Asia/Shanghai"
 *   },
 *   "kind": "analyticsData#runReport"
 * }
 */
interface GoogleAnalyticsReportRequestBody {
  kind?: string;
  metadata?: {
    currencyCode?: string;
    timeZone?: string;
  };
  rowCount?: number;
  rows?: {
    dimensionValues: {
      value: string;
    }[];
    metricValues: {
      value: string;
    }[];
  }[];
  dimensionHeaders?: {
    name: string;
  }[];
  metricHeaders?: {
    name: string;
    type: string;
  }[];
}

interface MyResponse {
  days: number;
  path: string;
  views: number;
}

/**
 * Encode a Uint8Array to a Base64 URL-safe string.
 * @param uint8Array - The input Uint8Array.
 * @returns A Base64 URL-safe encoded string.
 */
function uint8ArrayToBase64Url(uint8Array: Uint8Array): string {
  const base64 = uint8ArrayToBase64(uint8Array);
  return base64ToBase64Url(base64);
}

/**
 * Encode a Uint8Array to a Base64 string.
 * @param uint8Array - The input Uint8Array.
 * @returns A Base64 encoded string.
 */
function uint8ArrayToBase64(uint8Array: Uint8Array): string {
  let binary = "";
  const len = uint8Array.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(uint8Array[i]);
  }
  return btoa(binary);
}

/**
 * Convert a Base64 string to a Base64 URL-safe string.
 * @param base64 - The input Base64 string.
 * @returns A Base64 URL-safe encoded string.
 */
function base64ToBase64Url(base64: string): string {
  return base64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

/**
 * Encode a String to a Base64 string.
 * @param s - The input String.
 * @returns A Base64 URL-safe encoded string.
 */
function stringToBase64Url(s: string): string {
  return base64ToBase64Url(btoa(s));
}

/**
 * Encode a ArrayBuffer to a Base64 string.
 * @param arrayBuffer - The input ArrayBuffer.
 * @returns A Base64 URL-safe encoded string.
 */
function arrayBufferToBase64Url(arrayBuffer: ArrayBuffer): string {
  return uint8ArrayToBase64Url(new Uint8Array(arrayBuffer));
}

/*
Convert a string into an ArrayBuffer
from https://developers.google.com/web/updates/2012/06/How-to-convert-ArrayBuffer-to-and-from-String
*/
function str2ab(str: string) {
  const buf = new ArrayBuffer(str.length);
  const bufView = new Uint8Array(buf);
  for (let i = 0, strLen = str.length; i < strLen; i++) {
    bufView[i] = str.charCodeAt(i);
  }
  return buf;
}

/**
 * Get the Google Analytics access token.
 * For more information, see https://developers.google.com/identity/protocols/oauth2/service-account#httprest
 * @param kv - The KV namespace to store the access token.
 * @param kid - The key ID of the service account.
 * @param client_email - The email address of the service account.
 * @param private_key - The private key of the service account.
 * @returns The Google Analytics access token.
 */
async function getGoogleAccessToken(
  kv: KVNamespace,
  kid: string,
  client_email: string,
  private_key: string
): Promise<string> {
  // test if the access_token is already in the kv
  const accessTokenKV = await kv.get("access_token");
  if (accessTokenKV) {
    return accessTokenKV;
  }

  // not in the kv, create a new access token
  // create JWT token header
  const base64URLJWTHeader = stringToBase64Url(
    JSON.stringify({
      alg: "RS256",
      typ: "JWT",
      kid: kid,
    })
  );
  const base64URLJWTClaimSet = stringToBase64Url(
    JSON.stringify({
      iss: client_email,
      scope: "https://www.googleapis.com/auth/analytics.readonly",
      aud: "https://oauth2.googleapis.com/token",
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000 + 3600),
    })
  );

  let cryptoKey = await crypto.subtle.importKey(
    "pkcs8",
    str2ab(atob(private_key)),
    { name: "RSASSA-PKCS1-V1_5", hash: "SHA-256" },
    false,
    ["sign"]
  );

  const signature = arrayBufferToBase64Url(
    await crypto.subtle.sign(
      "RSASSA-PKCS1-V1_5",
      cryptoKey,
      str2ab(`${base64URLJWTHeader}.${base64URLJWTClaimSet}`)
    )
  );

  const jwt = `${base64URLJWTHeader}.${base64URLJWTClaimSet}.${signature}`;

  const params = new URLSearchParams();
  params.append("grant_type", "urn:ietf:params:oauth:grant-type:jwt-bearer");
  params.append("assertion", jwt);

  const response = await fetch(ACCESS_TOKEN_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: params,
  });

  const accessTokenResponse: GoogleAccessTokenResponse = await response.json();
  const accessToken = accessTokenResponse.access_token;

  // save the access token to KV
  const expires_in = accessTokenResponse.expires_in - 60;
  if (expires_in <= 0) {
    return accessToken;
  }
  await kv.put("access_token", accessToken, {
    expirationTtl: expires_in,
  });

  return accessToken;
}

/**
 * Calculate the cache TTL based on the number of days.
 * @param days - The number of days.
 * @returns The cache TTL.
 */
function calculateCacheTTL(days: number): number {
  if (days <= 12) {
    return days * 60 * 60;
  }
  if (days >= 1000) {
    return 60 * (12 * 60 + (1000 - 12));
  }
  return 60 * (12 * 60 + (days - 12));
}

/**
 * The onRequest handler for the page.
 * @param context - The environment variables.
 * @returns The response from the Google Analytics API.
 */
export const onRequest: PagesFunction<Env> = async (context) => {
  // get number of days to look back from the url query
  const url = new URL(context.request.url);
  let days = parseInt(url.searchParams.get("days") || "1");
  if (days < 1) {
    days = 1;
  }
  if (days !== 1 && days !== 7 && days !== 30 && days !== 1000) {
    days = 1;
  }
  const cacheTTL = calculateCacheTTL(days);
  // get the requested page path from the url query
  const path = url.searchParams.get("path") || "";
  // decode the path
  const decodedPath = decodeURIComponent(path);
  // try get cached result from KV
  const cachedResult = await context.env.BLOG_VIEWS.get(
    `${days}-${decodedPath}`
  );
  if (cachedResult) {
    const myResponse: MyResponse = {
      days: days,
      path: decodedPath,
      views: parseInt(cachedResult),
    };
    return new Response(JSON.stringify(myResponse), {
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
  const cachedTotalResult = await context.env.BLOG_VIEWS.get(`${days}-`);
  if (cachedTotalResult) {
    const myResponse: MyResponse = {
      days: days,
      path: decodedPath,
      views: parseInt(cachedResult),
    };
    return new Response(JSON.stringify(myResponse), {
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  const accessToken = await getGoogleAccessToken(
    context.env.BLOG_VIEWS,
    context.env.GOOGLE_ANALYTIC_CREDENTIALS_JWT_KID,
    context.env.GOOGLE_ANALYTIC_CREDENTIALS_CLIENT_EMAIL,
    context.env.GOOGLE_ANALYTIC_CREDENTIALS_PRIVATE_KEY
  );

  const reportRequestBody = {
    dimensions: [
      {
        name: "pagePath",
      },
    ],
    metrics: [
      {
        name: "screenPageViews",
      },
    ],
    dateRanges: [
      {
        startDate: `${days}daysAgo`,
        endDate: "today",
      },
    ],
  };
  const reportRequestHeaders = {
    Authorization: `Bearer ${accessToken}`,
    "Content-Type": "application/json; charset=utf-8",
  };
  const reportEndpoint = `https://analyticsdata.googleapis.com/v1beta/properties/${context.env.GOOGLE_ANALYTIC_PROPERTY_ID}:runReport`;

  const reportResponse = await fetch(reportEndpoint, {
    method: "POST",
    headers: reportRequestHeaders,
    body: JSON.stringify(reportRequestBody),
  });

  const reportResponseBody: GoogleAnalyticsReportRequestBody =
    await reportResponse.json();

  let totalViews = 0;
  for (const data of reportResponseBody.rows) {
    const path = data.dimensionValues[0].value;
    const views = parseInt(data.metricValues[0].value);
    totalViews += views;
    // save the views to KV
    await context.env.BLOG_VIEWS.put(`${days}-${path}`, views.toString(), {
      expirationTtl: cacheTTL,
    });
  }
  // save the total views to KV
  await context.env.BLOG_VIEWS.put(`${days}-`, totalViews.toString(), {
    expirationTtl: cacheTTL,
  });

  const result =
    (await context.env.BLOG_VIEWS.get(`${days}-${decodedPath}`)) || "0";
  const myResponse: MyResponse = {
    days: days,
    path: decodedPath,
    views: parseInt(result),
  };

  return new Response(JSON.stringify(myResponse), {
    headers: {
      "Content-Type": "application/json",
    },
  });
};
