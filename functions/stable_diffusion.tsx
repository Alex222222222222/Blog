import { Ai } from "@cloudflare/ai";

interface Env {
  STABLE_DIFFUSION: any;
}

export const onRequest: PagesFunction<Env> = async (context) => {
  const ai = new Ai(context.env.STABLE_DIFFUSION);

  const inputs = {
    prompt: "cyberpunk cat",
  };

  const response = await ai.run(
    "@cf/stabilityai/stable-diffusion-xl-base-1.0",
    inputs
  );

  return new Response(response, {
    headers: {
      "content-type": "image/png",
    },
  });
};
