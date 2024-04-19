import getLikedSongs from "@/actions/getLikedSongs";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { useQuery } from "@tanstack/react-query";

const useLikedSongs = () => {
  const { supabaseClient, session } = useSessionContext();
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["likedSongs"],
    queryFn: () =>
      getLikedSongs({ supabase: supabaseClient, userId: session?.user.id }),
    enabled: !!session?.user.id,
  });
  return { data, isLoading, isError, refetch };
};

export default useLikedSongs;
