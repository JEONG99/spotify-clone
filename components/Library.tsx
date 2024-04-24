import Link from "next/link";
import { usePathname } from "next/navigation";
import { TbPlaylist } from "react-icons/tb";

import MediaItem from "@/components/MediaItem";
import LikeButton from "@/components/LikeButton";
import useOnPlay from "@/hooks/useOnPlay";
import useLikedSongs from "@/hooks/useLikedSongs";
import { twMerge } from "tailwind-merge";

const Library = () => {
  const pathname = usePathname();
  const { data: songs } = useLikedSongs();
  const onPlay = useOnPlay(songs || []);

  return (
    <div>
      <div className="flex justify-between items-center p-5">
        <Link
          href="/library"
          className={twMerge(
            "flex items-center gap-2 group cursor-pointer",
            pathname === "/library" ? "text-white" : "text-neutral-300"
          )}
        >
          <TbPlaylist
            size={28}
            className="group-hover:text-white transition-colors"
          />
          <span className="font-semibold group-hover:text-white transition-colors">
            내 라이브러리
          </span>
        </Link>
      </div>
      <ul>
        {songs?.map((song) => (
          <div key={song.id} className="flex gap-2 pr-5">
            <MediaItem song={song} onPlay={onPlay} />
            <LikeButton songId={song.id} />
          </div>
        ))}
      </ul>
    </div>
  );
};

export default Library;
