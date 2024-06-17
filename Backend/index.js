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
