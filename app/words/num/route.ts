import words from "@/components/words.json";

export const dynamic = "force-static"

export async function GET(_request: Request) {
  return Response.json({
    num: words.length,
  });
}
