import { BetaAnalyticsDataClient } from "@google-analytics/data";

interface Env {
  GOOGLE_ANALYTIC_PROPERTY_ID: string;
  GOOGLE_ANALYTIC_CREDENTIALS_CLIENT_EMAIL: string;
  GOOGLE_ANALYTIC_CREDENTIALS_PRIVATE_KEY: string;
}

export const onRequest: PagesFunction<Env> = async (context) => {
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

  return new Response(JSON.stringify(report));
};
