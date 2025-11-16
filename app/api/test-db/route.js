import { NextResponse } from 'next/server';
import pool from '@/app/lib/db';

export async function GET() {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT NOW()');
    client.release();
    
    return NextResponse.json({ 
      message: "Conexión a la base de datos exitosa.",
      timestamp: result.rows[0].now 
    });

  } catch (error) {
    console.error('Error al conectar con la base de datos:', error);
    return NextResponse.json(
      { 
        message: 'Error al conectar con la base de datos.',
        error: error.message 
      }, 
      { status: 500 }
    );
  }
}