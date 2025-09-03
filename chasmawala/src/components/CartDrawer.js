"use client";
import { useCart } from "@/contexts/CartContext";
import { X, Trash2, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";

export default function CartDrawer({ isOpen, onClose }) {
  // Assuming useCart provides these values and functions
  const { cartItems, removeFromCart, increaseQuantity, decreaseQuantity } = useCart() || { 
    cartItems: [], 
    removeFromCart: () => {}, 
    increaseQuantity: () => {}, 
    decreaseQuantity: () => {} 
  };

  // Calculate the subtotal
  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // Close drawer on 'Escape' key press for accessibility
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);
  
  // Prevent body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);


  return (
    <div
      className={`fixed inset-0 z-50 transition-opacity duration-300 ${
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      ></div>

      {/* Drawer Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl flex flex-col transition-transform duration-300 ease-in-out ${
          isOpen ? "transform-none" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-800">Your Cart</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800 transition-colors p-1 rounded-full hover:bg-gray-100"
            aria-label="Close cart"
          >
            <X size={24} />
          </button>
        </div>

        {/* Cart Content */}
        {cartItems.length === 0 ? (
          <EmptyCartView onClose={onClose} />
        ) : (
          <>
            <div className="flex-grow overflow-y-auto p-6 space-y-6">
              {cartItems.map((item) => (
                <CartItem
                  key={item.ProductId}
                  item={item}
                  onRemove={removeFromCart}
                  onIncrease={increaseQuantity}
                  onDecrease={decreaseQuantity}
                />
              ))}
            </div>

            {/* Footer */}
            <div className="p-6 border-t bg-gray-50">
              <div className="flex justify-between items-center mb-4">
                <span className="text-lg font-semibold text-gray-800">Subtotal</span>
                <span className="text-xl font-bold text-gray-900">
                  ${subtotal.toFixed(2)}
                </span>
              </div>
              <p className="text-xs text-gray-500 text-center mb-4">
                Shipping & taxes calculated at checkout.
              </p>
              <Link href="/checkout">
                <button 
                  className="w-full bg-emerald-600 text-white py-3 rounded-lg font-semibold text-lg hover:bg-emerald-700 transition-all duration-300 ease-in-out transform hover:scale-105"
                  onClick={onClose}
                >
                  Proceed to Checkout
                </button>
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// Sub-component for a single cart item
const CartItem = ({ item, onRemove, onIncrease, onDecrease }) => (
  <div className="flex items-start space-x-4">
    <div className="flex-shrink-0">
      <img
        src={item.images[0] || 'https://placehold.co/80x80/e2e8f0/e2e8f0?text=Img'}
        alt={item.name}
        className="w-20 h-20 object-cover rounded-lg border"
      />
    </div>
    <div className="flex-grow">
      <h3 className="text-base font-semibold text-gray-800">{item.name}</h3>
      <p className="text-sm text-gray-600 mt-1">${item.price.toFixed(2)}</p>
      <div className="flex items-center justify-between mt-3">
        {/* Quantity Stepper */}
        <div className="flex items-center border border-gray-300 rounded-md">
          <button onClick={() => onDecrease(item.ProductId)} className="px-3 py-1 text-lg text-gray-600 hover:bg-gray-100">-</button>
          <span className="px-4 py-1 text-base font-medium">{item.quantity}</span>
          <button onClick={() => onIncrease(item.ProductId)} className="px-3 py-1 text-lg text-gray-600 hover:bg-gray-100">+</button>
        </div>
        {/* Remove Button */}
        <button onClick={() => onRemove(item.ProductId)} className="text-gray-400 hover:text-red-500 transition-colors" aria-label={`Remove ${item.name}`}>
          <Trash2 size={20} />
        </button>
      </div>
    </div>
  </div>
);

// Sub-component for the empty cart view
const EmptyCartView = ({ onClose }) => (
  <div className="flex flex-col items-center justify-center h-full text-center p-8">
    <ShoppingBag size={64} className="text-gray-300 mb-4" />
    <h3 className="text-xl font-semibold text-gray-800">Your cart is empty</h3>
    <p className="text-gray-500 mt-2 mb-6">Looks like you haven't added anything to your cart yet.</p>
    <button
      onClick={onClose}
      className="bg-emerald-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-emerald-700 transition-colors"
    >
      Start Shopping
    </button>
  </div>
);
