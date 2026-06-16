"use client";

import { DeleteAction } from "@/lib/Action/CurdAction";

const DeleteButton = ({ purchasedItem }) => {
  const manageDelete = async () => {
    await DeleteAction(purchasedItem)
  };
  return (
    <button
      onClick={manageDelete}
      className="block text-center w-full py-2 rounded-xl border border-red-200 text-red-600 text-xs font-semibold hover:bg-red-50 transition cursor-pointer"
    >
      Remove Purchased
    </button>
  );
};

export default DeleteButton;
