const express = require('express');
const { Client } = require('pg');

// Configuración del cliente PostgreSQL
const client = new Client({
  host: 'localhost',
  user: 'postgres',
  port: 5432,
  password: '5150',
  database: 'FullStock'
});

// Crear la instancia de Express
const app = express();
const PORT = process.env.PORT || 5150;

// Middleware para parsear JSON en las peticiones
app.use(express.json());

// Función para conectar a la base de datos
async function connectDB() {
  try {
    await client.connect(); // Conexión a la base de datos
    console.log('Conexión establecida con PostgreSQL');
  } catch (err) {
    console.error('Error conectando a la base de datos', err);
  }
}

// Endpoint para obtener usuarios
app.get('/usuarios', async (req, res) => {
  try {
    const query = 'SELECT * FROM usuario';
    const result = await client.query(query);

    res.json(result.rows); // Enviar los datos como respuesta JSON
  } catch (err) {
    console.error('Error ejecutando la consulta', err);
    res.status(500).json({ error: 'Error ejecutando la consulta' });
  }
});

// Función principal para ejecutar las operaciones
async function main() {
  await connectDB(); // Conectar a la base de datos
  app.listen(PORT, () => {
    console.log(`Servidor Express escuchando en el puerto ${PORT}`);
  });
}

// Ejecutar la función principal
main().catch(err => console.error('Error en la función principal', err));
