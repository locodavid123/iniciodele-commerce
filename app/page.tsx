import Image from "next/image";
import Link from "next/link";
import { fetchProducts, fetchCategories } from "./lib/data";
import { Product } from "./lib/definitions";
import CategoryFilter from "./category-filter";

export default async function Home({ searchParams }: { searchParams?: { category?: string } }) {
  // En las versiones recientes de Next.js, searchParams puede ser una Promesa.
  // La desestructuramos y usamos await para obtener el valor resuelto.
  const resolvedSearchParams = await searchParams;
  const selectedCategory = resolvedSearchParams?.category || 'Todos';

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(price);
  };

  // Obtenemos los datos en paralelo para optimizar la carga
  const [filteredProducts, categories]: [Product[], string[]] = await Promise.all([
    fetchProducts(selectedCategory),
    fetchCategories()
  ]);

  return (
    <div className="min-h-screen bg-zinc-50 font-sans dark:bg-black">
      <main className="container mx-auto px-4 py-8">
        {/* Categories Section */}
        <CategoryFilter categories={categories} />

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="group flex flex-col overflow-hidden rounded-xl border border-zinc-200 bg-white transition-shadow hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-900"
              >
                <Link href={`/product/${product.id}`} className="cursor-pointer">
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
                </Link>
                <div className="flex flex-col gap-2 p-4">
                  <Link href={`/product/${product.id}`}>
                    <h3 className="text-lg font-medium text-black dark:text-white hover:underline">
                      {product.name}
                    </h3>
                  </Link>
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
        ) : (
          <div className="text-center py-12">
            <h2 className="text-2xl font-semibold">No se encontraron productos</h2>
            <p className="text-zinc-600 dark:text-zinc-400 mt-2">Intenta seleccionar otra categoría.</p>
          </div>
        )}
      </main>
    </div>
  );
}
    
