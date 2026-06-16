"use client";

import { authClient } from "@/lib/auth-client";
import { redirect, useRouter } from "next/navigation";
import { HiSparkles } from "react-icons/hi2";
import { MdOutlineImage, MdOutlinePersonOutline } from "react-icons/md";

const inputCls =
  "w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition";

export default function EditProfile() {
  const route = useRouter()
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const updatedData = Object.fromEntries(formData.entries());
    const { name, image } = updatedData;
    const { data } = await authClient.updateUser({
      image: image,
      name: name,
    });
    if (data.status) {
      route.refresh();
      redirect("/profile");
    }
  };

  if (isPending) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-violet-300 border-t-violet-600 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Banner */}
      <div className="relative bg-linear-to-br from-violet-600 via-purple-600 to-pink-500 h-40 overflow-hidden">
        <div className="absolute -top-10 -left-10 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 -right-10 w-72 h-72 bg-pink-400/20 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center">
          <span className="inline-flex items-center gap-1.5 bg-white/20 text-white text-xs font-semibold px-3 py-1 rounded-full mb-2 backdrop-blur-sm">
            <HiSparkles className="text-yellow-300" />
            Edit Profile
          </span>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">
            Update your info
          </h1>
        </div>
      </div>

      {/* Form card */}
      <div className="max-w-lg mx-auto px-4 -mt-6 pb-12">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 mt-20 p-8">
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {/* Name */}
            <div>
              <label
                className="block text-sm font-semibold text-gray-700 mb-1.5"
                htmlFor="name"
              >
                <span className="flex items-center gap-1.5">
                  <MdOutlinePersonOutline className="text-violet-500" />
                  Display Name
                </span>
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                defaultValue={user?.name || ""}
                placeholder="Jane Doe"
                className={inputCls}
              />
            </div>

            {/* Image URL */}
            <div>
              <label
                className="block text-sm font-semibold text-gray-700 mb-1.5"
                htmlFor="image"
              >
                <span className="flex items-center gap-1.5">
                  <MdOutlineImage className="text-violet-500" />
                  Profile Image URL
                </span>
              </label>
              <input
                id="image"
                name="image"
                type="text"
                defaultValue={user?.image || ""}
                placeholder="https://example.com/avatar.jpg"
                className={inputCls}
              />
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-1">
              <button
                type="submit"
                className="flex-1 bg-violet-600 hover:bg-violet-700 disabled:opacity-60 text-white font-semibold py-2.5 rounded-xl transition text-sm cursor-pointer"
              >
                Update Profile
              </button>
              <button
                type="button"
                className="px-5 rounded-xl border border-gray-200 text-gray-600 text-sm font-semibold hover:bg-gray-50 transition"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
