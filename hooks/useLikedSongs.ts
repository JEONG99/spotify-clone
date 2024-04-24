import getLikedSongs from "@/actions/getLikedSongs";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

const useLikedSongs = () => {
  const queryClient = useQueryClient();
  const { supabaseClient, session } = useSessionContext();
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["likedSongs"],
    queryFn: () =>
      getLikedSongs({ supabase: supabaseClient, userId: session?.user.id }),
    enabled: !!session?.user.id,
  });

  useEffect(() => {
    if (!session?.user.id) {
      queryClient.removeQueries({ queryKey: ["likedSongs"] });
    }
  }, [session, queryClient]);

  return { data, isLoading, isError, refetch };
};

export default useLikedSongs;
