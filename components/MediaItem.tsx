import Image from "next/image";

import { Song } from "@/types";

interface MediaItemProps {
  song: Song;
}

const MediaItem: React.FC<MediaItemProps> = ({ song }) => {
  return (
    <div className="flex items-center gap-x-3 cursor-pointer hover:bg-neutral-800/50 w-full p-2 rounded-md">
      <div className="relative rounded-md min-h-[48px] min-w-[48px] overflow-hidden">
        <Image
          fill
          src={song.image_path || "/images/liked.png"}
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
