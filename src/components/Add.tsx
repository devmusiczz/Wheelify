"use client";

import { useCartStore } from "@/hooks/useCartStore";
import { useWixClient } from "@/hooks/useWixClient";
import { useState } from "react";

const Add = ({
  productId,
  variantId,
  stockNumber,
}: {
  productId: string;
  variantId: string;
  stockNumber: number;
}) => {
  const [quantity, setQuantity] = useState(1);

  const handleQuantity = (type: "i" | "d") => {
    if (type === "d" && quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
    if (type === "i" && quantity < stockNumber) {
      setQuantity((prev) => prev + 1);
    }
  };

  const wixClient = useWixClient();
  const { addItem, isLoading } = useCartStore(); // Add `openCart` state directly handled inside addItem now

  const handleAddToCart = async () => {
    await addItem(wixClient, productId, variantId, quantity);
    // No need to manually call `openCart` if it is handled inside the store
  };

  return (
    <div className="flex flex-col gap-4">
      <h4 className="font-medium">Choose a Quantity</h4>
      <div className="flex justify-between">
        <div className="flex items-center gap-4">
          <div className="bg-zinc-800 py-2 px-4 rounded-3xl flex items-center justify-between w-32">
            <button
              className="cursor-pointer text-xl disabled:cursor-not-allowed disabled:opacity-20"
              onClick={() => handleQuantity("d")}
              disabled={quantity === 1}
            >
              -
            </button>
            {quantity}
            <button
              className="cursor-pointer text-xl disabled:cursor-not-allowed disabled:opacity-20"
              onClick={() => handleQuantity("i")}
              disabled={quantity === stockNumber}
            >
              +
            </button>
          </div>
          {stockNumber < 1 ? (
            <div className="text-xs">Product is out of stock</div>
          ) : (
            <div className="text-xs">
              Only <span className="text-orange-500">{stockNumber} items</span> left!
              <br /> {"Don't"} miss it
            </div>
          )}
        </div>
        <button
          onClick={handleAddToCart}
          disabled={isLoading}
          className="w-36 text-sm rounded-3xl ring-1 ring-lama py-2 px-4 bg-lama text-white transition duration-200 ease-in-out hover:bg-[#b83a2b] hover:ring-[#b83a2b] disabled:cursor-not-allowed disabled:bg-pink-200 disabled:ring-0 disabled:text-white"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default Add;
