// src/app/admin/(protected)/products/page.js

'use client';

import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { PlusCircle, Trash2, Pencil } from 'lucide-react';
import Link from 'next/link';
import axios from 'axios';
import toast from 'react-hot-toast';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await axios.get('/api/admin/products');
      setProducts(res.data.products || []); // ✅ make sure we set the array
    } catch (err) {
      toast.error('Failed to fetch products');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (slug) => {
    if (!confirm('Are you sure you want to delete this product?')) return;

    try {
      await axios.delete(`/api/admin/products/${encodeURIComponent(slug)}`);
      toast.success('Product deleted');
      fetchProducts(); // refresh list
    } catch (err) {
      toast.error('Error deleting product');
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Product Management</h1>
        <Link href="/admin/products/add">
          <Button className="flex gap-2 items-center">
            <PlusCircle className="w-5 h-5" />
            Add Product
          </Button>
        </Link>
      </div>

      <div className="bg-white dark:bg-gray-900 shadow rounded-lg p-4">
        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse">
            <thead className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
              <tr>
                <th className="px-4 py-2 text-left">Image</th>
                <th className="px-4 py-2 text-left">Name</th>
                <th className="px-4 py-2 text-left">Price</th>
                <th className="px-4 py-2 text-left">Category</th>
                <th className="px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                
                <tr key={product.slug} className="border-t dark:border-gray-700">
                  <td className="px-4 py-3">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-14 h-14 object-cover rounded-md"
                    />
                  </td>
                  <td className="px-4 py-3 font-medium">{product.name}</td>
                  <td className="px-4 py-3">₹{product.price}</td>
                  <td className="px-4 py-3 capitalize">{product.category}</td>
                  <td className="px-4 py-3 flex gap-2">
                    <Link href={`/admin/products/${product.slug}/edit`}>
                      <Button variant="outline" size="sm">
                        <Pencil className="w-4 h-4" />
                      </Button>
                    </Link>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(product.slug)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </td>
                </tr>
              ))}

              {!loading && products.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center py-6 text-gray-500 dark:text-gray-400">
                    No products found.
                  </td>
                </tr>
              )}

              {loading && (
                <tr>
                  <td colSpan="5" className="text-center py-6 text-gray-500 dark:text-gray-400">
                    Loading products...
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;

