// /src/app/checkout/page.js
"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/contexts/CartContext";

export default function CheckoutPage() {

  const router = useRouter();


  const { cart: cartItems } = useCart();

  const totalAmount = Array.isArray(cartItems)
  ? cartItems.reduce((acc, item) => {
      const price = Number(item.price);
      const quantity = Number(item.quantity);
      return acc + (isNaN(price) || isNaN(quantity) ? 0 : price * quantity);
    }, 0)
  : 0;

console.log("🧮 Total Amount:", totalAmount);
console.log("🛒 Cart Items:", cartItems);


  const handlePlaceOrder = async () => {
    if (cartItems.length === 0) {
      alert("Cart is empty. Please add items to proceed.");
      return;
    }

    try {
      const res = await fetch("/api/orders/place", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          items: cartItems.map((item) => ({
            productId: item.productId || item.id, // use the correct MongoDB ID
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            image: item.image,
          })),
          totalAmount
          
         }),
      });
      console.log(typeof totalAmount);
      const data = await res.json();

      if (res.ok) {
        localStorage.removeItem("cart");
        router.push(`/order-success?orderId=${data.orderId}`);
      } else {
        alert(data.error || "Order failed");
      }
    } catch (error) {
      console.error("❌ Order Error:", error);
      alert("Something went wrong. Try again.");
    }
  };

  return (
    <div className="min-h-screen p-6">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>

      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="space-y-4">
          {cartItems.map((item) => (
            <div key={`${item.productId}-${item.size}-${item.color}`} className="p-4 bg-white rounded shadow">

              <p className="font-semibold">{item.name}</p>
              <p>Qty: {item.quantity}</p>
              <p>Price: ₹{item.price}</p>
            </div>
          ))}

          <button
            onClick={handlePlaceOrder}
            className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
          >
            Place Order
          </button>
        </div>
      )}
    </div>
  );
}
