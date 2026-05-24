// src/app/admin/(protected)/products/add/page.js

'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import Link from 'next/link';
import { ArrowLeft, Upload, Sparkles, X, Check, ImageIcon } from 'lucide-react';

const BRANDS = [
  'Ray-Ban',
  'Oakley',
  'John Jacobs',
  'Gucci',
  'Vogue Eyewear',
  'Carrera',
  'Fastrack',
  'Lenskart Air',
  'Vincent Chase',
  'Polaroid',
  'Generic-Brand'
];

export default function AddProductPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    brand: '',
  });

  const [isCustomBrand, setIsCustomBrand] = useState(false);
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleBrandSelectChange = (e) => {
    const value = e.target.value;
    if (value === 'custom') {
      setIsCustomBrand(true);
      setFormData((prev) => ({ ...prev, brand: '' }));
    } else {
      setIsCustomBrand(false);
      setFormData((prev) => ({ ...prev, brand: value }));
    }
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

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type.startsWith('image/')) {
        setImage(file);
        setImagePreview(URL.createObjectURL(file));
      } else {
        toast.error("Please upload an image file.");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.brand.trim()) {
      toast.error("Please select or enter a brand.");
      return;
    }
    if (!image) {
      toast.error("Please select an image for the product.");
      return;
    }

    setIsUploading(true);

    const productData = new FormData();
    productData.append('name', formData.name);
    productData.append('description', formData.description);
    productData.append('price', formData.price);
    productData.append('category', formData.category);
    productData.append('brand', formData.brand.trim());
    productData.append('image', image);

    try {
      await axios.post('/api/products', productData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      toast.success("Product added successfully!");
      router.push("/admin/products");
    } catch (err) {
      console.error("Failed to add product:", err);
      const errorMessage = err.response?.data?.error || "An unexpected error occurred.";
      toast.error(errorMessage);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 animate-in fade-in duration-500">
      {/* Back button */}
      <div className="mb-6">
        <Link href="/admin/products" className="inline-flex items-center gap-2 text-sm font-semibold text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Back to Catalog
        </Link>
      </div>

      {/* Header section */}
      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 bg-amber-500/10 rounded-2xl border border-amber-500/20">
          <Sparkles className="w-6 h-6 text-amber-500" />
        </div>
        <div>
          <h1 className="text-3xl font-extrabold text-zinc-900 tracking-tight dark:text-zinc-50">Add New Product</h1>
          <p className="text-[14px] text-zinc-500 font-medium">Create a new item in your store's inventory catalog.</p>
        </div>
      </div>

      {/* Form Card */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 shadow-xl rounded-3xl p-6 sm:p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Product Name</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g., Ray-Ban Aviator Classic"
              required
              className="px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-750 bg-white dark:bg-zinc-800 focus:outline-none focus:ring-4 focus:ring-amber-500/10 focus:border-amber-500 transition duration-200"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Description</Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe the styling, lens details, frame material, and warranty information..."
              rows={4}
              required
              className="px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-750 bg-white dark:bg-zinc-800 focus:outline-none focus:ring-4 focus:ring-amber-500/10 focus:border-amber-500 transition duration-200 min-h-[120px]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="price" className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Price (₹)</Label>
              <Input
                id="price"
                name="price"
                type="number"
                value={formData.price}
                onChange={handleChange}
                placeholder="e.g., 1499"
                required
                className="px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-750 bg-white dark:bg-zinc-800 focus:outline-none focus:ring-4 focus:ring-amber-500/10 focus:border-amber-500 transition duration-200"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category" className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Category</Label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="w-full h-[46px] px-4 rounded-xl border border-zinc-200 dark:border-zinc-750 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-4 focus:ring-amber-500/10 focus:border-amber-500 transition duration-200"
              >
                <option value="">Select Category</option>
                <option value="sunglasses">Sunglasses</option>
                <option value="eyeglasses">Eyeglasses</option>
                <option value="contact-lenses">Contact Lenses</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-start">
            <div className="space-y-2">
              <Label htmlFor="brandSelect" className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Brand</Label>
              <select
                id="brandSelect"
                value={isCustomBrand ? "custom" : formData.brand}
                onChange={handleBrandSelectChange}
                required
                className="w-full h-[46px] px-4 rounded-xl border border-zinc-200 dark:border-zinc-750 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-4 focus:ring-amber-500/10 focus:border-amber-500 transition duration-200"
              >
                <option value="">Select a Brand</option>
                {BRANDS.map((b) => (
                  <option key={b} value={b}>{b}</option>
                ))}
                <option value="custom" className="text-amber-600 font-bold dark:text-amber-400">⚡ Other / Custom Brand...</option>
              </select>
            </div>

            {isCustomBrand && (
              <div className="space-y-2 animate-in slide-in-from-top-2 duration-200">
                <Label htmlFor="brand" className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Custom Brand Name</Label>
                <Input
                  id="brand"
                  name="brand"
                  value={formData.brand}
                  onChange={handleChange}
                  placeholder="Type custom brand name (e.g., Gucci)"
                  required
                  className="px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-750 bg-white dark:bg-zinc-800 focus:outline-none focus:ring-4 focus:ring-amber-500/10 focus:border-amber-500 transition duration-200"
                />
                <p className="text-[11px] text-amber-600 dark:text-amber-400 font-medium">
                  This brand name will be submitted exactly as entered.
                </p>
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Product Image</Label>

            {!imagePreview ? (
              <div
                onDragEnter={handleDrag}
                onDragOver={handleDrag}
                onDragLeave={handleDrag}
                onDrop={handleDrop}
                className={`relative flex flex-col items-center justify-center w-full h-56 border-2 border-dashed rounded-2xl cursor-pointer transition-all duration-300 ${dragActive
                  ? "border-amber-500 bg-amber-50/50 dark:bg-amber-500/10"
                  : "border-zinc-200 dark:border-zinc-750 bg-zinc-50/50 dark:bg-zinc-800/40 hover:bg-zinc-50 dark:hover:bg-zinc-800/60 hover:border-zinc-300 dark:hover:border-zinc-700"
                  }`}
              >
                <input
                  id="image"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  required
                />
                <div className="flex flex-col items-center justify-center pt-5 pb-6 text-center px-4">
                  <div className="p-3 bg-white dark:bg-zinc-800 rounded-2xl shadow-sm border border-zinc-100 dark:border-zinc-750 mb-3 text-zinc-400 dark:text-zinc-300 transition-transform duration-300">
                    <Upload className="w-6 h-6 text-amber-500" />
                  </div>
                  <p className="mb-2 text-sm text-zinc-700 dark:text-zinc-300">
                    <span className="font-bold text-amber-600 dark:text-amber-400">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-xs text-zinc-400 dark:text-zinc-500">
                    PNG, JPG, JPEG or WEBP (Max 5MB)
                  </p>
                </div>
              </div>
            ) : (
              <div className="relative rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-750 bg-zinc-50 dark:bg-zinc-800/50 p-4 flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="relative w-20 h-20 rounded-xl overflow-hidden shadow-inner border border-zinc-100 dark:border-zinc-700 bg-white dark:bg-zinc-800 flex-shrink-0">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-bold text-zinc-800 dark:text-zinc-100 truncate max-w-[240px] sm:max-w-[320px]">
                      {image?.name || "product-image.jpg"}
                    </p>
                    <p className="text-xs text-zinc-400">
                      {image ? `${(image.size / 1024 / 1024).toFixed(2)} MB` : ""}
                    </p>
                    <span className="inline-flex items-center gap-1 mt-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">
                      <Check className="w-3 h-3" /> Ready to upload
                    </span>
                  </div>
                </div>
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  onClick={() => {
                    setImage(null);
                    setImagePreview("");
                  }}
                  className="h-9 rounded-xl bg-rose-50 text-rose-600 hover:bg-rose-100 dark:bg-rose-500/10 dark:text-rose-400 dark:hover:bg-rose-500/20 border-0 flex gap-1 items-center px-3"
                >
                  <X className="w-4 h-4" /> Remove
                </Button>
              </div>
            )}
          </div>

          <div className="pt-4 flex gap-4">
            <Link href="/admin/products" className="w-1/3">
              <Button type="button" variant="outline" className="w-full h-12 rounded-xl font-bold border-zinc-200 text-zinc-650 hover:bg-zinc-50 dark:border-zinc-700 dark:hover:bg-zinc-850 dark:text-zinc-300">
                Cancel
              </Button>
            </Link>
            <Button
              type="submit"
              className="w-2/3 h-12 rounded-xl bg-gradient-to-r from-amber-400 to-amber-600 hover:from-amber-500 hover:to-amber-700 text-zinc-950 hover:shadow-lg transition-all duration-200 font-bold border-0"
              disabled={isUploading}
            >
              {isUploading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 rounded-full border-2 border-zinc-950 border-t-transparent animate-spin" />
                  <span>Adding Product...</span>
                </div>
              ) : (
                'Add Product'
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
