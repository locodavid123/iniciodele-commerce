import pool from './db';

export async function fetchProducts(category) {
  let client;
  try {
    client = await pool.connect();
    
    let query = 'SELECT * FROM products';
    const values = [];

    if (category && category !== 'Todos') {
      query += ' WHERE category = $1';
      values.push(category);
    }

    query += ' ORDER BY id ASC;';

    const result = await client.query(query, values);
    return result.rows;
  } catch (error) {
    console.error('Error al obtener los productos de la base de datos:', error);
    // En un caso real, podrías querer manejar este error de forma más elegante
    // o lanzar el error para que el componente que llama lo maneje.
    throw new Error('No se pudieron obtener los productos.');
  } finally {
    if (client) {
      client.release(); // Siempre libera el cliente de vuelta al pool
    }
  }
}

export async function fetchProductById(id) {
  let client;
  try {
    client = await pool.connect();
    const query = 'SELECT * FROM products WHERE id = $1;';
    const result = await client.query(query, [id]);
    return result.rows[0]; // Devuelve el producto o undefined si no se encuentra
  } catch (error) {
    console.error(`Error al obtener el producto con id ${id}:`, error);
    throw new Error('No se pudo obtener el producto.');
  } finally {
    if (client) {
      client.release();
    }
  }
}

export async function fetchRelatedProducts(category, currentProductId) {
  let client;
  try {
    client = await pool.connect();
    const query = 'SELECT * FROM products WHERE category = $1 AND id != $2 LIMIT 4;';
    const result = await client.query(query, [category, currentProductId]);
    return result.rows;
  } catch (error) {
    console.error(`Error al obtener productos relacionados para la categoría ${category}:`, error);
    throw new Error('No se pudieron obtener los productos relacionados.');
  } finally {
    if (client) client.release();
  }
}

export async function fetchCategories() {
  let client;
  try {
    client = await pool.connect();
    const result = await client.query('SELECT DISTINCT category FROM products ORDER BY category ASC;');
    // Mapeamos para obtener un array de strings y añadimos "Todos" al principio
    const categories = result.rows.map(row => row.category);
    return ['Todos', ...categories];
  } catch (error) {
    console.error('Error al obtener las categorías:', error);
    throw new Error('No se pudieron obtener las categorías.');
  } finally {
    if (client) client.release();
  }
}