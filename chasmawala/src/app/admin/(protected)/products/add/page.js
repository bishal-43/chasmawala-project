// src/app/admin/(protected)/products/add/page.js

'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import axios from 'axios'; // Using axios for easier FormData handling

export default function AddProductPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    brand: '',
  });
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  // No useEffect for auth check is needed here.
  // The AdminLayout component already protects this page.

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    } else {
      setImage(null);
      setImagePreview('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) {
      toast.error("Please select an image for the product.");
      return;
    }

    setIsUploading(true);

    // We will create a single FormData object and send it to the
    // correct API endpoint that handles both image uploads and product creation.
    const productData = new FormData();
    productData.append('name', formData.name);
    productData.append('description', formData.description);
    productData.append('price', formData.price);
    productData.append('category', formData.category);
    productData.append('brand', formData.brand);
    productData.append('image', image); // Append the file itself

    try {
      // ✅ We use the '/api/products' endpoint, which is designed to handle
      // multipart/form-data including the image upload to Cloudinary.
      await axios.post('/api/products', productData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      toast.success("Product added successfully!");
      router.push("/admin/products"); // Redirect back to the product list

    } catch (err) {
      console.error("Failed to add product:", err);
      const errorMessage = err.response?.data?.error || "An unexpected error occurred.";
      toast.error(errorMessage);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="flex justify-center px-4 py-8">
      <div className="w-full max-w-2xl bg-white dark:bg-zinc-900 shadow-xl rounded-2xl p-6 border border-gray-200 dark:border-zinc-800">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-white">
          Add New Product
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="name">Product Name</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g., Ray-Ban Aviator"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe the product..."
              rows={4}
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="price">Price (₹)</Label>
              <Input
                id="price"
                name="price"
                type="number"
                value={formData.price}
                onChange={handleChange}
                placeholder="e.g., 1499"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 rounded border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-gray-900 dark:text-white"
              >
                <option value="">Select Category</option>
                <option value="sunglasses">Sunglasses</option>
                <option value="eyeglasses">Eyeglasses</option>
                <option value="contact-lenses">Contact Lenses</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="brand">Brand</Label>
            <Input
              id="brand"
              name="brand"
              value={formData.brand || ""}
              onChange={handleChange}
              placeholder="e.g., Ray-Ban"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="image">Product Image</Label>
            <Input
              id="image"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              required
            />
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Preview"
                className="mt-2 w-32 h-32 object-cover rounded"
              />
            )}
          </div>

          <div className="pt-4">
            <Button type="submit" className="w-full" disabled={isUploading}>
              {isUploading ? 'Uploading...' : 'Add Product'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
