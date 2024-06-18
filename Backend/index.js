const express = require('express');
const { Client } = require('pg');
const cors = require('cors'); // Importar CORS

const client = new Client({
  host: 'localhost',
  user: 'postgres',
  port: 5432,
  password: '5150',
  database: 'FullStock'
});

const app = express();
const PORT = process.env.PORT || 5150;

app.use(cors()); // Usar CORS para todas las rutas

// Opcional: Configurar CORS para un origen específico
// app.use(cors({
//   origin: 'http://localhost:5173',
//   methods: ['GET', 'POST']
// }));

app.use(express.json());

async function connectDB() {
  try {
    await client.connect();
    console.log('Conexión establecida con PostgreSQL');
  } catch (err) {
    console.error('Error conectando a la base de datos', err);
    throw err;
  }
}


app.put('/productoPut/:id', async (req, res) => {
  const { id } = req.params;
  const { nombre, precio, tipo, codigobarra } = req.body;

  try {
    await client.connect();

    const query = `
      UPDATE producto
      SET nombre = $1, precio = $2, tipo = $3, codigobarra = $4
      WHERE idproducto = $5;
    `;

    const values = [nombre, precio, tipo, codigobarra, id];
    const result = await client.query(query, values);

    res.json({ message: 'Producto actualizado correctamente' });
  } catch (err) {
    console.error('Error ejecutando la consulta', err);
    res.status(500).json({ error: 'Error ejecutando la consulta' });
  } finally {
    await client.end();
  }
});

app.get('/usuarios', async (req, res) => {
  try {
    const query = 'SELECT * FROM usuario';
    const result = await client.query(query);

    res.json(result.rows);
  } catch (err) {
    console.error('Error ejecutando la consulta', err);
    res.status(500).json({ error: 'Error ejecutando la consulta' });
  }
});

app.get('/pedido_proveedor', async (req, res) => {
  try {
    const query = 'SELECT * FROM proveedor JOIN pedido ON proveedor.idproveedor=pedido.idproveedor ';
    const result = await client.query(query);

    res.json(result.rows);
  } catch (err) {
    console.error('Error ejecutando la consulta', err);
    res.status(500).json({ error: 'Error ejecutando la consulta' });
  }
});



app.get('/producto', async (req, res) => {
  try {
    const query = 'SELECT * FROM producto';
    const result = await client.query(query);

    res.json(result.rows);
  } catch (err) {
    console.error('Error ejecutando la consulta', err);
    res.status(500).json({ error: 'Error ejecutando la consulta' });
  }
});

app.delete('/producto/:id', async (req, res) => {
  const productId = req.params.id; // Obtener el ID del producto desde los parámetros de la URL

  try {
    const query = 'DELETE FROM producto WHERE idproducto = $1';
    const result = await client.query(query, [productId]);

    res.json({ message: `Producto con ID ${productId} eliminado correctamente` });
  } catch (err) {
    console.error('Error ejecutando la consulta DELETE', err);
    res.status(500).json({ error: 'Error ejecutando la consulta DELETE' });
  }
});


app.get('/productoStock', async (req, res) => {
  try {
    const query = 'select * from producto join contenedor ON producto.idcontenedor = contenedor.idcontenedor';
    const result = await client.query(query);

    res.json(result.rows);
  } catch (err) {
    console.error('Error ejecutando la consulta', err);
    res.status(500).json({ error: 'Error ejecutando la consulta' });
  }
});

app.get('/proveedor', async (req, res) => {
  try {
    const query = 'SELECT * FROM proveedor';
    const result = await client.query(query);

    res.json(result.rows);
  } catch (err) {
    console.error('Error ejecutando la consulta', err);
    res.status(500).json({ error: 'Error ejecutando la consulta' });
  }
});

app.get('/contenedor', async (req, res) => {
  try {
    const query = 'SELECT * FROM contenedor';
    const result = await client.query(query);

    res.json(result.rows);
  } catch (err) {
    console.error('Error ejecutando la consulta', err);
    res.status(500).json({ error: 'Error ejecutando la consulta' });
  }
});



app.post('/insertarProducto', async (req, res) => {
  const {
    idproveedor,
    idcontenedor,
    nombre,
    precio,
    descripcion,
    tipo,
    codigobarra,
    marca,
    descuento
  } = req.body;

  try {
    const query = `
      INSERT INTO producto (
        idproveedor,
        idcontenedor,
        nombre,
        precio,
        descripcion,
        tipo,
        codigobarra,
        marca,
        descuento
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
    `;
    const values = [
      idproveedor,
      idcontenedor,
      nombre,
      precio,
      descripcion,
      tipo,
      codigobarra,
      marca,
      descuento
    ];

    await client.query(query, values);

    res.status(201).json({ message: 'Producto insertado correctamente' });
  } catch (err) {
    console.error('Error ejecutando la consulta de inserción', err);
    res.status(500).json({ error: 'Error ejecutando la consulta de inserción' });
  }
});


async function main() {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Servidor Express escuchando en el puerto ${PORT}`);
    });
  } catch (err) {
    console.error('Error en la función principal', err);
    process.exit(1);
  }
}

main();
