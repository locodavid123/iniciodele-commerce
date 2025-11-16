import { NextResponse } from 'next/server';
import pool from '@/app/lib/db';
import bcrypt from 'bcrypt';

export async function POST(request) {
  let client;
  try {
    const { name, email, password } = await request.json();

    // 1. Validar que los datos necesarios estén presentes
    if (!name || !email || !password) {
      return NextResponse.json({ message: 'Nombre, email y contraseña son requeridos.' }, { status: 400 });
    }

    client = await pool.connect();

    // 2. Verificar si el usuario ya existe
    const existingUser = await client.query('SELECT * FROM users WHERE email = $1', [email]);
    if (existingUser.rowCount > 0) {
      return NextResponse.json({ message: 'El correo electrónico ya está en uso.' }, { status: 409 }); // 409 Conflict
    }

    // 3. Hashear la contraseña
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    // 4. Insertar el nuevo usuario en la base de datos
    const newUserQuery = `
      INSERT INTO users (name, email, password_hash)
      VALUES ($1, $2, $3)
      RETURNING id, name, email, created_at;
    `;
    const newUser = await client.query(newUserQuery, [name, email, passwordHash]);

    return NextResponse.json(newUser.rows[0], { status: 201 }); // 201 Created

  } catch (error) {
    console.error('Error en el registro de usuario:', error);
    return NextResponse.json({ message: 'Error interno del servidor.' }, { status: 500 });
  } finally {
    if (client) {
      client.release();
    }
  }
}