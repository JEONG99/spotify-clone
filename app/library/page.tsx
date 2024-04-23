import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

import getLikedSongs from "@/actions/getLikedSongs";
import Header from "@/components/Header";
import PageContent from "@/components/PageContent";
import { Separator } from "@/components/ui/separator";

const LibraryPage = async () => {
  const supabase = createServerComponentClient({
    cookies: cookies,
  });
  const user = (await supabase.auth.getUser()).data.user;
  const songs = await getLikedSongs({ supabase, userId: user?.id });

  return (
    <div>
      <Header />
      <div className="overflow-y-auto py-6">
        <h2 className="mb-6 text-3xl font-bold">내 라이브러리</h2>
        <PageContent songs={songs} />
        <Separator className="my-6 bg-neutral-300" />
        <span className="text-sm text-neutral-300">© 2024 Jeongbaang</span>
      </div>
    </div>
  );
};

export default LibraryPage;
