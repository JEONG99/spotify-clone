import { useSessionContext } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

import { useUser } from "@/hooks/useUser";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import getLikedSong from "@/actions/getLikedSong";
import { Song } from "@/types";

interface LikeButtonProps {
  songId: string;
}

const LikeButton: React.FC<LikeButtonProps> = ({ songId }) => {
  const router = useRouter();
  const { supabaseClient } = useSessionContext();
  const { user } = useUser();

  const queryClient = useQueryClient();
  const { data: isLiked, refetch: refetchSong } = useQuery({
    queryKey: ["likedSong", songId],
    queryFn: () =>
      getLikedSong({
        supabase: supabaseClient,
        userId: user?.id,
        songId,
      }),
    retry: false,
  });

  const Icon = isLiked ? AiFillHeart : AiOutlineHeart;

  const handleLiked = async () => {
    if (!user?.id) {
      toast.error("로그인을 해 주세요!");
      return;
    }
    if (isLiked) {
      const { error } = await supabaseClient
        .from("liked_songs")
        .delete()
        .eq("user_id", user.id)
        .eq("song_id", songId);

      if (error) {
        toast.error(error.message);
      } else {
        refetchSong();
      }
    } else {
      const { error } = await supabaseClient.from("liked_songs").insert({
        song_id: songId,
        user_id: user.id,
      });

      if (error) {
        toast.error(error.message);
      } else {
        const { data: newSong } = await supabaseClient
          .from("songs")
          .select("*")
          .eq("id", songId)
          .single();
        queryClient.setQueryData(["likedSongs"], (prev: Song[]) => {
          if (!prev.find((song) => song.id === songId)) {
            return [...prev, newSong];
          }
          return prev;
        });
        refetchSong();
      }
    }
    router.refresh();
  };

  return (
    <button className="hover:opacity-75 transition" onClick={handleLiked}>
      <Icon color={isLiked ? "#22c55e" : "white"} size={25} />
    </button>
  );
};

export default LikeButton;
