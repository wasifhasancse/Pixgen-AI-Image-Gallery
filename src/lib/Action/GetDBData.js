import { headers } from "next/headers";
import { auth } from "../auth";

export const GetPhotoData = async () => {
  const data = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/all-photos`);
  return await data.json();
};

export const GetPhotoDataById = async (id) => {
  const data = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/all-photos/${id}`,
  );
  return await data.json();
};

export const GetPurchasedItems = async () => {
  const token = await auth.api.getToken({ headers: await headers() });
  const data = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/purchased-items`,
    {
      headers: {
        authorization: `Bearer ${token?.token}`,
      },
    },
  );
  return (await data.json()) || [];
};
