"use client";

import SongItem from "@/components/SongItem";
import useOnPlay from "@/hooks/useOnPlay";
import { Song } from "@/types";

interface PageContentProps {
  songs: Song[];
}

const PageContent: React.FC<PageContentProps> = ({ songs }) => {
  const onPlay = useOnPlay(songs);

  if (songs.length === 0) {
    return (
      <div className="mt-4 text-neutral-400">재생 가능한 노래가 없습니다</div>
    );
  }
  return (
    <div className="grid  grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
      {songs.map((song) => (
        <SongItem key={song.id} song={song} onPlay={onPlay} />
      ))}
    </div>
  );
};

export default PageContent;
