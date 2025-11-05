"use client";

import { useState } from 'react';
import Link from 'next/link';

// Componente para un ícono SVG genérico
const Icon = ({ path, className = "w-6 h-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d={path} />
  </svg>
);

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);


  return (
    <header className="bg-white dark:bg-black shadow-md text-black dark:text-white sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="text-2xl font-bold">
          <img src="https://placehold.co/40x40/000000/FFFFFF/png?text=E" alt="Logo de ecomerce" className="h-8 w-8 inline-block mr-2 rounded-full" />
          <Link href="/" className="hover:text-zinc-700 dark:hover:text-zinc-300 transition-colors">
            ecomerce
          </Link>
        </div>

        {/* Iconos y Búsqueda */}
        <div className="flex items-center gap-4">
          <div className="hidden sm:block">
            <div className="relative">
              <input
                type="text"
                placeholder="Buscar productos..."
                className="bg-zinc-100 dark:bg-zinc-800 rounded-full py-2 pl-10 pr-4 w-full focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
              />
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500">
                <Icon path="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </div>
            </div>
          </div>

          {/* Botón de Usuario */}
          <button aria-label="Perfil de usuario" className="hidden md:block">
            <Icon path="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
          </button>

          {/* Botón del Carrito */}
          <Link href="/carrito" className="relative" aria-label="Carrito de compras">
            <Icon path="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c.51 0 .962-.328 1.125-.821l2.853-5.625A1.5 1.5 0 0018 5.25H5.25L4.26 3M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
            <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-xs text-white">
              0
            </span>
          </Link>

          {/* Botón de Menú Móvil */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Abrir menú"
          >
            <Icon path="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </button>
        </div>
      </div>

      {/* Menú desplegable para Móvil */}
      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-black">
          <nav className="flex flex-col items-center gap-4 py-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="font-medium hover:text-zinc-700 dark:hover:text-zinc-300 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <button aria-label="Perfil de usuario" className="md:hidden">
              <Icon path="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}