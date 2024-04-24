"use client";

import useUploadModal from "@/hooks/useUploadModal";
import { AiOutlinePlus } from "react-icons/ai";

const AddSongButton = () => {
  const { onOpen } = useUploadModal();
  const onClick = () => {
    onOpen();
  };

  return (
    <button
      onClick={onClick}
      className="flex items-center justify-center w-8 h-8 rounded-full bg-transparent hover:bg-neutral-800 group cursor-pointer transition-colors"
    >
      <AiOutlinePlus
        size={24}
        className="text-neutral-300 group-hover:text-white"
      />
    </button>
  );
};

export default AddSongButton;
