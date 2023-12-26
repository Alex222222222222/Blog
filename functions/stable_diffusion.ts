import { Ai } from "@cloudflare/ai";
import { AiTextToImageInput } from "@cloudflare/ai/dist/tasks/text-to-image";

interface Env {
  STABLE_DIFFUSION: any;
  STABLE_DIFFUSION_RESULT: R2Bucket;
  STABLE_DIFFUSION_D1: D1Database;
  TURNSTILE_SECRETE_KEY: string;
}

// the minimum interval between two requests in milliseconds
const MIN_REQUEST_INTERVAL: number = 30000;
// the base ur for r2
const R2_BASE_URL: string =
  "https://blog-stable-diffusion-result-r2.alex1222.com/";

// return the r2 url for the id
function get_r2_url(id: number): string {
  return R2_BASE_URL + id.toString() + ".png";
}

async function verify_turnstile_response(
  response: string,
  secret_key: string,
  ip: string
): Promise<boolean> {
  // Validate the token by calling the
  // "/siteverify" API endpoint.
  let formData = new FormData();
  formData.append("secret", secret_key);
  formData.append("response", response);
  formData.append("remoteip", ip);

  const url = "https://challenges.cloudflare.com/turnstile/v0/siteverify";
  const result = await fetch(url, {
    body: formData,
    method: "POST",
  });

  const outcome: {
    success: boolean;
  } = await result.json();
  if (outcome.success) {
    return true;
  }

  return false;
}

export const onRequest: PagesFunction<Env> = async (context) => {
  const url = new URL(context.request.url);
  const ip = context.request.headers.get("cf-connecting-ip");
  const cf_turnstile_response = url.searchParams.get("cf_turnstile_response");

  // check if request of the turnstile is valid
  if (
    !cf_turnstile_response ||
    !(await verify_turnstile_response(
      cf_turnstile_response,
      context.env.TURNSTILE_SECRETE_KEY,
      ip
    ))
  ) {
    return new Response("Require Human Verification", { status: 403 });
  }

  const d1 = context.env.STABLE_DIFFUSION_D1;

  // get the prompt from the query string
  const prompt = url.searchParams.get("prompt");

  // if prompt is empty or not set, set it to "cyberpunk cat"
  const promptText = prompt || "cyberpunk cat";

  // query from STABLE_DIFFUSION_D1 for the prompt
  // if it exists, return the result
  const promptResult: D1Result<Record<string, unknown>> = await d1
    .prepare("select * from STABLE_DIFFUSION_RESULT where PROMPT = ? limit 1")
    .bind(promptText)
    .all();
  if (promptResult.results.length > 0) {
    // if it exists, return the result
    const result = promptResult.results[0];
    return new Response(get_r2_url(result.ID as number));
  }

  // check if the ip accessing the function in the last 30 seconds
  // if it is, return too many requests
  const now = Date.now();
  const lastRequest: D1Result<Record<string, unknown>> = await d1
    .prepare("select * from ACCESS_COUNTING where IP = ?")
    .bind(ip)
    .all();
  // check if lastRequest is empty
  if (lastRequest.results.length > 0) {
    const lastRequestTime: number = lastRequest.results[0]
      .LAST_ACCESS_TIME as number;
    if (now - lastRequestTime < MIN_REQUEST_INTERVAL) {
      return new Response("Too many requests", { status: 429 });
    }
    // update the last access time
    await d1
      .prepare("update ACCESS_COUNTING set LAST_ACCESS_TIME = ? where IP = ?")
      .bind(now, ip)
      .run();
  } else {
    // if lastRequest is empty, insert a new record
    await d1
      .prepare(
        "insert into ACCESS_COUNTING (IP, LAST_ACCESS_TIME) values (?, ?)"
      )
      .bind(ip, now)
      .run();
  }

  // run the AI task
  const ai = new Ai(context.env.STABLE_DIFFUSION);

  const inputs: AiTextToImageInput = {
    prompt: promptText,
  };

  const response = await ai.run(
    "@cf/stabilityai/stable-diffusion-xl-base-1.0",
    inputs
  );

  // create new record in the database
  await d1
    .prepare("insert into STABLE_DIFFUSION_RESULT (PROMPT) values (?)")
    .bind(promptText)
    .run();

  // get the id of the new record
  const newResult: D1Result<Record<string, unknown>> = await d1
    .prepare("select * from STABLE_DIFFUSION_RESULT where PROMPT = ? limit 1")
    .bind(promptText)
    .all();
  const newResultId = newResult.results[0].ID as number;

  // upload the result to the r2 bucket
  const r2 = context.env.STABLE_DIFFUSION_RESULT;
  await r2.put(newResultId.toString() + ".png", response);

  return new Response(get_r2_url(newResultId));
};
