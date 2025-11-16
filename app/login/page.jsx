"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí iría la lógica de autenticación real (llamada a una API, etc.)
    console.log('Iniciando sesión con:', { email, password });

    // Simulación de inicio de sesión exitoso:
    // En una aplicación real, después de una autenticación exitosa,
    // probablemente guardarías un token y actualizarías un estado global.
    if (email && password) {
      alert('¡Inicio de sesión exitoso! Redirigiendo...');
      // Para este ejemplo, simplemente redirigimos a la página de inicio.
      router.push('/');
    } else {
      alert('Por favor, introduce tu correo y contraseña.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-zinc-900">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md dark:bg-black">
        <h1 className="text-3xl font-bold text-center text-gray-900 dark:text-white">
          Iniciar Sesión
        </h1>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Correo Electrónico
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="block w-full px-3 py-2 mt-1 text-gray-900 bg-gray-50 border border-gray-300 rounded-md shadow-sm appearance-none placeholder-gray-400 focus:outline-none focus:ring-black focus:border-black dark:bg-zinc-800 dark:border-zinc-700 dark:text-white dark:focus:ring-white dark:focus:border-white sm:text-sm"
              placeholder="tu@correo.com"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Contraseña
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="block w-full px-3 py-2 mt-1 text-gray-900 bg-gray-50 border border-gray-300 rounded-md shadow-sm appearance-none placeholder-gray-400 focus:outline-none focus:ring-black focus:border-black dark:bg-zinc-800 dark:border-zinc-700 dark:text-white dark:focus:ring-white dark:focus:border-white sm:text-sm"
              placeholder="••••••••"
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full px-4 py-2 text-sm font-medium text-white bg-black border border-transparent rounded-md shadow-sm hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black dark:bg-white dark:text-black dark:hover:bg-zinc-200 dark:focus:ring-white"
            >
              Entrar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}