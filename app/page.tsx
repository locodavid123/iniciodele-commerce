
"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { categories, products } from "./data";

export default function Home() {
  
  const [selectedCategory, setSelectedCategory] = useState('Todos');

  const filteredProducts =
    selectedCategory === 'Todos'
      ? products
      : products.filter((product) => product.category === selectedCategory);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(price);
  };

  return (
    <div className="min-h-screen bg-zinc-50 font-sans dark:bg-black">
      <main className="container mx-auto px-4 py-8">
        {/* Categories Section */}
        <nav className="mb-12">
          <ul className="flex justify-center gap-8 text-lg font-medium">
            {categories.map((category) => (
              <li key={category}>
                <button
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    selectedCategory === category
                      ? 'bg-black text-white dark:bg-white dark:text-black'
                      : 'hover:bg-black/10 dark:hover:bg-white/10'
                  }`}
                >
                  {category}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Products Grid */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="group flex flex-col overflow-hidden rounded-xl border border-zinc-200 bg-white transition-shadow hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-900"
            >
              <div className="relative aspect-square overflow-hidden bg-zinc-100 dark:bg-zinc-800">
                <div className="relative h-full w-full">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2 p-4">
                <h3 className="text-lg font-medium text-black dark:text-white">
                  {product.name}
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  {product.category}
                </p>
                <p className="text-lg font-semibold text-black dark:text-white">
                  {formatPrice(product.price)}
                </p>
                <button className="mt-2 rounded-lg bg-black px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200">
                  Añadir al Carrito
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
    
