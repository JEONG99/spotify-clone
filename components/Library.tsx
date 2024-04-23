import { TbPlaylist } from "react-icons/tb";
import { AiOutlinePlus } from "react-icons/ai";
import MediaItem from "@/components/MediaItem";
import LikeButton from "@/components/LikeButton";
import useOnPlay from "@/hooks/useOnPlay";
import useLikedSongs from "@/hooks/useLikedSongs";
import Link from "next/link";

const Library = () => {
  const { data: songs } = useLikedSongs();
  const onPlay = useOnPlay(songs || []);

  return (
    <div>
      <div className="flex justify-between items-center p-5">
        <Link
          href="/library"
          className="flex items-center gap-2 group cursor-pointer"
        >
          <TbPlaylist
            size={28}
            className="text-neutral-300 group-hover:text-white transition-colors"
          />
          <span className="text-neutral-300 font-semibold group-hover:text-white transition-colors">
            내 라이브러리
          </span>
        </Link>
        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-transparent hover:bg-neutral-800 group cursor-pointer transition-colors">
          <AiOutlinePlus
            size={18}
            className="text-neutral-300 group-hover:text-white"
          />
        </div>
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
