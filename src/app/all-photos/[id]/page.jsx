import BuyButton from "@/components/ImageCard/BuyButton";
import { GetPhotoDataById } from "@/lib/Action/GetDBData";
import { Chip } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import { BiCalendar, BiDownload, BiEdit } from "react-icons/bi";
import { FaHeart } from "react-icons/fa6";
import { HiSparkles } from "react-icons/hi2";
import { MdOutlinePhotoCamera } from "react-icons/md";
import { TbPrompt, TbViewfinder } from "react-icons/tb";

const PhotoDetailsPage = async ({ params }) => {
  const { id } = await params;
  const photoInfo = await GetPhotoDataById(id);

  const formattedDate = photoInfo?.createdAt
    ? new Date(photoInfo.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero banner */}
      <div className="relative bg-linear-to-br from-violet-600 via-purple-600 to-pink-500 py-12 px-4 text-center overflow-hidden">
        <div className="absolute -top-10 -left-10 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 -right-10 w-72 h-72 bg-pink-400/20 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-2xl mx-auto">
          <span className="inline-flex items-center gap-1.5 bg-white/20 text-white text-xs font-semibold px-3 py-1 rounded-full mb-4 backdrop-blur-sm">
            <HiSparkles className="text-yellow-300" />
            Photo Details
          </span>
          <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            {photoInfo?.title}
          </h1>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          {/* Left — Image */}
          <div className="relative rounded-2xl overflow-hidden shadow-xl aspect-square w-full bg-gray-200">
            <Image
              src={photoInfo?.imageUrl}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              alt={photoInfo?.title}
              className="object-cover"
              priority
            />
            <Chip
              size="sm"
              className="absolute right-3 top-3 bg-white/80 backdrop-blur-sm font-semibold"
            >
              {photoInfo?.category}
            </Chip>
          </div>

          {/* Right — Details */}
          <div className="flex flex-col gap-6">
            {/* Title + Edit */}
            <div className="flex items-start justify-between gap-4">
              <h2 className="text-2xl font-bold text-gray-900">
                {photoInfo?.title}
              </h2>
              <Link
                href={`/all-photos/${id}/update-data`}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-violet-600 hover:bg-violet-700 text-white text-sm font-semibold transition-colors shrink-0"
              >
                <BiEdit className="text-lg" />
                Edit
              </Link>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 text-rose-500">
                <FaHeart />
                <span className="font-semibold text-gray-700">
                  {photoInfo?.likes ?? 0}
                </span>
                <span className="text-gray-400 text-sm">likes</span>
              </div>
              <div className="w-px h-5 bg-gray-200" />
              <div className="flex items-center gap-2 text-violet-500">
                <BiDownload className="text-lg" />
                <span className="font-semibold text-gray-700">
                  {photoInfo?.downloads ?? 0}
                </span>
                <span className="text-gray-400 text-sm">downloads</span>
              </div>
            </div>

            {/* Prompt */}
            {photoInfo?.prompt && (
              <div className="bg-violet-50 border border-violet-100 rounded-xl p-4">
                <div className="flex items-center gap-2 text-violet-600 font-semibold text-sm mb-2">
                  <TbPrompt className="text-base" />
                  Prompt
                </div>
                <p className="text-gray-700 text-sm leading-relaxed">
                  {photoInfo.prompt}
                </p>
              </div>
            )}

            {/* Meta grid */}
            <div className="grid grid-cols-2 gap-4">
              {photoInfo?.model && (
                <div className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm">
                  <div className="flex items-center gap-2 text-gray-400 text-xs font-medium mb-1">
                    <MdOutlinePhotoCamera />
                    Model
                  </div>
                  <p className="text-gray-800 font-semibold text-sm">
                    {photoInfo.model}
                  </p>
                </div>
              )}

              {photoInfo?.resolution && (
                <div className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm">
                  <div className="flex items-center gap-2 text-gray-400 text-xs font-medium mb-1">
                    <TbViewfinder />
                    Resolution
                  </div>
                  <p className="text-gray-800 font-semibold text-sm">
                    {photoInfo.resolution}
                  </p>
                </div>
              )}

              {photoInfo?.category && (
                <div className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm">
                  <div className="flex items-center gap-2 text-gray-400 text-xs font-medium mb-1">
                    <HiSparkles />
                    Category
                  </div>
                  <p className="text-gray-800 font-semibold text-sm">
                    {photoInfo.category}
                  </p>
                </div>
              )}

              {formattedDate && (
                <div className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm">
                  <div className="flex items-center gap-2 text-gray-400 text-xs font-medium mb-1">
                    <BiCalendar />
                    Created
                  </div>
                  <p className="text-gray-800 font-semibold text-sm">
                    {formattedDate}
                  </p>
                </div>
              )}
            </div>

            {/* Tags */}
            {photoInfo?.tags?.length > 0 && (
              <div>
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                  Tags
                </p>
                <div className="flex flex-wrap gap-2">
                  {photoInfo.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="flex items-center gap-2.5">
              {/* Back link */}
              <Link
                href="/all-photos"
                className="inline-flex items-center px-5 py-2 border-2 border-purple-300 hover:bg-purple-200 cursor-pointer bg-purple-100 text-purple-700 rounded-full text-sm font-medium"
              >
                ← Back to All Photos
              </Link>

              <BuyButton photoInfo={photoInfo} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhotoDetailsPage;
