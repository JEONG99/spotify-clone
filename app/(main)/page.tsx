import getSongs from "@/actions/getSongs";
import Header from "@/components/Header";
import { Separator } from "@/components/ui/separator";
import PageContent from "@/components/PageContent";
import { AiOutlinePlus } from "react-icons/ai";
import AddSongButton from "./components/AddSongButton";

export const revalidate = 0;

export default async function Home() {
  const songs = await getSongs();

  return (
    <div>
      <Header />
      <div className="overflow-y-auto py-6">
        <h2 className="flex justify-between items-center mb-6 text-3xl font-bold">
          전체 노래
          <AddSongButton />
        </h2>
        <PageContent songs={songs} />
        <Separator className="my-6 bg-neutral-300" />
        <span className="text-sm text-neutral-300">© 2024 Jeongbaang</span>
      </div>
    </div>
  );
}
