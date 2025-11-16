import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST() {
  try {
    // Eliminar la cookie de sesión estableciendo su fecha de expiración en el pasado.
    cookies().set('session', '', { expires: new Date(0), path: '/' });
    return NextResponse.json({ message: 'Cierre de sesión exitoso.' });
  } catch (error) {
    console.error('Error al cerrar sesión:', error);
    return NextResponse.json({ message: 'Error interno del servidor.' }, { status: 500 });
  }
}