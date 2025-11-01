export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
}

export const categories: string[] = ['Todos', 'Hombres', 'Mujeres', 'Niños', 'Accesorios'];

export const products: Product[] = [
  { id: 1, name: 'Camiseta Básica', category: 'Hombres', price: 120000, image: 'https://images.pexels.com/photos/428340/pexels-photo-428340.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { id: 2, name: 'Vestido de Verano', category: 'Mujeres', price: 200000, image: 'https://images.pexels.com/photos/1755428/pexels-photo-1755428.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { id: 3, name: 'Jeans para Niños', category: 'Niños', price: 140000, image: 'https://images.pexels.com/photos/1619801/pexels-photo-1619801.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { id: 4, name: 'Cinturón de Cuero', category: 'Accesorios', price: 100000, image: 'https://images.pexels.com/photos/1460838/pexels-photo-1460838.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { id: 5, name: 'Camisa Casual', category: 'Hombres', price: 160000, image: 'https://images.pexels.com/photos/3768005/pexels-photo-3768005.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { id: 6, name: 'Vestido de Noche', category: 'Mujeres', price: 360000, image: 'https://images.pexels.com/photos/1055691/pexels-photo-1055691.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { id: 7, name: 'Camiseta para Niños', category: 'Niños', price: 80000, image: 'https://images.pexels.com/photos/1094084/pexels-photo-1094084.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { id: 8, name: 'Gafas de Sol', category: 'Accesorios', price: 240000, image: 'https://images.pexels.com/photos/2846814/pexels-photo-2846814.jpeg?auto=compress&cs=tinysrgb&w=400' },
];