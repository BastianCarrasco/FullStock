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

// connectDB();

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

app.delete('/eliminarUsuario/:idUsuario', async (req, res) => {
  const { idUsuario } = req.params;

  try {
    const result = await client.query(
      'SELECT eliminarUsuario($1)',
      [idUsuario]
    );

    res.status(200).json({ success: true, message: 'Usuario eliminado correctamente' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Error al eliminar usuario' });
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


app.post('/insertarUsuario', async (req, res) => {
  const { nombre, apellido, email, password } = req.body;

  try {
    const result = await client.query(
      'SELECT insertarUsuario($1, $2, $3, $4)',
      [nombre, apellido, email, password]
    );

    res.status(200).json({ success: true, message: 'Usuario insertado correctamente' });
  } catch (err) {
    console.error('Error al insertar usuario:', err);
    res.status(500).json({ success: false, message: 'Error al insertar usuario', error: err.message });
  }
});

app.post('/insertarProv', async (req, res) => {
  const { nombre, infocontacto } = req.body;

  try {
    // Insertar el proveedor
    const result = await client.query(
      'select insertarProveedorYPedido($1,$2,49,0,NULL,NULL)',
      [nombre, infocontacto]
    );

    res.status(200).json({ success: true, message: 'Proveedor insertado correctamente'});
  } catch (err) {
    console.error('Error al insertar proveedor:', err);
    res.status(500).json({ success: false, message: 'Error al insertar proveedor', error: err.message });
  }
});

// Endpoint para eliminar un proveedor por su ID
app.delete('/eliminarProv/:id', async (req, res) => {
  const idProveedor = req.params.id;

  try {
    // Eliminar el proveedor por su ID
    await client.query(
      'SELECT eliminarProveedorYPedidos($1)',
      [idProveedor]
    );

    res.status(200).json({ success: true, message: `Proveedor con ID ${idProveedor} eliminado correctamente` });
  } catch (err) {
    console.error('Error al eliminar proveedor:', err);
    res.status(500).json({ success: false, message: 'Error al eliminar proveedor', error: err.message });
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
