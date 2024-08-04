'use client';

import Image from 'next/image';
import { useCartStore } from '@/hooks/useCartStore';
import { media as wixMedia } from '@wix/sdk';
import { useWixClient } from '@/hooks/useWixClient';
import { useRouter } from 'next/navigation';
import React from 'react';
import { currentCart } from '@wix/ecom';

const CartPage = () => {
  const { cart, isLoading, removeItem }: { cart: any, isLoading: boolean, removeItem: (client: any, itemId: string) => void } = useCartStore();
  const wixClient = useWixClient();
  const router = useRouter();

  const handleCheckout = async () => {
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
    <div className="min-h-screen mt-20 bg-zinc-900 p-4 md:p-8">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
      {cart.lineItems.length === 0 ? (
        <div className="text-center text-lg">Your cart is empty</div>
      ) : (
        <>
          <div className="flex flex-col gap-8">
            {cart.lineItems.map((item: any) => (
              <div className="flex gap-4 bg-zinc-800 p-4 rounded-md shadow-md" key={item._id}>
                {item.image && (
                  <Image
                    src={wixMedia.getScaledToFillImageUrl(item.image, 100, 100, {})}
                    alt={item.productName?.original || 'Product Image'}
                    width={100}
                    height={100}
                    className="object-cover rounded-md"
                  />
                )}
                <div className="flex flex-col justify-between w-full">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold">{item.productName?.original}</h3>
                      <div className="p-1 bg-zinc-800 rounded-sm flex items-center gap-2">
                        {item.quantity && item.quantity > 1 && (
                          <div className="text-xs text-green-500">
                            {item.quantity} x
                          </div>
                        )}
                        Rs {item.price?.amount}
                      </div>
                    </div>
                    <div className="text-sm text-gray-500 mb-2">
                      {item.availability?.status}
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-100">Qty. {item.quantity}</span>
                      <span
                        className="text-blue-500 cursor-pointer"
                        style={{ cursor: isLoading ? 'not-allowed' : 'pointer' }}
                        onClick={() => removeItem(wixClient, item._id!)}
                      >
                        Remove
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8">
            <div className="flex items-center justify-between font-semibold text-lg">
              <span>Subtotal</span>
              <span>Rs {cart.subtotal.amount}</span>
            </div>
            <p className="text-gray-500 text-sm mt-2 mb-4">
              Shipping and taxes calculated at checkout.
            </p>
            <div className="flex justify-between gap-4">
              <button
                className="rounded-md py-3 px-4 bg-gray-200 text-gray-700"
                onClick={() => router.push('/')}
              >
                Continue Shopping
              </button>
              <button
                className="rounded-md py-3 px-4 bg-black text-white disabled:cursor-not-allowed disabled:opacity-75"
                disabled={isLoading}
                onClick={handleCheckout}
              >
                Checkout
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;
