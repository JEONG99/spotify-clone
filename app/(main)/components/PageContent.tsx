import SongItem from "@/components/SongItem";
import { Song } from "@/types";

interface PageContentProps {
  songs: Song[];
}

const PageContent: React.FC<PageContentProps> = ({ songs }) => {
  return (
    <div className="grid  grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
      {songs.map((song) => (
        <SongItem key={song.id} song={song} />
      ))}
    </div>
  );
};

export default PageContent;
