import { PostAction } from "@/lib/Action/CurdAction";


const TAGS = ["portrait", "realistic", "photography", "ai"];

const AddPhotoPage = async () => {
  const formAction = async (formData) => {
    "use server";
    await PostAction(formData);
  };
  return (
    <div className="max-w-3xl mx-auto w-full py-10 px-4">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900">Add New Photo</h1>
        <p className="text-gray-500 mt-1 text-sm">
          Fill in the details below to add a new AI-generated photo
        </p>
      </div>

      <form
        action={formAction}
        className="bg-white border border-gray-200 rounded-2xl shadow-lg p-8 space-y-6"
      >
        {/* Title */}
        <div>
          <label
            className="block text-sm font-semibold text-gray-700 mb-1"
            htmlFor="title"
          >
            Title
          </label>
          <input
            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition"
            type="text"
            id="title"
            name="title"
            placeholder="e.g. Realistic Portrait AI"
          />
        </div>

        {/* Image URL */}
        <div>
          <label
            className="block text-sm font-semibold text-gray-700 mb-1"
            htmlFor="imageUrl"
          >
            Image URL
          </label>
          <input
            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition"
            type="url"
            id="imageUrl"
            name="imageUrl"
            placeholder="https://..."
          />
        </div>

        {/* Prompt */}
        <div>
          <label
            className="block text-sm font-semibold text-gray-700 mb-1"
            htmlFor="prompt"
          >
            Prompt
          </label>
          <textarea
            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition resize-none"
            id="prompt"
            name="prompt"
            rows={3}
            placeholder="Describe the image generation prompt..."
          />
        </div>

        {/* Category & Model — two columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label
              className="block text-sm font-semibold text-gray-700 mb-1"
              htmlFor="category"
            >
              Category
            </label>
            <input
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition"
              type="text"
              id="category"
              name="category"
              placeholder="e.g. Realistic"
            />
          </div>
          <div>
            <label
              className="block text-sm font-semibold text-gray-700 mb-1"
              htmlFor="model"
            >
              Model
            </label>
            <input
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition"
              type="text"
              id="model"
              name="model"
              placeholder="e.g. SDXL"
            />
          </div>
        </div>

        {/* Resolution */}
        <div>
          <label
            className="block text-sm font-semibold text-gray-700 mb-1"
            htmlFor="resolution"
          >
            Resolution
          </label>
          <select
            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition"
            id="resolution"
            name="resolution"
          >
            <option value="512x512">512 × 512</option>
            <option value="768x1024">768 × 1024</option>
            <option value="1024x1024">1024 × 1024</option>
          </select>
        </div>

        {/* Likes, Downloads & Created At — three columns */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div>
            <label
              className="block text-sm font-semibold text-gray-700 mb-1"
              htmlFor="likes"
            >
              Likes
            </label>
            <input
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition"
              type="number"
              id="likes"
              name="likes"
              min={0}
              placeholder="0"
            />
          </div>
          <div>
            <label
              className="block text-sm font-semibold text-gray-700 mb-1"
              htmlFor="downloads"
            >
              Downloads
            </label>
            <input
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition"
              type="number"
              id="downloads"
              name="downloads"
              min={0}
              placeholder="0"
            />
          </div>
          <div>
            <label
              className="block text-sm font-semibold text-gray-700 mb-1"
              htmlFor="createdAt"
            >
              Created At
            </label>
            <input
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition"
              type="datetime-local"
              id="createdAt"
              name="createdAt"
            />
          </div>
        </div>

        {/* Tags */}
        <div>
          <p className="block text-sm font-semibold text-gray-700 mb-2">Tags</p>
          <div className="flex flex-wrap gap-4">
            {TAGS.map((tag) => (
              <label
                key={tag}
                className="flex items-center gap-2 cursor-pointer select-none"
              >
                <input
                  type="checkbox"
                  name="tags"
                  value={tag}
                  className="w-4 h-4 accent-violet-600 rounded"
                />
                <span className="text-sm text-gray-700 capitalize">{tag}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Submit */}
        <div className="pt-2">
          <button
            type="submit"
            className="w-full bg-violet-600 hover:bg-violet-700 active:bg-violet-800 text-white font-semibold py-3 rounded-lg transition text-sm tracking-wide"
          >
            Add Photo
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddPhotoPage;
