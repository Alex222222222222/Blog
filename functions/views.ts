interface Env {
  VIEWS_BACKEND_KEY: string;
}

/**
 * The onRequest handler for the page.
 * @param context - The environment variables.
 * @returns The response from the Google Analytics API.
 */
export const onRequest: PagesFunction<Env> = async (context) => {
  // get number of days to look back from the url query
  const url = new URL(context.request.url);
  const params = url.searchParams;
  params.set("backend_key", context.env.VIEWS_BACKEND_KEY);

  // construct the new URL
  const newUrl = new URL("https://alex1222.com/views_backend");
  // set the query parameters
  newUrl.search = params.toString();

  const request = new Request(newUrl.toString(), {
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

  const cache = caches.default;

  let response = await cache.match(request);
  if (!response) {
    response = await fetch(request);
    context.waitUntil(cache.put(request, response.clone()));
    return new Response("Not Cached");
  }

  return new Response("Cached");
  return response;
};
