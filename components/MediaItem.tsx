"use client";

import Image from "next/image";

import { Song } from "@/types";
import useLoadImage from "@/hooks/useLoadImage";

interface MediaItemProps {
  song: Song;
  onPlay?: (id: string) => void;
}

const MediaItem: React.FC<MediaItemProps> = ({ song, onPlay }) => {
  const imagePath = useLoadImage(song);

  const handleClick = () => {
    if (onPlay) {
      return onPlay(song.id);
    }
  };

  return (
    <div
      className="flex items-center gap-x-3 cursor-pointer hover:bg-neutral-800/50 w-full p-2 rounded-md"
      onClick={handleClick}
    >
      <div className="relative rounded-md min-h-[48px] min-w-[48px] overflow-hidden">
        <Image
          fill
          src={imagePath || "/images/liked.png"}
          alt="Media Item"
          className="object-cover"
        />
      </div>
      <div className="flex flex-col gap-y-1 overflow-hidden">
        <p className="text-white truncate font-semibold">{song.title}</p>
      </div>
    </div>
  );
};

export default MediaItem;
