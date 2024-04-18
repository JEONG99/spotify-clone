"use client";

import useGetSongById from "@/hooks/useGetSongById";
import usePlayer from "@/hooks/usePlayer";
import PlayerContent from "@/components/PlayerContent";

const Player = () => {
  const { activeId } = usePlayer();
  const { song } = useGetSongById(activeId);

  if (!song || !activeId) return null;
  return (
    <div className="fixed bottom-0 bg-black w-full py-2 h-[80px] px-4">
      <PlayerContent song={song} />
    </div>
  );
};

export default Player;