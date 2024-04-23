import Header from "@/components/Header";
import { Separator } from "@/components/ui/separator";

export default async function Search() {
  return (
    <div>
      <Header />
      <div className="overflow-y-auto py-6">
        <h2 className="mb-6 text-3xl font-bold">검색 결과</h2>
        <Separator className="my-6 bg-neutral-300" />
        <span className="text-sm text-neutral-300">© 2024 Jeongbaang</span>
      </div>
    </div>
  );
}
