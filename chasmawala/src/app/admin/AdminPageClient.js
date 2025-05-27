"use client";
import { useState } from "react";
import axios from "axios";

const AdminPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    brand: "",
    stock: "",
    discount: "",
    tags: "",
    sku: "",
    color: "",
    category: "",
    featured: false,
    image: null,
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === "checkbox") {
      setFormData({ ...formData, [name]: checked });
    } else if (type === "file") {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const validateForm = () => {
    const { name, price, category, image } = formData;
    if (!name || !price || !category || !image) {
      setMessage("All required fields must be filled.");
      return false;
    }
    if (isNaN(price) || price <= 0) {
      setMessage("Please enter a valid price.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    const form = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value !== null) form.append(key, value);
    });

    try {
      const res = await axios.post("/api/products", form);
      setMessage("✅ Product Added Successfully!");
      setFormData({
        name: "",
        description: "",
        price: "",
        brand: "",
        stock: "",
        discount: "",
        tags: "",
        sku: "",
        color: "",
        category: "",
        featured: false,
        image: null,
      });
    } catch (error) {
      console.error("Failed to Add Product:", error);
      setMessage("❌ Failed to add product. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-6">Admin Panel - Upload Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="name" placeholder="Product Name" value={formData.name} onChange={handleChange} className="w-full p-3 border rounded" />
        <input type="text" name="description" placeholder="Description" value={formData.description} onChange={handleChange} className="w-full p-3 border rounded" />
        <input type="number" name="price" placeholder="Price" value={formData.price} onChange={handleChange} className="w-full p-3 border rounded" />
        <input type="text" name="brand" placeholder="Brand" value={formData.brand} onChange={handleChange} className="w-full p-3 border rounded" />
        <input type="number" name="stock" placeholder="Stock Quantity" value={formData.stock} onChange={handleChange} className="w-full p-3 border rounded" />
        <input type="number" name="discount" placeholder="Discount (%)" value={formData.discount} onChange={handleChange} className="w-full p-3 border rounded" />
        <input type="text" name="tags" placeholder="Tags (comma-separated)" value={formData.tags} onChange={handleChange} className="w-full p-3 border rounded" />
        <input type="text" name="sku" placeholder="SKU" value={formData.sku} onChange={handleChange} className="w-full p-3 border rounded" />
        <input type="text" name="color" placeholder="Color" value={formData.color} onChange={handleChange} className="w-full p-3 border rounded" />
        <select name="category" value={formData.category} onChange={handleChange} className="w-full p-3 border rounded">
          <option value="">Select Category</option>
          <option value="sunglasses">Sunglasses</option>
          <option value="eyeglasses">Eyeglasses</option>
          <option value="contact-lenses">Contact Lenses</option>
        </select>
        <label className="flex items-center space-x-2">
          <input type="checkbox" name="featured" checked={formData.featured} onChange={handleChange} />
          <span>Featured Product</span>
        </label>
        <input type="file" name="image" onChange={handleChange} className="w-full p-3 border rounded" />
        <button type="submit" disabled={loading} className="w-full p-3 bg-blue-600 text-white rounded hover:bg-blue-700">
          {loading ? "Uploading..." : "Upload Product"}
        </button>
      </form>
      {message && <p className="mt-4 text-center">{message}</p>}
    </div>
  );
};

export default AdminPage;
