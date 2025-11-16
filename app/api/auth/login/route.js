import { NextResponse } from 'next/server';
import pool from '@/app/lib/db';
import bcrypt from 'bcrypt';
import { SignJWT } from 'jose';
import { cookies } from 'next/headers';

const getJwtSecret = () => {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error('JWT_SECRET no está definido en las variables de entorno.');
  }
  return new TextEncoder().encode(secret);
};

export async function POST(request) {
  let client;
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ message: 'Email y contraseña son requeridos.' }, { status: 400 });
    }

    client = await pool.connect();

    // 1. Buscar al usuario por email
    const userResult = await client.query('SELECT * FROM users WHERE email = $1', [email]);
    if (userResult.rowCount === 0) {
      return NextResponse.json({ message: 'Credenciales inválidas.' }, { status: 401 }); // Unauthorized
    }

    const user = userResult.rows[0];

    // 2. Comparar la contraseña proporcionada con el hash almacenado
    const isPasswordValid = await bcrypt.compare(password, user.password_hash);
    if (!isPasswordValid) {
      return NextResponse.json({ message: 'Credenciales inválidas.' }, { status: 401 });
    }

    // 3. Crear el token JWT
    const token = await new SignJWT({ userId: user.id, email: user.email, name: user.name })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('1d') // El token expira en 1 día
      .sign(getJwtSecret());

    // 4. Crear la respuesta y establecer el token en una cookie segura
    const response = NextResponse.json({ message: 'Inicio de sesión exitoso.' });
    response.cookies.set('session', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24, // 1 día en segundos
      path: '/',
    });

    return response;

  } catch (error) {
    console.error('Error en el inicio de sesión:', error);
    return NextResponse.json({ message: 'Error interno del servidor.' }, { status: 500 });
  } finally {
    if (client) client.release();
  }
}