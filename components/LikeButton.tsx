import { useSessionContext } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

import { useUser } from "@/hooks/useUser";

interface LikeButtonProps {
  songId: string;
}

const LikeButton: React.FC<LikeButtonProps> = ({ songId }) => {
  const router = useRouter();
  const { supabaseClient } = useSessionContext();
  const { user } = useUser();

  const [isLiked, setIsLiked] = useState(false);

  const Icon = isLiked ? AiFillHeart : AiOutlineHeart;

  useEffect(() => {
    if (!user?.id) return;

    const fetchData = async () => {
      const { data, error } = await supabaseClient
        .from("liked_songs")
        .select("*")
        .eq("user_id", user.id)
        .eq("song_id", songId)
        .single();
      if (data && !error) {
        setIsLiked(true);
      }
    };
    fetchData();
  }, [user, supabaseClient, songId]);

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
        setIsLiked(false);
      }
    } else {
      const { error } = await supabaseClient.from("liked_songs").insert({
        song_id: songId,
        user_id: user.id,
      });

      if (error) {
        toast.error(error.message);
      } else {
        setIsLiked(true);
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
