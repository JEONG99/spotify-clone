import { SupabaseClient } from "@supabase/supabase-js";

interface getLikedSongProps {
  supabase: SupabaseClient;
  songId: string;
  userId: string | undefined;
}

const getLikedSong = async ({
  supabase,
  songId,
  userId,
}: getLikedSongProps): Promise<boolean> => {
  const { data, error } = await supabase
    .from("liked_songs")
    .select("*")
    .eq("user_id", userId)
    .eq("song_id", songId)
    .maybeSingle();
  if (error) {
    throw error;
  }
  if (!data) {
    return false;
  }
  return true;
};

export default getLikedSong;
