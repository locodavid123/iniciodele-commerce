import Link from 'next/link';
import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';
import LogoutButton from './LogoutButton';

const getJwtSecret = () => {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error('JWT_SECRET no está definido.');
  }
  return new TextEncoder().encode(secret);
};

async function getUser() {
  const sessionCookie = cookies().get('session');
  if (!sessionCookie) return null;

  try {
    const { payload } = await jwtVerify(sessionCookie.value, getJwtSecret());
    return payload;
  } catch (error) {
    console.error('Fallo al verificar el token:', error);
    return null;
  }
}

export default async function Header() {
  const user = await getUser();

  return (
    <header className="bg-white dark:bg-black shadow-md">
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-black dark:text-white">
          MiTienda
        </Link>
        <div className="flex items-center gap-4">
          {user ? (
            <>
              <span className="text-gray-700 dark:text-gray-300">Hola, {user.name}</span>
              <LogoutButton />
            </>
          ) : (
            <Link href="/login" className="px-4 py-2 text-sm font-medium text-white bg-black rounded-md hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200">
              Iniciar Sesión
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}