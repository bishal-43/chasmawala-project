// src/app/admin/(protected)/products/page.js

'use client';

import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { PlusCircle, Trash2, Pencil, PackageOpen, LayoutGrid } from 'lucide-react';
import Link from 'next/link';
import axios from 'axios';
import toast from 'react-hot-toast';

import { ToggleSwitch } from '@/components/products/toggle';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [updating, setUpdating] = useState(null);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await axios.get('/api/admin/products');
      setProducts(res.data.products || []);
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
      fetchProducts();
    } catch (err) {
      toast.error('Error deleting product');
      console.error(err);
    }
  };

  const toggleTrending = async (slug, current) => {
    try {
      setUpdating(slug);
      await axios.put(`/api/admin/products/${slug}`, {
        isTrending: !current,
      });
      toast.success('Trending updated');
      fetchProducts();
    } catch (err) {
      toast.error('Failed to update trending');
    } finally {
      setUpdating(null);
    }
  };

  const toggleBestSeller = async (slug, current) => {
    try {
      setUpdating(slug + '_best');
      await axios.put(`/api/admin/products/${slug}`, {
        isBestSeller: !current,
      });
      toast.success('BestSeller updated');
      fetchProducts();
    } catch (err) {
      toast.error('Failed to update BestSeller');
    } finally {
      setUpdating(null);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      
      {/* Header section */}
      <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-extrabold text-zinc-900 tracking-tight dark:text-zinc-50">Product Management</h1>
          <p className="text-[14px] text-zinc-500 font-medium">
            Add, update, search, and manage products inside your catalog.
          </p>
        </div>
        <div className="mt-4 sm:mt-0 flex gap-2">
          <Link href="/admin/products/add">
            <Button className="flex gap-2 items-center bg-gradient-to-r from-amber-400 to-amber-600 hover:from-amber-500 hover:to-amber-700 text-zinc-955 text-zinc-950 hover:shadow-lg transition-all duration-200 font-bold rounded-xl h-10 border-0">
              <PlusCircle className="w-4 h-4 font-bold text-zinc-950" />
              Add Product
            </Button>
          </Link>
        </div>
      </div>

      {/* Main card */}
      <div className="bg-white dark:bg-gray-900 shadow-sm border border-zinc-100 dark:border-zinc-800 rounded-2xl overflow-hidden">
        <div className="px-6 py-5 bg-zinc-50/50 dark:bg-zinc-900/50 border-b border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-50">Catalog Inventory</h2>
            <p className="text-xs text-zinc-400 mt-1">Configure options, bestseller status, trending toggles, and metadata.</p>
          </div>
          <div className="flex items-center gap-1.5 text-xs font-semibold text-zinc-500 bg-white border border-zinc-200/50 rounded-lg px-2.5 py-1.5 dark:bg-zinc-900 dark:border-zinc-800">
            <LayoutGrid className="h-3.5 w-3.5 text-zinc-400" />
            <span>Total Items: <span className="font-bold text-zinc-900 dark:text-zinc-50">{products.length}</span></span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse">
            <thead className="bg-zinc-50/50 dark:bg-zinc-900/50 text-zinc-400 text-xs font-bold uppercase tracking-wider">
              <tr className="border-b border-zinc-100 dark:border-zinc-800">
                <th className="px-6 py-4 text-left">Image</th>
                <th className="px-6 py-4 text-left">Name</th>
                <th className="px-6 py-4 text-left">Price</th>
                <th className="px-6 py-4 text-left">Category</th>
                <th className="px-6 py-4 text-left">Best Seller</th>
                <th className="px-6 py-4 text-left">Trending</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
              {products.map((product) => (
                <tr key={product.slug} className="border-b border-zinc-100 hover:bg-zinc-50/30 transition dark:border-zinc-800">
                  <td className="px-6 py-4">
                    <div className="w-14 h-14 object-cover rounded-xl overflow-hidden shadow-inner border border-zinc-100 bg-zinc-50 flex items-center justify-center">
                      {product.image ? (
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <span className="text-[10px] text-zinc-400 font-bold">No Img</span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 font-bold text-zinc-900 dark:text-zinc-50 max-w-[200px] truncate">{product.name}</td>
                  <td className="px-6 py-4 font-bold text-zinc-900 dark:text-zinc-50">₹{Number(product.price).toFixed(2)}</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-bold bg-zinc-50 border border-zinc-200 text-zinc-650 uppercase tracking-wider dark:bg-zinc-800 dark:border-zinc-750 dark:text-zinc-300">
                      {product.category}
                    </span>
                  </td>
                  {/* Corrected swap: Best Seller Switch */}
                  <td className='px-6 py-4'>
                    <ToggleSwitch
                      value={product.isBestSeller}
                      loading={updating === product.slug + '_best'}
                      onChange={() => toggleBestSeller(product.slug, product.isBestSeller)}
                    />
                  </td>
                  {/* Corrected swap: Trending Switch */}
                  <td className='px-6 py-4'>
                    <ToggleSwitch
                      value={product.isTrending}
                      loading={updating === product.slug}
                      onChange={() => toggleTrending(product.slug, product.isTrending)}
                    />
                  </td>

                  <td className="px-6 py-4 text-right">
                    <div className="flex gap-2 justify-end">
                      <Link href={`/admin/products/${product.slug}/edit`}>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="h-9 w-9 p-0 rounded-xl hover:bg-zinc-50 hover:text-zinc-900 border-zinc-200"
                          title="Edit product"
                        >
                          <Pencil className="w-4 h-4 text-zinc-500" />
                        </Button>
                      </Link>
                      <Button
                        variant="destructive"
                        size="sm"
                        className="h-9 w-9 p-0 rounded-xl bg-rose-50 text-rose-600 hover:bg-rose-100 hover:text-rose-700 border-0"
                        onClick={() => handleDelete(product.slug)}
                        title="Delete product"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}

              {!loading && products.length === 0 && (
                <tr>
                  <td colSpan="7" className="text-center py-12 text-zinc-400">
                    <div className="flex flex-col items-center gap-2 justify-center">
                      <PackageOpen className="h-8 w-8 text-zinc-300" />
                      <span>No products found in catalog.</span>
                    </div>
                  </td>
                </tr>
              )}

              {loading && (
                <tr>
                  <td colSpan="7" className="text-center py-12 text-zinc-400">
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-4 h-4 rounded-full border-2 border-zinc-200 border-t-amber-500 animate-spin" />
                      <span>Loading products catalog...</span>
                    </div>
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

