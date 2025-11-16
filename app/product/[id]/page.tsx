// Este es un Componente de Servidor por defecto.
// No necesita la directiva "use client".

import { notFound } from 'next/navigation';
import { Product } from '@/app/lib/definitions';
import { fetchProductById, fetchRelatedProducts } from '@/app/lib/data';
import ProductDetailClient from './product-detail';

/**
 * Esta página es un Componente de Servidor.
 * Su responsabilidad es obtener los datos (data fetching) de forma asíncrona
 * y luego pasar esos datos a un Componente de Cliente para su renderizado.
 */
export default async function ProductDetailPage({ params }: { params: { id: string } }) {
  // En las versiones recientes de Next.js, params puede ser una Promesa.
  const resolvedParams = await params;
  const productId = parseInt(resolvedParams.id, 10);

  // 1. Validar que el ID sea un número válido.
  if (isNaN(productId)) {
    notFound();
  }

  // 2. Obtenemos el producto principal y los relacionados en paralelo para optimizar la carga.
  const [product, relatedProducts]: [Product | undefined, Product[]] = await Promise.all([
    fetchProductById(productId),
    // Para los productos relacionados, necesitamos la categoría del producto principal.
    // Creamos una cadena de promesas para obtenerla.
    fetchProductById(productId).then(p => {
      if (!p) return []; // Si no hay producto, no hay relacionados.
      return fetchRelatedProducts(p.category, p.id);
    })
  ]);

  if (!product) {
    notFound();
  }

  // 4. Pasamos los datos al componente de cliente para que los renderice.
  return <ProductDetailClient product={product} relatedProducts={relatedProducts} />;
}