// app/lib/db.js
import { Pool } from 'pg';

let pool;
 
// Esta lógica previene que se creen múltiples pools de conexiones en el entorno de desarrollo
// debido al Hot Module Replacement de Next.js.
if (process.env.NODE_ENV === 'production') {
  pool = new Pool({
    connectionString: process.env.POSTGRES_URL,
    ssl: {
      rejectUnauthorized: false, // Generalmente necesario para conexiones a DBs en la nube.
    },
  });
} else {
  // En desarrollo, usamos un objeto global para preservar el pool entre recargas de módulos.
  if (!global._pgPool) {
    global._pgPool = new Pool({
      connectionString: process.env.POSTGRES_URL,
      ssl: process.env.POSTGRES_URL?.includes('localhost') ? false : { rejectUnauthorized: false },
    });
  }
  pool = global._pgPool;
}

export default pool;
