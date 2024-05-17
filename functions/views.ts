interface Env {}

/**
 * The onRequest handler for the page.
 * @param context - The environment variables.
 * @returns The response from the Google Analytics API.
 */
export const onRequest: PagesFunction<Env> = async (context) => {
  // get number of days to look back from the url query
  const url = new URL(context.request.url);

  // construct the new URL
  const newUrl = new URL("https://alex1222.com/views_backend");
  // set the query parameters
  newUrl.search = url.search;

  return await fetch(newUrl, {
    method: "GET",
    cf: {
      // Always cache this fetch regardless of content type
      cacheEverything: true,
      cacheTtlByStatus: {
        "200-299": 600,
        404: 1,
        "500-599": 0,
      },
    },
  });
};
