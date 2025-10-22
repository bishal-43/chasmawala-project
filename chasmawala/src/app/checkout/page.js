"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/authContext";

export default function CheckoutPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const { cart: cartItems, clearCart } = useCart();

  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [error, setError] = useState("");
  const items = Array.isArray(cartItems) ? cartItems : [];

  // Shipping form state
  const [shipping, setShipping] = useState({
    fullName: user?.name || "",
    phone: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("COD"); // COD | Stripe | Razorpay | Card

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push("/account/login?redirect=/checkout");
      }
    }
  }, [user, loading, router]);

  const totalAmount = items.reduce((acc, item) => {
    const price = Number(item.price);
    const quantity = Number(item.quantity);
    return acc + (isNaN(price) || isNaN(quantity) ? 0 : price * quantity);
  }, 0);

  function updateShipping(field, value) {
    setShipping(prev => ({ ...prev, [field]: value }));
  }

  async function handlePlaceOrder() {
    setError("");
    if (items.length === 0) {
      setError("Cart is empty. Add items before placing an order.");
      return;
    }

    // basic shipping validation
    const required = ["fullName", "phone", "addressLine1", "city", "state", "postalCode"];
    for (const r of required) {
      if (!shipping[r] || shipping[r].toString().trim() === "") {
        setError("Please complete the shipping address.");
        return;
      }
    }

    setLoadingSubmit(true);

    try {
      // prepare payload - productId must be actual DB id
      const payloadItems = items.map((it) => ({
        productId: it._id || it.productId || it.id,
        quantity: it.quantity,
        // don't send price as truth; server will compute price. Sent for convenience only.
        price: it.price,
        name: it.name,
        image: it.image,
      }));

      const res = await fetch("/api/orders/place", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          items: payloadItems,
          shippingAddress: shipping,
          paymentMethod,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        // success: clear cart, route to success page
        clearCart && clearCart();
        localStorage.removeItem("cart"); // extra safety
        router.push(`/order-success?orderId=${data.orderId || data.orderId}&orderNumber=${data.orderNumber || ""}`);
      } else {
        setError(data.error || "Failed to place order");
      }
    } catch (err) {
      console.error("Checkout error:", err);
      setError("Something went wrong. Try again.");
    } finally {
      setLoadingSubmit(false);
    }
  }

  return (
    <div className="min-h-screen p-6">
      <h1 className="text-2xl font-bold mb-6">Checkout</h1>

      {items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded shadow">
            <h2 className="text-lg font-semibold mb-4">Shipping Address</h2>
            <h5 className="text-lg font-semibold mb-4">Delivery available only in Janakpur, Nepal</h5>

            <div className="space-y-2">
              <input value={shipping.fullName} onChange={(e) => updateShipping("fullName", e.target.value)} placeholder="Full name" className="w-full p-2 border rounded" />
              <input value={shipping.phone} onChange={(e) => updateShipping("phone", e.target.value)} placeholder="Phone" className="w-full p-2 border rounded" />
              <input value={shipping.addressLine1} onChange={(e) => updateShipping("addressLine1", e.target.value)} placeholder="Address line 1" className="w-full p-2 border rounded" />
              <input value={shipping.addressLine2} onChange={(e) => updateShipping("addressLine2", e.target.value)} placeholder="Address line 2 (optional)" className="w-full p-2 border rounded" />
              <div className="grid grid-cols-2 gap-2">
                <input value={shipping.city} onChange={(e) => updateShipping("city", e.target.value)} placeholder="City" className="p-2 border rounded" />
                <input value={shipping.state} onChange={(e) => updateShipping("state", e.target.value)} placeholder="State" className="p-2 border rounded" />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <input value={shipping.postalCode} onChange={(e) => updateShipping("postalCode", e.target.value)} placeholder="Postal code" className="p-2 border rounded" />
                <input value={shipping.country} onChange={(e) => updateShipping("country", e.target.value)} placeholder="Country" className="p-2 border rounded" />
              </div>
            </div>

            <h2 className="text-lg font-semibold mt-6 mb-2">Payment</h2>
            <div className="space-y-2">
              <label className="flex items-center gap-2"><input type="radio" checked={paymentMethod === "COD"} onChange={() => setPaymentMethod("COD")} /> Cash on Delivery (COD)</label>
              {/* <label className="flex items-center gap-2"><input type="radio" checked={paymentMethod === "Stripe"} onChange={() => setPaymentMethod("Stripe")} /> Card / Stripe (demo)</label> */}
              {/* <label className="flex items-center gap-2"><input type="radio" checked={paymentMethod === "Razorpay"} onChange={() => setPaymentMethod("Razorpay")} /> UPI / Razorpay (demo)</label> */}
            </div>

            {error && <div className="mt-4 text-red-600">{error}</div>}

            <button
              onClick={handlePlaceOrder}
              disabled={loadingSubmit}
              className="mt-6 bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 disabled:opacity-60"
            >
              {loadingSubmit ? "Placing order..." : `Place Order — ₹${totalAmount.toFixed(2)}`}
            </button>
          </div>

          <div className="bg-white p-6 rounded shadow">
            <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
            <div className="space-y-3">
              {items.map((item) => (
                <div key={`${item._id || item.productId || item.id}`} className="flex items-center gap-4 border-b pb-3">
                  <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
                  <div className="flex-1">
                    <div className="font-medium">{item.name}</div>
                    <div className="text-sm text-gray-500">Qty: {item.quantity}</div>
                  </div>
                  <div className="font-semibold">₹{(Number(item.price) * Number(item.quantity)).toFixed(2)}</div>
                </div>
              ))}
            </div>

            <div className="mt-4 border-t pt-4">
              <div className="flex justify-between font-semibold">Subtotal <span>₹{totalAmount.toFixed(2)}</span></div>
              <div className="flex justify-between text-sm text-gray-500">Shipping <span>Calculated at fulfillment</span></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
