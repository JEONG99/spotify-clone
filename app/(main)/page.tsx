import getSongs from "@/actions/getSongs";
import Header from "@/components/Header";
import { Separator } from "@/components/ui/separator";
import PageContent from "@/app/(main)/components/PageContent";

export default async function Home() {
  const songs = await getSongs();

  return (
    <div>
      <Header />
      <div className="overflow-y-auto py-6">
        <h2 className="mb-6 text-3xl font-bold">인기 노래</h2>
        <PageContent songs={songs} />
        <Separator className="my-6 bg-neutral-300" />
        <span className="text-sm text-neutral-300">© 2024 Jeongbaang</span>
      </div>
    </div>
  );
}
