import words from "@/components/words.json";

export async function generateStaticParams() {
  const params = [];

  for (let i = 0; i < words.length; i++) {
    params.push({ id: i.toString() });
  }

  return params;
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  return Response.json(words[parseInt((await params).id)]);
}
