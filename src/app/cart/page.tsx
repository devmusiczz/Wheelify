"use client";

import React, { useEffect, useState } from "react";
import { useCartStore } from "@/hooks/useCartStore";
import { useWixClient } from "@/hooks/useWixClient";
import CartInfo from "@/components/CartInfo";
import { currentCart } from "@wix/ecom";
import { useRouter } from "next/navigation";

const CartPage = () => {
  const wixClient = useWixClient();
  const router = useRouter();
  const { cart, isLoading, removeItem }: { cart: any; isLoading: boolean; removeItem: (client: any, itemId: string) => void } = useCartStore();
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Track user login state
  const [showLoginPopup, setShowLoginPopup] = useState(false); // Toggle login modal visibility

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

  // Handle the checkout process
  const handleCheckout = async () => {
    if (!isAuthenticated) {
      setShowLoginPopup(true); // Show login popup if not authenticated
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

  return (
    <>
      <div className="flex flex-col container mx-auto p-4">
        <h1 className="text-2xl mt-24 font-bold mb-4">Your Cart</h1>
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

      {/* Render login popup or redirect */}
      {showLoginPopup && (
        <div className="fixed inset-0 backdrop-blur-md bg-black bg-opacity-50 flex items-center justify-center z-30">
          <div className="bg-zinc-900 p-6 rounded-md shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
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

export default CartPage;
