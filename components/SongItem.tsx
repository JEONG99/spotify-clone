import Image from "next/image";
import { IoIosPlay } from "react-icons/io";
import { Song } from "@/types";

interface SongItemProps {
  song: Song;
  onPlay: (id: string) => void;
}

const SongItem: React.FC<SongItemProps> = ({ song, onPlay }) => {
  return (
    <div
      className="relative p-3 rounded-md cursor-pointer hover:bg-neutral-800 transition-colors group"
      onClick={() => onPlay(song.id)}
    >
      <div className="relative w-full aspect-square rounded-full overflow-hidden">
        <Image src={song.image_path} alt={song.title} fill />
      </div>
      <h4 className="my-2 font-semibold">{song.title}</h4>
      <h5 className="text-xs text-neutral-300">{song.genre}</h5>
      <div className="absolute right-4 bottom-1/3 flex justify-center items-center w-12 h-12 rounded-full bg-green opacity-0 translate-y-1.5 group-hover:opacity-100 group-hover:translate-y-0 transition-all hover:scale-105">
        <IoIosPlay size={30} className="text-black translate-x-0.5" />
      </div>
    </div>
  );
};

export default SongItem;
