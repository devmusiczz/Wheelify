// components/CartInfo.tsx
"use client";

import React from "react";
import Image from "next/image";
import { media as wixMedia } from "@wix/sdk";

const CartInfo = ({ cart, isLoading, removeItem, wixClient }) => {
  return (
    <>
      <h2 className="mt-20 mb-6 text-xl">Shopping Cart</h2>
      <div className="flex flex-col gap-8">
        {cart.lineItems.map((item) => (
          <div className="flex gap-4" key={item._id}>
            {item.image && (
              <Image
                src={wixMedia.getScaledToFillImageUrl(
                  item.image,
                  100,
                  100,
                  {}
                )}
                alt=""
                width={100}
                height={100}
                className="object-cover rounded-md"
              />
            )}
            <div className="flex flex-col justify-between w-full">
              <div>
                <div className="flex items-center justify-between gap-8">
                  <h3 className="font-semibold">
                    {item.productName?.original}
                  </h3>
                  <div className="p-1 bg-zinc-900 rounded-sm flex items-center gap-2">
                    {item.quantity && item.quantity > 1 && (
                      <div className="text-xs text-green-500">
                        {item.quantity} x{" "}
                      </div>
                    )}
                    Rs {item.price?.amount}
                  </div>
                </div>
                <div className="text-sm text-gray-500">
                  {item.availability?.status}
                </div>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-100">Qty. {item.quantity}</span>
                <span
                  className="text-blue-500"
                  style={{ cursor: isLoading ? "not-allowed" : "pointer" }}
                  onClick={() => removeItem(wixClient, item._id)}
                >
                  Remove
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div>
        <div className="flex mt-5 items-center justify-between font-semibold">
          <span>Subtotal</span>
          <span>Rs {cart.subtotal.amount}</span>
        </div>
        <p className="text-gray-500 text-sm mt-2 mb-4">
          Shipping and taxes calculated at checkout.
        </p>
      </div>
    </>
  );
};

export default CartInfo;
