"use client";

import React, { useEffect, useRef, useState } from "react";
import { useCartStore } from "@/hooks/useCartStore"; // Import the cart store
import { useWixClient } from "@/hooks/useWixClient";
import { currentCart } from "@wix/ecom";
import { useRouter } from "next/navigation";
import CartInfo from "@/components/CartInfo";

const CartModal = () => {
  const wixClient = useWixClient();
  const { cart, isLoading, removeItem, cartOpen, openCart, closeCart } = useCartStore(); // Added openCart function
  const modalRef = useRef<HTMLDivElement | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Track user login state
  const [showLoginPopup, setShowLoginPopup] = useState(false); // Toggle login modal visibility
  const router = useRouter();

  // Check authentication status on component mount
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const isLoggedIn = await wixClient.auth.loggedIn(); // Ensure proper login check
        setIsAuthenticated(isLoggedIn);
      } catch (err) {
        console.log("Error checking authentication status", err);
      }
    };

    checkAuthStatus();
  }, [wixClient]);

  // Close the modal if clicked outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        closeCart(); // Close the cart modal using the global state
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [modalRef, closeCart]);

  // Listen for changes in the cart (e.g., after adding an item) and automatically open the cart
  useEffect(() => {
    if (cart.lineItems && cart.lineItems.length > 0) {
      openCart(); // Open the cart modal after adding an item
    }
  }, [cart.lineItems, openCart]);

  // Handle the checkout process
  const handleCheckout = async () => {
    if (!isAuthenticated) {
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
    closeCart(); // Close modal using global state function
    router.push("/cart");    // Redirect to the cart page
  };

  // Only render the modal if `cartOpen` is true
  return (
    <>
      {cartOpen && (
        <div ref={modalRef} className="w-screen sm:w-max absolute ml-4 p-4 rounded-md shadow-[0_3px_10px_rgb(0,0,0,0.2)] bg-zinc-900 top-12 right-0 flex flex-col gap-6 z-20">
          {!cart.lineItems || cart.lineItems.length === 0 ? ( // Ensure cart is not empty
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
