import useSound from "use-sound";
import { useEffect, useState } from "react";
import { BsPauseFill, BsPlayFill } from "react-icons/bs";
import { AiFillStepBackward, AiFillStepForward } from "react-icons/ai";
import { HiSpeakerWave, HiSpeakerXMark } from "react-icons/hi2";

import { Song } from "@/types";
import usePlayer from "@/hooks/usePlayer";
import MediaItem from "@/components/MediaItem";
import VolumeSlider from "@/components/VolumeSlider";
import LikeButton from "@/components/LikeButton";

interface PlayerContentProps {
  song: Song;
}

const PlayerContent: React.FC<PlayerContentProps> = ({ song }) => {
  const player = usePlayer();
  const [volume, setVolume] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);

  const Icon = isPlaying ? BsPauseFill : BsPlayFill;
  const VolumeIcon = volume === 0 ? HiSpeakerXMark : HiSpeakerWave;

  const onPlayNext = () => {
    if (player.ids.length === 0) {
      return;
    }

    const currentIndex = player.ids.findIndex((id) => id === player.activeId);
    const nextId = player.ids[currentIndex + 1];

    if (!nextId) {
      player.setId(player.ids[0]);
      return;
    }
    player.setId(nextId);
  };

  const onPlayPrevious = () => {
    if (player.ids.length === 0) {
      return;
    }

    const currentIndex = player.ids.findIndex((id) => id === player.activeId);
    const previousId = player.ids[currentIndex - 1];

    if (!previousId) {
      player.setId(player.ids[player.ids.length - 1]);
      return;
    }
    player.setId(previousId);
  };

  const toggleMute = () => {
    setVolume(volume === 0 ? 1 : 0);
  };

  const handlePlay = () => {
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  };

  const [play, { pause, sound }] = useSound(song.song_path, {
    volume: volume,
    onplay: () => setIsPlaying(true),
    onpause: () => setIsPlaying(false),
    onend: () => {
      setIsPlaying(false);
      onPlayNext();
    },
    format: ["mp3"],
  });

  useEffect(() => {
    sound?.play();
    return () => {
      sound?.unload();
    };
  }, [sound]);

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 h-full">
      <div className="flex w-full justify-start">
        <div className="flex items-center gap-x-4">
          <MediaItem song={song} />
          <LikeButton songId={song.id} />
        </div>
      </div>
      <div className="flex md:hidden col-auto w-full justify-end items-center">
        <div
          onClick={handlePlay}
          className="h-10 w-10 flex items-center justify-center rounded-full bg-white p-1 cursor-pointer"
        >
          <Icon size={30} className="text-black" />
        </div>
      </div>
      <div className="hidden md:flex h-full justify-center items-center w-full max-w-[722px] gap-x-6">
        <AiFillStepBackward
          onClick={onPlayPrevious}
          size={30}
          className="text-neutral-400 cursor-pointer hover:text-white transition"
        />
        <div
          onClick={handlePlay}
          className="flex items-center justify-center h-10 w-10 rounded-full bg-white p-1 cursor-pointer"
        >
          <Icon size={30} className="text-black" />
        </div>
        <AiFillStepForward
          onClick={onPlayNext}
          size={30}
          className="text-neutral-400 cursor-pointer hover:text-white transition"
        />
      </div>
      <div className="hidden md:flex w-full justify-end pr-2">
        <div className="flex items-center gap-x-2 w-[120px]">
          <VolumeIcon
            onClick={toggleMute}
            className="cursor-pointer"
            size={34}
          />
          <VolumeSlider value={volume} setValue={setVolume} />
        </div>
      </div>
    </div>
  );
};

export default PlayerContent;
