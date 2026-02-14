"use client";
import { useCart } from "@/contexts/CartContext";
import Link from "next/link";
import Image from "next/image";

const CartPage = () => {
  const { cart, removeFromCart, updateQuantity } = useCart();

  // ✅ Prevent undefined errors by ensuring cart is always an array
  if (!cart || !Array.isArray(cart)) return <p className="text-center">Loading cart...</p>;

  return (
    <div className="container mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold text-center mb-6">Your Cart</h1>

      {cart.length === 0 ? (
        <p className="text-center text-gray-600">Your cart is empty.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cart.map((item) => (
            <div
              key={`${item.productId || item._id}-${item.size || ""}-${item.color || ""}`}
              className="border rounded-lg p-4 shadow-lg flex"
            >
              <Image
                src={item.image}
                alt={item.name}
                width={80}
                height={80}
                className="object-cover rounded-md"
              />
              <div className="ml-4">
                <h3 className="text-lg font-bold">{item.name}</h3>
                <p className="text-gray-700">NRs{item.price}</p>
                <div className="flex items-center mt-2">
                  <button
                    onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                    className="px-2 py-1 bg-gray-200 rounded"
                    disabled={item.quantity === 1}
                  >
                    -
                  </button>
                  <span className="mx-2">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                    className="px-2 py-1 bg-gray-200 rounded"
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={() => removeFromCart(item.productId)}
                  className="mt-3 px-4 py-2 bg-red-500 text-white rounded"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="text-center mt-6">
        <Link href="/checkout" className="bg-green-500 text-white px-6 py-2 rounded">
          Proceed to Checkout
        </Link>
      </div>
    </div>
  );
};

export default CartPage;
