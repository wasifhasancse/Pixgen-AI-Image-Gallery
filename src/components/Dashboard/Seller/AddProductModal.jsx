"use client";

import { imageUpload } from "@/lib/Action/ImageUpload";
import { useState } from "react";
import { HiOutlinePhoto, HiOutlinePlus, HiOutlineXMark } from "react-icons/hi2";

const defaultCategories = [
  "AI Art",
  "Portrait",
  "Background",
  "Illustration",
  "Template",
];

const AddProductModal = ({
  onSubmit,
  categories = defaultCategories,
  buttonLabel = "Add Product",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [imageName, setImageName] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData.entries());
    const imageFile = await imageUpload(data.image);
    console.log(data);
    console.log(imageFile);
    const productData = {
      ...data,
      image: imageFile.url
    }
    if (typeof onSubmit === "function") {
      setSubmitting(true);
      try {
        await onSubmit(formData);
        event.currentTarget.reset();
        setImageName("");
        setIsOpen(false);
      } finally {
        setSubmitting(false);
      }
      return;
    }

    setIsOpen(false);
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="inline-flex cursor-pointer items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
      >
        <HiOutlinePlus className="text-base" />
        {buttonLabel}
      </button>

      {isOpen ? (
        <div
          className="fixed inset-0 z-100 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="w-full max-w-2xl rounded-3xl border border-slate-200 bg-white p-5 shadow-2xl md:p-7"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mb-5 flex items-start justify-between gap-3">
              <div>
                <h2 className="text-xl font-bold text-slate-900 md:text-2xl">
                  Add New Product
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Fill in product details and upload a preview image.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="grid size-9 place-items-center rounded-full border border-slate-200 text-slate-500 transition hover:bg-slate-100 hover:text-slate-800"
                aria-label="Close modal"
              >
                <HiOutlineXMark className="text-xl" />
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <label className="space-y-1.5">
                  <span className="text-sm font-medium text-slate-700">
                    Title
                  </span>
                  <input
                    name="title"
                    type="text"
                    placeholder="e.g. Neon Portrait Pack"
                    required
                    className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none transition focus:border-cyan-400"
                  />
                </label>

                <label className="space-y-1.5">
                  <span className="text-sm font-medium text-slate-700">
                    Price (USD)
                  </span>
                  <input
                    name="price"
                    type="number"
                    min="0"
                    step="0.01"
                    placeholder="19.00"
                    required
                    className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none transition focus:border-cyan-400"
                  />
                </label>
              </div>

              <label className="space-y-1.5">
                <span className="text-sm font-medium text-slate-700">
                  Description
                </span>
                <textarea
                  name="description"
                  rows={4}
                  placeholder="Short description about product use-case, quality and style."
                  required
                  className="w-full resize-none rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none transition focus:border-cyan-400"
                />
              </label>

              <div className="grid gap-4 md:grid-cols-3">
                <label className="space-y-1.5">
                  <span className="text-sm font-medium text-slate-700">
                    Category
                  </span>
                  <select
                    name="category"
                    required
                    defaultValue=""
                    className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none transition focus:border-cyan-400"
                  >
                    <option value="" disabled>
                      Select category
                    </option>
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="space-y-1.5">
                  <span className="text-sm font-medium text-slate-700">
                    Stock
                  </span>
                  <input
                    name="stock"
                    type="number"
                    min="1"
                    step="1"
                    defaultValue="1"
                    required
                    className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none transition focus:border-cyan-400"
                  />
                </label>

                <label className="space-y-1.5">
                  <span className="text-sm font-medium text-slate-700">
                    Status
                  </span>
                  <select
                    name="status"
                    defaultValue="active"
                    className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none transition focus:border-cyan-400"
                  >
                    <option value="active">Active</option>
                    <option value="draft">Draft</option>
                    <option value="archived">Archived</option>
                  </select>
                </label>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <label className="space-y-1.5">
                  <span className="text-sm font-medium text-slate-700">
                    Image Upload
                  </span>
                  <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50/80 p-3">
                    <input
                      name="image"
                      type="file"
                      required
                      onChange={(event) => {
                        const file = event.target.files?.[0];
                        setImageName(file ? file.name : "");
                      }}
                      className="block w-full text-sm text-slate-600 file:mr-3 file:cursor-pointer file:rounded-lg file:border-0 file:bg-slate-900 file:px-3 file:py-1.5 file:text-sm file:font-medium file:text-white"
                    />
                    {imageName ? (
                      <p className="mt-2 flex items-center gap-1 text-xs text-slate-500">
                        <HiOutlinePhoto className="text-sm" />
                        {imageName}
                      </p>
                    ) : null}
                  </div>
                </label>

                <label className="space-y-1.5">
                  <span className="text-sm font-medium text-slate-700">
                    Tags (comma separated)
                  </span>
                  <input
                    name="tags"
                    type="text"
                    placeholder="portrait, neon, cyberpunk"
                    className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none transition focus:border-cyan-400"
                  />
                </label>
              </div>

              <div className="flex flex-wrap justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="rounded-xl bg-cyan-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-cyan-500 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {submitting ? "Saving..." : "Save Product"}
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default AddProductModal;
