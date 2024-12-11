// app/page.tsx

import HomeAbout from "@/components/homeAbout";
import HomeCredits from "@/components/homeCredits";
import SeparateLine from "@/components/hr";
import PostList from "@/components/postList";

export default async function Page() {
  return (
    <>
      <HomeAbout />
      <SeparateLine />
      <PostList />
      <SeparateLine />
      <HomeCredits />
    </>
  );
}
