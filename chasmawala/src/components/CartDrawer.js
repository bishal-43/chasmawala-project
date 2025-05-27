"use client";
import { useCart } from "@/contexts/CartContext";

export default function CartDrawer({ isOpen, onClose }) {
  const { cartItems, removeFromCart, increaseQuantity, decreaseQuantity } = useCart();

  if (!isOpen) return null;

  return (
    <div className="fixed top-0 right-0 w-[300px] h-full bg-white shadow-lg z-50 transition-transform transform duration-300 ease-in-out">
      <div className="p-4 flex justify-between border-b">
        <h2 className="text-lg font-bold">Your Cart</h2>
        <button onClick={onClose} className="text-red-500">
          Close
        </button>
      </div>

      {cartItems.length === 0 ? (
        <p className="text-center p-4">Your cart is empty.</p>
      ) : (
        <div className="p-4 space-y-4">
          {cartItems.map((item) => (
            <div key={item.ProductId} className="flex justify-between items-center">
              <img src={item.images[0]} alt={item.name} className="w-12 h-12" />
              <div>
                <h3 className="text-sm font-semibold">{item.name}</h3>
                <p className="text-xs text-gray-500">{item.price}</p>
                <div className="flex items-center gap-2 mt-1">
                  <button onClick={() => decreaseQuantity(item.ProductId)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => increaseQuantity(item.ProductId)}>+</button>
                </div>
              </div>
              <button
                onClick={() => removeFromCart(item.ProductId)}
                className="text-red-500 text-sm"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
