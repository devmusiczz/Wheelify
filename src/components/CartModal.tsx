"use client";

import React, { useEffect, useRef, useState } from "react";
import { useCartStore } from "@/hooks/useCartStore";
import { useWixClient } from "@/hooks/useWixClient";
import { currentCart } from "@wix/ecom";
import { useRouter } from "next/navigation";
import CartInfo from "@/components/CartInfo";

const CartModal = ({ closeModal }: { closeModal: () => void }) => {
  const wixClient = useWixClient();
  const { cart, isLoading, removeItem }: { cart: any; isLoading: boolean; removeItem: (client: any, itemId: string) => void } = useCartStore();
  const modalRef = useRef<HTMLDivElement | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Track user login state
  const [showLoginPopup, setShowLoginPopup] = useState(false); // Toggle login modal visibility
  const [showCartModal, setShowCartModal] = useState(true); // Control Cart modal visibility
  const router = useRouter();

  // Check authentication status on component mount
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const isLoggedIn = wixClient.auth.loggedIn(); // Check if the user is logged in
        setIsAuthenticated(isLoggedIn);
      } catch (err) {
        console.log("Error checking authentication status", err);
      }
    };

    checkAuthStatus();
  }, [wixClient]);

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

  // Handle the checkout process
  const handleCheckout = async () => {
    if (!isAuthenticated) {
      setShowCartModal(false); // Hide the Cart modal
      setShowLoginPopup(true);  // Show login popup
      return;
    }

    try {
      const checkout = await wixClient.currentCart.createCheckoutFromCurrentCart({
        channelType: currentCart.ChannelType.WEB,
      });

      const { redirectSession } = await wixClient.redirects.createRedirectSession({
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

  // Handle redirect to cart page
  const handleCartButtonClick = () => {
    setShowCartModal(false); // Hide the Cart modal
    router.push("/cart");    // Redirect to the cart page
  };

  return (
    <>
      {showCartModal && (
        <div ref={modalRef} className="w-screen sm:w-max absolute ml-4 p-4 rounded-md shadow-[0_3px_10px_rgb(0,0,0,0.2)] bg-zinc-900 top-12 right-0 flex flex-col gap-6 z-20">
          {!cart.lineItems ? (
            <div>Cart is Empty</div>
          ) : (
            <>
              <CartInfo cart={cart} isLoading={isLoading} removeItem={removeItem} wixClient={wixClient} />
              <div className="flex justify-between ml-4 text-sm">
                <button className="rounded-md py-3 px-4 ring-1 ring-gray-300" onClick={handleCartButtonClick}>
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
      )}

      {/* Render login popup or redirect */}
      {showLoginPopup && (
        <div className="fixed mt-10 pt-11 inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 -top-10 bg-black bg-opacity-50 backdrop-blur-md z-40"></div>
          <div className="relative z-50 bg-zinc-900 p-6 rounded-md shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
            <h2 className="text-lg mb-4 text-white">You need to be logged in to checkout</h2>
            <button
              className="rounded-md py-3 px-4 bg-black text-white"
              onClick={() => {
                setShowLoginPopup(false);
                router.push("/login"); // Redirect to custom login page
              }}
            >
              Go to Login
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default CartModal;
