"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoginView, setIsLoginView] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (isLoginView) {
      // Lógica de inicio de sesión
      try {
        const response = await fetch('/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
        });

        if (response.ok) {
          alert('¡Inicio de sesión exitoso!');
          router.push('/');
          router.refresh(); // Actualiza el layout para que el Header muestre "Cerrar Sesión"
        } else {
          const data = await response.json();
          alert(`Error al iniciar sesión: ${data.message}`);
        }
      } catch (error) {
        console.error('Error de conexión:', error);
        alert('No se pudo conectar con el servidor. Inténtalo de nuevo.');
      }
    } else {
      // Lógica de registro
      if (password !== confirmPassword) {
        alert('Las contraseñas no coinciden.');
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetch('/api/auth/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, email, password }),
        });

        const data = await response.json();

        if (response.ok) {
          alert('¡Registro exitoso! Ahora puedes iniciar sesión.');
          setIsLoginView(true);
          setPassword('');
          setConfirmPassword('');
        } else {
          alert(`Error en el registro: ${data.message}`);
        }
      } catch (error) {
        console.error('Error de conexión:', error);
        alert('No se pudo completar el registro. Inténtalo de nuevo.');
      }
    }

    setIsLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-zinc-900">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md dark:bg-black">
        <h1 className="text-3xl font-bold text-center text-gray-900 dark:text-white">
          {isLoginView ? 'Iniciar Sesión' : 'Crear Cuenta'}
        </h1>
        <form className="space-y-6" onSubmit={handleSubmit}>
          {!isLoginView && (
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Nombre Completo
              </label>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                required={!isLoginView}
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="block w-full px-3 py-2 mt-1 text-gray-900 bg-gray-50 border border-gray-300 rounded-md shadow-sm appearance-none placeholder-gray-400 focus:outline-none focus:ring-black focus:border-black dark:bg-zinc-800 dark:border-zinc-700 dark:text-white dark:focus:ring-white dark:focus:border-white sm:text-sm"
                placeholder="John Doe"
              />
            </div>
          )}
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
          {!isLoginView && (
            <div>
              <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Confirmar Contraseña
              </label>
              <input
                id="confirm-password"
                name="confirm-password"
                type="password"
                required={!isLoginView}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="block w-full px-3 py-2 mt-1 text-gray-900 bg-gray-50 border border-gray-300 rounded-md shadow-sm appearance-none placeholder-gray-400 focus:outline-none focus:ring-black focus:border-black dark:bg-zinc-800 dark:border-zinc-700 dark:text-white dark:focus:ring-white dark:focus:border-white sm:text-sm"
                placeholder="••••••••"
              />
            </div>
          )}
          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full px-4 py-2 text-sm font-medium text-white bg-black border border-transparent rounded-md shadow-sm hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black disabled:opacity-50 disabled:cursor-not-allowed dark:bg-white dark:text-black dark:hover:bg-zinc-200 dark:focus:ring-white"
            >
              {isLoading ? 'Procesando...' : (isLoginView ? 'Entrar' : 'Registrarse')}
            </button>
          </div>
        </form>
        <div className="text-sm text-center">
          <button
            onClick={() => setIsLoginView(!isLoginView)}
            className="font-medium text-black dark:text-white hover:underline"
          >
            {isLoginView ? '¿No tienes una cuenta? Regístrate' : '¿Ya tienes una cuenta? Inicia sesión'}
          </button>
        </div>
      </div>
    </div>
  );
}