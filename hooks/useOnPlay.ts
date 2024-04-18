import { useUser } from "@supabase/auth-helpers-react";
import toast from "react-hot-toast";

import usePlayer from "@/hooks/usePlayer";
import { Song } from "@/types";

const useOnPlay = (songs: Song[]) => {
  const { setId, setIds } = usePlayer();
  const user = useUser();

  const onPlay = (id: string) => {
    if (!user) {
      toast.error("로그인을 해 주세요!");
      return;
    }
    setId(id + "");
    setIds(songs.map((song) => song.id + ""));
  };

  return onPlay;
};

export default useOnPlay;
