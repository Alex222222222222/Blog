interface Env {
  GOOGLE_ANALYTIC_PROPERTY_ID: string;
  GOOGLE_ANALYTIC_CREDENTIALS_CLIENT_EMAIL: string;
  GOOGLE_ANALYTIC_CREDENTIALS_PRIVATE_KEY: string;
  GOOGLE_ANALYTIC_CREDENTIALS_JWT_KID: string;
}

import jwt from "jsonwebtoken";

const ACCESS_TOKEN_ENDPOINT = "https://sts.googleapis.com/v1beta/token";

export const onRequest: PagesFunction<Env> = async (context) => {
  // try get the access token
  // create JWT token header
  const JWTToken = jwt.sign(
    {
      iss: context.env.GOOGLE_ANALYTIC_CREDENTIALS_CLIENT_EMAIL,
      scope: "https://www.googleapis.com/auth/analytics.readonly",
      aud: "https://oauth2.googleapis.com/token",
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000 + 3600),
    },
    context.env.GOOGLE_ANALYTIC_CREDENTIALS_PRIVATE_KEY,
    {
      algorithm: "RS256",
      header: {
        alg: "RS256",
        typ: "JWT",
        kid: context.env.GOOGLE_ANALYTIC_CREDENTIALS_JWT_KID,
      },
    }
  );

  /*
  const analyticsDataClient = new BetaAnalyticsDataClient({
    credentials: {
      client_email: context.env.GOOGLE_ANALYTIC_CREDENTIALS_CLIENT_EMAIL,
      private_key: context.env.GOOGLE_ANALYTIC_CREDENTIALS_PRIVATE_KEY,
    },
  });



  const report = await analyticsDataClient
    .runReport({
      property: `properties/${context.env.GOOGLE_ANALYTIC_PROPERTY_ID}`,
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
          startDate: "yesterday",
          endDate: "today",
        },
      ],
    })
    .finally(() => {
      analyticsDataClient.close();
    });
    */

  return new Response(JWTToken);
};
