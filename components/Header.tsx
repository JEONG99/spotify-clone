"use client";

import { useRouter } from "next/navigation";
import { RxCaretLeft, RxCaretRight } from "react-icons/rx";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import toast from "react-hot-toast";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import KakaoLogIn from "@/components/KakaoLogIn";
import { useUser } from "@/hooks/useUser";

const Header = () => {
  const router = useRouter();
  const { userDetails } = useUser();
  const supabase = useSupabaseClient();

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    router.refresh();
    if (error) {
      toast.error(error.message);
    } else {
      toast.success("로그아웃!");
    }
  };

  return (
    <div className="sticky top-0 bg-neutral-900 flex justify-between px-6 py-2">
      <div className="flex gap-2 items-center">
        <button
          className="bg-black rounded-full cursor-pointer hover:opacity-75"
          onClick={() => router.back()}
        >
          <RxCaretLeft size={32} />
        </button>
        <button
          className="bg-black rounded-full cursor-pointer hover:opacity-75"
          onClick={() => router.forward()}
        >
          <RxCaretRight size={32} />
        </button>
      </div>
      <div className="flex justify-between items-center gap-x-2">
        {userDetails ? (
          <div className="flex gap-x-2 items-center">
            <Button
              className="bg-transparent px-6 py-2 text-neutral-300 font-semibold text-lg"
              onClick={handleLogout}
            >
              로그아웃
            </Button>
            <Button className="relative bg-transparent w-8 h-8 rounded-md overflow-hidden hover:scale-110 transition-transform">
              <Image src={userDetails.avatar_url} alt="" fill />
            </Button>
          </div>
        ) : (
          <div>
            <KakaoLogIn />
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
