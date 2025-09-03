// app/admin/(protected)/products/[slug]/edit/page.js

"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import { toast } from "react-hot-toast";
import Link from "next/link";

export default function EditProductPage() {
  const router = useRouter();
  const params = useParams();
  const { slug } = params; // product slug from URL

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch existing product details
  useEffect(() => {
    if (!slug) return;
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`/api/products/${encodeURIComponent(slug)}`);
        setProduct(res.data);
      } catch (err) {
        toast.error("Failed to load product");
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [slug]);

  // Handle input change
  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  // Handle update submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/api/products/${encodeURIComponent(slug)}`, product);
      toast.success("Product updated successfully!");
      router.back();
    } catch (err) {
      toast.error("Failed to update product");
    }
  };

  if (loading) return <p className="p-6">Loading...</p>;
  if (!product) return <p className="p-6">Product not found</p>;

  return (
    <div className="max-w-3xl mx-auto p-6">
        {/* ✅ Back Button */}
      <Button
        variant="outline"
        onClick={() => router.back()}
        className="mb-4"
      >
        ← Back
      </Button>

      <h2 className="text-2xl font-bold mb-6">Edit Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label>Name</Label>
          <Input
            name="name"
            value={product.name || ""}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <Label>Description</Label>
          <Textarea
            name="description"
            value={product.description || ""}
            onChange={handleChange}
          />
        </div>
        <div>
          <Label>Price</Label>
          <Input
            type="number"
            name="price"
            value={product.price || ""}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <Label>Category</Label>
          <Input
            name="category"
            value={product.category || ""}
            onChange={handleChange}
          />
        </div>
        <div>
          <Label>Image URL</Label>
          <Input
            name="image"
            value={product.image || ""}
            onChange={handleChange}
          />
        </div>
        <Button type="submit" className="w-full">
          Update Product
        </Button>
      </form>
    </div>
  );
}
