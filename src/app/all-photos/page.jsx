import ImageCard from "@/components/ImageCard/ImageCard";
import { GetPhotoData } from "@/lib/Action/GetDBData";
import { BiImages } from "react-icons/bi";
import { HiSparkles } from "react-icons/hi2";

const AllPhotosPage = async () => {
  const photosData = await GetPhotoData();

  return (
    <div className="min-h-screen">
      {/* Hero banner */}
      <div className="relative bg-linear-to-br from-violet-600 via-purple-600 to-pink-500 py-16 px-4 text-center overflow-hidden">
        {/* Decorative blobs */}
        <div className="absolute -top-10 -left-10 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 -right-10 w-72 h-72 bg-pink-400/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-2xl mx-auto">
          <span className="inline-flex items-center gap-1.5 bg-white/20 text-white text-xs font-semibold px-3 py-1 rounded-full mb-4 backdrop-blur-sm">
            <HiSparkles className="text-yellow-300" />
            AI-Generated Gallery
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-3 tracking-tight">
            All Photos
          </h1>
          <p className="text-purple-100 text-base md:text-lg">
            Explore our full collection of stunning AI-generated images crafted
            from creative prompts.
          </p>
        </div>
      </div>


      {/* Grid */}
      <div className="max-w-11/12 mx-auto px-4 py-10">
        {photosData.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {photosData.map((photoInfo) => (
              <ImageCard
                key={photoInfo.id || photoInfo._id}
                photoInfo={photoInfo}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-20 h-20 rounded-full bg-violet-100 flex items-center justify-center mb-4">
              <BiImages className="text-4xl text-violet-400" />
            </div>
            <h2 className="text-xl font-semibold text-gray-700 mb-1">
              No photos yet
            </h2>
            <p className="text-gray-400 text-sm">
              Be the first to add an AI-generated photo.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllPhotosPage;
