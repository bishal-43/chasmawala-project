export const products = [
    { name: "Classic Sunglasses", price: 2499, image: "/images/categories/sunglasses1.jpg", category: "Sunglasses" },
    { name: "Stylish Eyeglasses", price: 1999, image: "/images/categories/eyeglasses2.jpg", category: "Eyeglasses" },
    { name: "Premium Contact Lenses", price: 1299, image: "/images/categories/contactlens3.jpg", category: "Contact Lenses" },
    { name: "Modern Sunglasses", price: 2999, image: "/images/categories/sunglasses4.jpg", category: "Sunglasses" },
    { name: "Elegant Eyeglasses", price: 2199, image: "/images/categories/eyeglasses5.jpg", category: "Eyeglasses" },
    { name: "Aviator Sunglasses", price: 2799, image: "/images/categories/sunglasses6.jpg", category: "Sunglasses" },
    { name: "Round Frame Eyeglasses", price: 1899, image: "/images/categories/eyeglasses7.jpg", category: "Eyeglasses" },
    { name: "Daily Wear Contact Lenses", price: 1499, image: "/images/categories/contactlens8.jpg", category: "Contact Lenses" },
    { name: "Polarized Sunglasses", price: 3199, image: "/images/categories/sunglasses9.jpg", category: "Sunglasses" },
    { name: "Vintage Eyeglasses", price: 2299, image: "/images/categories/eyeglasses3.jpg", category: "Eyeglasses" },
    { name: "Blue Light Blocking Glasses", price: 1599, image: "/images/categories/eyeglasses1.jpg", category: "Eyeglasses" },
    { name: "UV Protection Contact Lenses", price: 1399, image: "/images/categories/contactlens9.jpg", category: "Contact Lenses" },
    { name: "Sporty Sunglasses", price: 3499, image: "/images/categories/sunglasses8.jpg", category: "Sunglasses" },
    { name: "Cat Eye Eyeglasses", price: 2099, image: "/images/categories/eyeglasses7.jpg", category: "Eyeglasses" },
    { name: "Tinted Contact Lenses", price: 1699, image: "/images/categories/contactlens6.jpg", category: "Contact Lenses" },
  ];

import axios from 'axios';

export const fetchProducts = async () => {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/products`);
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};
