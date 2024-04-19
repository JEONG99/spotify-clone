import { Song } from "@/types";
import { SupabaseClient } from "@supabase/supabase-js";

interface getLikedSongsProps {
  supabase: SupabaseClient;
  userId: string | undefined;
}

const getLikedSongs = async ({
  supabase,
  userId,
}: getLikedSongsProps): Promise<Song[]> => {
  const { data, error } = await supabase
    .from("liked_songs")
    .select("*, songs(*)")
    .eq("user_id", userId)
    .order("created_at", { ascending: true });

  if (error) {
    throw error;
  }
  if (!data) {
    return [];
  }
  return data.map((item) => ({ ...item.songs }));
};

export default getLikedSongs;
