"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import CartModal from "./CartModal";
import { useWixClient } from "@/hooks/useWixClient";
import Cookies from "js-cookie";
import { useCartStore } from "@/hooks/useCartStore";

const NavIcons = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const profileRef = useRef(null);
  const router = useRouter();
  const pathName = usePathname();

  const wixClient = useWixClient();
  const isLoggedIn = wixClient.auth.loggedIn();

  const handleProfile = () => {
    if (!isLoggedIn) {
      router.push("/login");
    } else {
      setIsProfileOpen((prev) => !prev);
    }
  };

  const handleLogout = async () => {
    setIsLoading(true);
    Cookies.remove("refreshToken");
    const { logoutUrl } = await wixClient.auth.logout(window.location.href);
    setIsLoading(false);
    setIsProfileOpen(false);
    router.push(logoutUrl);
  };

  const { cart, counter, getCart, cartOpen, openCart, closeCart } = useCartStore(); // Added cartOpen, openCart, and closeCart from the store

  useEffect(() => {
    getCart(wixClient);
  }, [wixClient, getCart]);

  useEffect(() => {
    const handleClickOutside = (event: { target: any; }) => {
      if (profileRef.current && !(profileRef.current as HTMLElement).contains(event.target)) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleCartClick = () => {
    if (cartOpen) {
      closeCart(); // Close the cart modal
    } else {
      openCart(); // Open the cart modal
    }
  };

  return (
    <div className="flex items-center gap-4 xl:gap-6 relative">
      <Image
        src="/profile.png"
        alt=""
        width={22}
        height={22}
        className="cursor-pointer"
        onClick={handleProfile}
      />
      {isProfileOpen && (
        <div
          ref={profileRef}
          className="absolute p-4 rounded-md top-12 left-0 bg-zinc-900 text-sm shadow-[0_3px_10px_rgb(0,0,0,0.2)] z-20"
        >
          <Link href="/profile">Profile</Link>
          <div className="mt-2 cursor-pointer" onClick={handleLogout}>
            {isLoading ? "Logging out" : "Logout"}
          </div>
        </div>
      )}
      <div
        className="relative cursor-pointer"
        onClick={handleCartClick} // Toggle cart modal using global state
      >
        <Image src="/cart.png" alt="" width={22} height={22} />
        <div className="absolute -top-4 -right-4 w-6 h-6 bg-lama rounded-full text-white text-sm flex items-center justify-center">
          {counter}
        </div>
      </div>
      {cartOpen && <CartModal />} {/* Render the CartModal based on global state */}
    </div>
  );
};

export default NavIcons;
