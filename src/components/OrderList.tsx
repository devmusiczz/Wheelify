// src/components/OrdersList.tsx
"use client";

import Link from "next/link";
import { format } from "timeago.js";
import React from "react";

// Define the Order interface
interface Order {
  _id: string;
  priceSummary: {
    subtotal: {
      amount: number;
    };
  } | undefined;
  _createdDate?: Date;
  status?: string;
}

interface OrdersListProps {
  orders: Order[];
}

const OrdersList: React.FC<OrdersListProps> = ({ orders }) => {
  return (
    <div className="w-full md:w-1/2">
      <h1 className="text-2xl">Orders</h1>
      <div className="mt-12 flex flex-col">
        {orders.map((order) => (
          <Link
            href={`/orders/${order._id}`}
            key={order._id ?? Math.random().toString(36).substr(2, 9)}
            className="flex justify-between px-2 py-6 rounded-md hover:bg-zinc-600 even:bg-zinc-800"
          >
            <span className="w-1/4">{order._id?.substring(0, 10) ?? 'N/A'}...</span>
            <span className="w-1/4">
              Rs {order.priceSummary?.subtotal?.amount}
            </span>
            {order._createdDate && (
              <span className="w-1/4">{format(order._createdDate)}</span>
            )}
            <span className="w-1/4">{order.status}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default OrdersList;