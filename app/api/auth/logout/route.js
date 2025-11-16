import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST() {
  try {
    // Crear la respuesta y eliminar la cookie de sesión.
    const response = NextResponse.json({ message: 'Cierre de sesión exitoso.' });
    response.cookies.set('session', '', { expires: new Date(0), path: '/' });
    return response;
  } catch (error) {
    console.error('Error al cerrar sesión:', error);
    return NextResponse.json({ message: 'Error interno del servidor.' }, { status: 500 });
  }
}