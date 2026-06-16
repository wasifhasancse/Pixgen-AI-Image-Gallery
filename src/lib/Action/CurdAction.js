"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const PostAction = async (formData) => {
  const photoData = Object.fromEntries(formData.entries());
  photoData.tags = formData.getAll("tags");

  const postData = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/all-photos`,
    {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(photoData),
    },
  );
  const data = await postData.json();
  if (data.insertedId) {
    revalidatePath("/all-photos");
    redirect("/all-photos");
  }
};

export const PatchAction = async (formData, id) => {
  const updatedPhotoData = Object.fromEntries(formData.entries());
  updatedPhotoData.tags = formData.getAll("tags");
  const patchData = await fetch(`${process.env.SERVER_URL}/all-photos/${id}`, {
    method: "PATCH",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(updatedPhotoData),
  });
  const data = await patchData.json();
  if (data.modifiedCount > 0) {
    revalidatePath(`/all-photos/${id}`);
    redirect(`/all-photos/${id}`);
  }
};

export const DeleteAction = async ( purchasedItem ) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/purchased-items/${purchasedItem._id}`,
      {
        method: "DELETE",
      },
    );
    const data = await res.json();
    if (data.deletedCount > 0) {
      revalidatePath('/profile')
    }
  } catch (error) {
    // console.log(error);
  }
};
