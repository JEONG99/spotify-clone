import { TbPlaylist } from "react-icons/tb";
import { AiOutlinePlus } from "react-icons/ai";

const Library = () => {
  return (
    <div>
      <div className="flex justify-between items-center p-5">
        <div className="flex items-center gap-2 group cursor-pointer">
          <TbPlaylist
            size={28}
            className="text-neutral-300 group-hover:text-white transition-colors"
          />
          <span className="text-neutral-300 font-semibold group-hover:text-white transition-colors">
            내 라이브러리
          </span>
        </div>
        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-transparent hover:bg-neutral-800 group cursor-pointer transition-colors">
          <AiOutlinePlus
            size={18}
            className="text-neutral-300 group-hover:text-white"
          />
        </div>
      </div>
    </div>
  );
};

export default Library;