'use server';

const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;


export const subscription = async (paymentInfo) => {

  const res = await fetch(`${serverUrl}/subscriptions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(paymentInfo),
  });
  const data = await res.json();
  return data;
};
