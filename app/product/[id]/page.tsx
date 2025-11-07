// Este es un Componente de Servidor por defecto.
// No necesita la directiva "use client".

import { products } from '@/app/data';
import { notFound } from 'next/navigation';
import ProductDetailClient from './product-detail';

/**
 * Esta página es un Componente de Servidor.
 * Su responsabilidad es obtener los datos (data fetching) de forma asíncrona
 * y luego pasar esos datos a un Componente de Cliente para su renderizado.
 */
export default async function ProductDetailPage({ params }: { params: { id: string } }) {
  // El error indica que `params` se está tratando como una Promesa.
  // Aunque es inusual para un Server Component, seguiremos la sugerencia del error
  // y usaremos `await` para resolverlo antes de acceder a sus propiedades.
  const resolvedParams = await params;
  const productId = parseInt(resolvedParams.id, 10);
  const product = products.find((p) => p.id === productId);

  if (!product) {
    notFound();
  }
  
  const relatedProducts = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);
  
  // Pasamos los datos al componente de cliente para que los renderice.
  return <ProductDetailClient product={product} relatedProducts={relatedProducts} />;
}