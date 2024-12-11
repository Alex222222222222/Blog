import words from "@/components/words.json";

export const dynamic = "force-static";

export async function GET() {
  return Response.json({
    num: words.length,
  });
}
