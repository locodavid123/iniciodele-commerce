"use client";

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export default function CategoryFilter({ categories }: { categories: string[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const selectedCategory = searchParams.get('category') || 'Todos';

  const handleCategoryClick = (category: string) => {
    const params = new URLSearchParams(searchParams);
    if (category === 'Todos') {
      params.delete('category');
    } else {
      params.set('category', category);
    }
    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <nav className="mb-12">
      <ul className="flex flex-wrap justify-center gap-4 text-lg font-medium md:gap-8">
        {categories.map((category) => (
          <li key={category}>
            <button onClick={() => handleCategoryClick(category)} className={`px-4 py-2 rounded-lg transition-colors ${selectedCategory === category ? 'bg-black text-white dark:bg-white dark:text-black' : 'hover:bg-black/10 dark:hover:bg-white/10'}`}>
              {category}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}