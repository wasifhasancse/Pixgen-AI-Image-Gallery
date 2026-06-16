"use client";

const BuyButton = ({ photoInfo }) => {
  const manageBuy = async () => {
    const date = new Date().toLocaleString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

    const { _id, ...rest } = photoInfo;
    const purchasedItem = {
      ...rest,
      date,
    };

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/purchased-items`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(purchasedItem),
        },
      );

      const data = await res.json();

      if (data.insertedId) {
        alert("Successfully purchased!");
      } else {
        alert("Purchase failed!");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong!");
    }
  };

  return (
    <button
      onClick={manageBuy}
      className="inline-flex items-center px-5 py-2 border-2 border-purple-300 hover:bg-purple-200 cursor-pointer bg-purple-100 text-purple-700 rounded-full text-sm font-medium"
    >
      Buy
    </button>
  );
};

export default BuyButton;
