// components/CartModal.tsx
"use client";

import React, { useEffect, useRef } from "react";
import { useCartStore } from "@/hooks/useCartStore";
import { useWixClient } from "@/hooks/useWixClient";
import { currentCart } from "@wix/ecom";
import { useRouter } from 'next/navigation';
import CartInfo from "@/components/CartInfo";

const CartModal = ({ closeModal }: { closeModal: () => void }) => {
  const wixClient = useWixClient();
  const { cart, isLoading, removeItem }: { cart: any, isLoading: boolean, removeItem: (client: any, itemId: string) => void } = useCartStore();

  const modalRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        closeModal();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [modalRef, closeModal]);

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

  const router = useRouter();
  const handleCartButtonClick = () => {
    router.push('/cart');
  };

  return (
    <div ref={modalRef} className="w-screen sm:w-max absolute ml-4 p-4 rounded-md shadow-[0_3px_10px_rgb(0,0,0,0.2)] bg-zinc-900 top-12 right-0 flex flex-col gap-6 z-20">
      {!cart.lineItems ? (
        <div >Cart is Empty</div>
      ) : (
        <>
          <CartInfo cart={cart} isLoading={isLoading} removeItem={removeItem} wixClient={wixClient} />
          <div className="flex justify-between ml-4 text-sm">
            <button
              className="rounded-md py-3 px-4 ring-1 ring-gray-300"
              onClick={handleCartButtonClick}
            >
              View Cart
            </button>
            <button
              className="rounded-md py-3 px-4 bg-black text-white disabled:cursor-not-allowed disabled:opacity-75"
              disabled={isLoading}
              onClick={handleCheckout}
            >
              Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartModal;
