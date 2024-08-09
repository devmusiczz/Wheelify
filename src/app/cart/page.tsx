// pages/cart/page.tsx
"use client";

import React from "react";
import { useCartStore } from "@/hooks/useCartStore";
import { useWixClient } from "@/hooks/useWixClient";
import CartInfo from "@/components/CartInfo";
import { currentCart } from "@wix/ecom";

const CartPage = () => {
  const wixClient = useWixClient();
  const { cart, isLoading, removeItem }: { cart: any, isLoading: boolean, removeItem: (client: any, itemId: string) => void } = useCartStore();

  const handleCheckout = async () => {
    try {
      const checkout =
        await wixClient.currentCart.createCheckoutFromCurrentCart({
          channelType: currentCart.ChannelType.WEB,
        });

      const { redirectSession } =
        await wixClient.redirects.createRedirectSession({
          ecomCheckout: { checkoutId: checkout.checkoutId },
          callbacks: {
            postFlowUrl: window.location.origin,
            thankYouPageUrl: `${window.location.origin}/success`,
          },
        });

      if (redirectSession?.fullUrl) {
        window.location.href = redirectSession.fullUrl;
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex flex-col container mx-auto p-4">
      <h1 className="text-2xl mt-24 font-bold mb-4"></h1>
      {!cart.lineItems ? (
        <div>Cart is Empty</div>
      ) : (
        <CartInfo cart={cart} isLoading={isLoading} removeItem={removeItem} wixClient={wixClient} />
      )}

      <button
        className="rounded-md py-3 px-4 bg-black text-white disabled:cursor-not-allowed disabled:opacity-75"
        disabled={isLoading}
        onClick={handleCheckout}
      >
        Checkout
      </button>

    </div>
  );
};


export default CartPage;