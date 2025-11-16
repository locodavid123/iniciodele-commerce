"use client";

import { useRouter } from 'next/navigation';

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/');
    router.refresh();
  };

  return (
    <button
      onClick={handleLogout}
      className="px-4 py-2 text-sm font-medium text-black bg-gray-200 rounded-md hover:bg-gray-300 dark:text-white dark:bg-zinc-700 dark:hover:bg-zinc-600"
    >
      Cerrar Sesión
    </button>
  );
}