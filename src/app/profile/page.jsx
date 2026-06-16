import DeleteButton from "@/components/ImageCard/DeleteButton";
import { GetPurchasedItems } from "@/lib/Action/GetDBData";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import { BiDownload } from "react-icons/bi";
import { FaHeart } from "react-icons/fa6";
import { HiSparkles } from "react-icons/hi2";
import { MdOutlineEmail, MdOutlineLocationOn } from "react-icons/md";

const Profile = async () => {
  const purchasedItems = await GetPurchasedItems();
  const session = await auth.api.getSession({ headers: await headers() });
  const user = session?.user;
  // check image url valid or not
  const isValidUrl = (str) => {
    try {
      return Boolean(new URL(str));
    } catch {
      return false;
    }  };

  const hasValidImage = user?.image && isValidUrl(user.image);
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero banner */}
      <div className="relative bg-linear-to-br from-violet-600 via-purple-600 to-pink-500 h-48 md:h-56 overflow-hidden">
        <div className="absolute -top-10 -left-10 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 -right-10 w-72 h-72 bg-pink-400/20 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* Profile card — overlapping the banner */}
      <div className="max-w-5xl mx-auto px-4 pb-10">
        <div className="relative -mt-16 bg-white rounded-2xl shadow-md border border-gray-100 p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row items-center sm:items-end gap-5">
            {/* Avatar */}
            {hasValidImage ? (
              <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-200">
                <Image
                  src={user?.image}
                  alt={user?.name}
                  width={96}
                  height={96}
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <div className="relative shrink-0 -mt-16 sm:-mt-20">
                <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full border-4 border-white shadow-lg overflow-hidden bg-violet-100 flex items-center justify-center">
                  <span className="text-5xl font-bold text-violet-400">U</span>
                </div>
              </div>
            )}

            {/* Name & meta */}
            <div className="flex-1 text-center sm:text-left">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                <h1 className="text-2xl font-extrabold text-gray-900">
                  {user?.name || "User"}
                </h1>
                <span className="inline-flex items-center gap-1 bg-violet-100 text-violet-700 text-xs font-semibold px-2.5 py-1 rounded-full self-center">
                  <HiSparkles className="text-yellow-400" />
                  Pro Member
                </span>
              </div>
              <div className="flex flex-wrap justify-center sm:justify-start gap-4 mt-2 text-sm text-gray-500">
                <span className="flex items-center gap-1">
                  <MdOutlineEmail />
                  {user?.email || "user@example.com"}
                </span>
                <span className="flex items-center gap-1">
                  <MdOutlineLocationOn />
                  New York, USA
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 shrink-0">
              <Link
                href="/profile/edit"
                className="px-4 py-2 rounded-xl border border-violet-300 text-violet-700 text-sm font-semibold hover:bg-violet-50 transition"
              >
                Edit Profile
              </Link>
              <Link
                href="/add-photo"
                className="px-4 py-2 rounded-xl bg-violet-600 hover:bg-violet-700 text-white text-sm font-semibold transition"
              >
                + Add Photo
              </Link>
            </div>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-3 divide-x divide-gray-100 mt-8 pt-6 border-t border-gray-100 text-center">
            <div>
              <p className="text-2xl font-extrabold text-gray-900">24</p>
              <p className="text-xs text-gray-500 mt-0.5">Photos</p>
            </div>
            <div>
              <p className="text-2xl font-extrabold text-gray-900">3</p>
              <p className="text-xs text-gray-500 mt-0.5">Purchased</p>
            </div>
            <div>
              <p className="text-2xl font-extrabold text-gray-900">1.2k</p>
              <p className="text-xs text-gray-500 mt-0.5">Total Likes</p>
            </div>
          </div>
        </div>

        {/* Purchased Items */}
        <div className="mt-10 mb-12">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xl font-bold text-gray-900">Purchased Items</h2>
            <span className="text-xs text-gray-400 font-medium">
              {purchasedItems.length} items
            </span>
          </div>

          {purchasedItems.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {purchasedItems.map((purchasedItem) => (
                <div
                  key={purchasedItem._id}
                  className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden hover:shadow-md transition"
                >
                  {/* Image */}
                  <div className="relative aspect-video w-full bg-gray-100">
                    <Image
                      src={purchasedItem.imageUrl}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      alt={purchasedItem.title}
                      className="object-cover"
                    />
                    <span className="absolute top-2 right-2 bg-white/80 backdrop-blur-sm text-violet-700 text-xs font-semibold px-2.5 py-1 rounded-full">
                      {purchasedItem.category}
                    </span>
                  </div>

                  {/* Info */}
                  <div className="p-4 space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-semibold text-gray-900 text-sm leading-tight">
                        {purchasedItem.title}
                      </h3>
                      <span className="text-violet-600 font-bold text-sm shrink-0">
                        {purchasedItem.price}
                      </span>
                    </div>

                    <div className="flex items-center gap-4 text-xs text-gray-400">
                      <span className="flex items-center gap-1">
                        <FaHeart className="text-rose-400" />
                        {purchasedItem.likes}
                      </span>
                      <span className="flex items-center gap-1">
                        <BiDownload className="text-violet-400" />
                        {purchasedItem.downloads}
                      </span>
                      <span className="ml-auto">
                        Bought {purchasedItem.purchasedAt}
                      </span>
                    </div>

                    <DeleteButton purchasedItem={purchasedItem} />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center bg-white rounded-2xl border border-gray-100">
              <div className="w-16 h-16 rounded-full bg-violet-100 flex items-center justify-center mb-4">
                <HiSparkles className="text-3xl text-violet-400" />
              </div>
              <p className="font-semibold text-gray-700">No purchases yet</p>
              <p className="text-sm text-gray-400 mt-1">
                Browse the gallery and buy your first image.
              </p>
              <Link
                href="/all-photos"
                className="mt-4 px-5 py-2 rounded-xl bg-violet-600 text-white text-sm font-semibold hover:bg-violet-700 transition"
              >
                Explore Gallery
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
