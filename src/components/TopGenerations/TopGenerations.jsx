import ImageCard from "../ImageCard/ImageCard";

const TopGenerations = async () => {
  const galleryResponse = await fetch(
    "https://pixgen-ai-image-gallery.vercel.app/data/data.json",
  );
  const galleryData = await galleryResponse.json();

  return (
    <div className="max-w-11/12 mx-auto">
      <h2 className="text-2xl font-bold mb-4">Top Generations</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {galleryData.slice(0, 4).map((photoInfo) => (
          <ImageCard key={photoInfo.id} photoInfo={photoInfo} />
        ))}
      </div>
    </div>
  );
};

export default TopGenerations;
