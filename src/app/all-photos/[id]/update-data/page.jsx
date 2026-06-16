import { PatchAction } from "@/lib/Action/CurdAction";
import { GetPhotoDataById } from "@/lib/Action/GetDBData";
import { HiSparkles } from "react-icons/hi2";

const TAGS = ["portrait", "realistic", "photography", "ai"];

const inputCls =
  "w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition";

const UpdateDataPage = async ({ params }) => {
  const { id } = await params;
  const existingValue = await GetPhotoDataById(id);
  const formAction = async (formData) => {
    "use server";
    await PatchAction(formData, id);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero banner */}
      <div className="relative bg-linear-to-br from-violet-600 via-purple-600 to-pink-500 py-12 px-4 text-center overflow-hidden">
        <div className="absolute -top-10 -left-10 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 -right-10 w-72 h-72 bg-pink-400/20 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-2xl mx-auto">
          <span className="inline-flex items-center gap-1.5 bg-white/20 text-white text-xs font-semibold px-3 py-1 rounded-full mb-4 backdrop-blur-sm">
            <HiSparkles className="text-yellow-300" />
            Edit Photo
          </span>
          <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            Update Photo Details
          </h1>
          <p className="text-purple-100 text-sm mt-2">
            Modify the fields below and save your changes.
          </p>
        </div>
      </div>

      {/* Form card */}
      <div className="max-w-3xl mx-auto px-4 py-10">
        <form
          action={formAction}
          className="bg-white border border-gray-100 rounded-2xl shadow-sm divide-y divide-gray-100"
        >
          {/* Section: Basic Info */}
          <div className="p-6 sm:p-8 space-y-5">
            <h2 className="text-xs font-bold uppercase tracking-widest text-violet-500">
              Basic Info
            </h2>

            {/* Title */}
            <div>
              <label
                className="block text-sm font-semibold text-gray-700 mb-1.5"
                htmlFor="title"
              >
                Title
              </label>
              <input
                className={inputCls}
                type="text"
                id="title"
                name="title"
                defaultValue={existingValue?.title}
                placeholder="e.g. Realistic Portrait AI"
              />
            </div>

            {/* Image URL */}
            <div>
              <label
                className="block text-sm font-semibold text-gray-700 mb-1.5"
                htmlFor="imageUrl"
              >
                Image URL
              </label>
              <input
                className={inputCls}
                type="url"
                id="imageUrl"
                name="imageUrl"
                defaultValue={existingValue?.imageUrl}
                placeholder="https://..."
              />
            </div>

            {/* Prompt */}
            <div>
              <label
                className="block text-sm font-semibold text-gray-700 mb-1.5"
                htmlFor="prompt"
              >
                Prompt
              </label>
              <textarea
                className={`${inputCls} resize-none`}
                id="prompt"
                name="prompt"
                rows={4}
                defaultValue={existingValue?.prompt}
                placeholder="Describe the image generation prompt..."
              />
            </div>
          </div>

          {/* Section: Technical */}
          <div className="p-6 sm:p-8 space-y-5">
            <h2 className="text-xs font-bold uppercase tracking-widest text-violet-500">
              Technical Details
            </h2>

            {/* Category & Model */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label
                  className="block text-sm font-semibold text-gray-700 mb-1.5"
                  htmlFor="category"
                >
                  Category
                </label>
                <input
                  className={inputCls}
                  type="text"
                  id="category"
                  name="category"
                  defaultValue={existingValue?.category}
                  placeholder="e.g. Realistic"
                />
              </div>
              <div>
                <label
                  className="block text-sm font-semibold text-gray-700 mb-1.5"
                  htmlFor="model"
                >
                  Model
                </label>
                <input
                  className={inputCls}
                  type="text"
                  id="model"
                  name="model"
                  defaultValue={existingValue?.model}
                  placeholder="e.g. SDXL"
                />
              </div>
            </div>

            {/* Resolution */}
            <div>
              <label
                className="block text-sm font-semibold text-gray-700 mb-1.5"
                htmlFor="resolution"
              >
                Resolution
              </label>
              <select
                className={inputCls}
                id="resolution"
                name="resolution"
                defaultValue={existingValue?.resolution}
              >
                <option value="512x512">512 × 512</option>
                <option value="768x1024">768 × 1024</option>
                <option value="1024x1024">1024 × 1024</option>
              </select>
            </div>
          </div>

          {/* Section: Stats */}
          <div className="p-6 sm:p-8 space-y-5">
            <h2 className="text-xs font-bold uppercase tracking-widest text-violet-500">
              Stats
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              <div>
                <label
                  className="block text-sm font-semibold text-gray-700 mb-1.5"
                  htmlFor="likes"
                >
                  Likes
                </label>
                <input
                  className={inputCls}
                  type="number"
                  id="likes"
                  name="likes"
                  min={0}
                  placeholder="0"
                  defaultValue={existingValue?.likes}
                />
              </div>
              <div>
                <label
                  className="block text-sm font-semibold text-gray-700 mb-1.5"
                  htmlFor="downloads"
                >
                  Downloads
                </label>
                <input
                  className={inputCls}
                  type="number"
                  id="downloads"
                  name="downloads"
                  min={0}
                  placeholder="0"
                  defaultValue={existingValue?.downloads}
                />
              </div>
              <div>
                <label
                  className="block text-sm font-semibold text-gray-700 mb-1.5"
                  htmlFor="createdAt"
                >
                  Created At
                </label>
                <input
                  className={inputCls}
                  type="datetime-local"
                  id="createdAt"
                  name="createdAt"
                  defaultValue={existingValue?.createdAt}
                />
              </div>
            </div>
          </div>

          {/* Section: Tags */}
          <div className="p-6 sm:p-8 space-y-4">
            <h2 className="text-xs font-bold uppercase tracking-widest text-violet-500">
              Tags
            </h2>
            <div className="flex flex-wrap gap-3">
              {TAGS.map((tag) => (
                <label
                  key={tag}
                  className="flex items-center gap-2 cursor-pointer select-none px-4 py-2 rounded-xl border border-gray-200 bg-gray-50 hover:border-violet-400 hover:bg-violet-50 transition has-checked:border-violet-500 has-checked:bg-violet-50 has-checked:text-violet-700"
                >
                  <input
                    type="checkbox"
                    name="tags"
                    value={tag}
                    className="w-4 h-4 accent-violet-600 rounded"
                    defaultChecked={existingValue?.tags?.includes(tag)}
                  />
                  <span className="text-sm font-medium capitalize">{tag}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Submit */}
          <div className="p-6 sm:p-8">
            <button
              type="submit"
              className="w-full bg-violet-600 hover:bg-violet-700 active:bg-violet-800 text-white font-semibold py-3 rounded-xl transition text-sm tracking-wide shadow-sm cursor-pointer"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateDataPage;
