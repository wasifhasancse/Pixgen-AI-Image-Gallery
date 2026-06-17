'use server';
import { headers } from "next/headers";
import { auth } from "../auth";

export const createProduct = async (productData) => {
  const token = await auth.api.getToken({ headers: await headers() });
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/seller/products`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token?.token}`,
      },
      body: JSON.stringify(productData),
    },
  );
  const data = await response.json();
  return data;
}

export const getProducts = async (page) => {
  const token = await auth.api.getToken({ headers: await headers() });
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/seller/products?page=${page}`,
    {
      method: "GET",
      headers: {
        authorization: `Bearer ${token?.token}`,
      },
    },
  );
  const data = await response.json();
  return data;
}
