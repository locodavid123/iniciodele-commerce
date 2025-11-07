"use client";

import Image from 'next/image';
import { notFound } from 'next/navigation';

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
  }).format(price);
};

// Definimos los tipos para los props para mayor claridad y seguridad.
type Product = {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
  description?: string;
};

interface ProductDetailClientProps {
  product: Product | undefined;
  relatedProducts: Product[];
}

export default function ProductDetailClient({ product, relatedProducts }: ProductDetailClientProps) {
  if (!product) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-zinc-50 font-sans dark:bg-black text-black dark:text-white">
      <main className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div className="aspect-square relative rounded-xl overflow-hidden">
            <Image src={product.image} alt={product.name} fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
          </div>

          <div className="flex flex-col gap-6">
            <div>
              <h1 className="text-4xl font-bold tracking-tight">{product.name}</h1>
              <p className="text-zinc-500 dark:text-zinc-400 mt-2">{product.category}</p>
            </div>
            <p className="text-3xl font-semibold">{formatPrice(product.price)}</p>
            <div className="text-green-600 dark:text-green-400 font-medium">Disponible</div>
            <div>
              <h2 className="text-xl font-semibold mb-2">Descripción</h2>
              <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">{product.description}</p>
            </div>
            <button onClick={() => alert(`'${product.name}' ha sido añadido al carrito.`)} className="w-full rounded-lg bg-black px-6 py-4 text-lg font-medium text-white transition-colors hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200">
              Añadir al Carrito
            </button>
          </div>
        </div>

        {relatedProducts.length > 0 && (
          <div className="mt-24">
            <h2 className="text-3xl font-bold mb-8">Productos Relacionados</h2>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {relatedProducts.map((relatedProduct) => (
                <div key={relatedProduct.id} className="group flex flex-col overflow-hidden rounded-xl border border-zinc-200 bg-white transition-shadow hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-900">
                  <div className="relative aspect-square overflow-hidden bg-zinc-100 dark:bg-zinc-800">
                    <Image src={relatedProduct.image} alt={relatedProduct.name} fill className="object-cover transition-transform group-hover:scale-105" />
                  </div>
                  <div className="flex flex-col gap-2 p-4">
                    <h3 className="text-lg font-medium text-black dark:text-white">{relatedProduct.name}</h3>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">{relatedProduct.category}</p>
                    <p className="text-lg font-semibold text-black dark:text-white">{formatPrice(relatedProduct.price)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}