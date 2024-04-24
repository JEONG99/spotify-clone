import Header from "@/components/Header";
import { Separator } from "@/components/ui/separator";
import SearchInput from "@/app/search/components/SearchInput";
import getSongsByTitle from "@/actions/getSongsByTitle";
import PageContent from "@/components/PageContent";

interface SearchPageProps {
  searchParams: {
    title: string;
  };
}

export const revalidate = 0;

export default async function Search({ searchParams }: SearchPageProps) {
  const songs = await getSongsByTitle(searchParams.title);

  return (
    <div>
      <Header />
      <div className="overflow-y-auto py-6">
        <div className="mb-4 flex flex-col gap-y-4">
          <h2 className="text-white text-3xl font-bold">검색</h2>
          <SearchInput />
        </div>
        <PageContent songs={songs} />
        <Separator className="my-6 bg-neutral-300" />
        <span className="text-sm text-neutral-300">© 2024 Jeongbaang</span>
      </div>
    </div>
  );
}
