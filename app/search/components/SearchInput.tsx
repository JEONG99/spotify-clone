"use client";

import { useEffect, useState } from "react";
import { useDebounce } from "@uidotdev/usehooks";
import { useRouter } from "next/navigation";
import qs from "query-string";

import { Input } from "@/components/ui/input";

const SearchInput = () => {
  const router = useRouter();
  const [value, setValue] = useState("");
  const debouncedValue = useDebounce(value, 500);

  useEffect(() => {
    const query = {
      title: debouncedValue,
    };
    const url = qs.stringifyUrl({
      url: "/search",
      query: query,
    });
    router.push(url);
  }, [debouncedValue, router]);

  return (
    <Input
      className="text-neutral-300 bg-neutral-900 border-neutral-300 focus-visible:ring-0 focus-visible:ring-offset-0 hover:bg-neutral-800 caret-neutral-300"
      placeholder="어떤 노래를 찾으시나요?"
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
};

export default SearchInput;
