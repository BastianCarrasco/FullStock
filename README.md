# FullStock

Para activar la aplicación FullStock en su PC, por favor siga los siguientes pasos.

## Descarga de la Aplicación

1. **Descargue el archivo FullStock del GitHub.**

## Creación de la Base de Datos

1. Encienda su servidor Postgres/PgAdmin4.
2. Cree una base de datos llamada `FullStock`.
3. Haga clic derecho en la base de datos `FullStock` y elija **RESTORE**.
4. En **filename**, ubique la carpeta llamada `BD` y el archivo `FullStockBD.sql`.
5. En **rolename** elija `postgres`.
6. Para finalizar, haga clic en **restore**.

## Preparación de la Aplicación

1. Abra FullStock con Visual Studio Code.
2. Una vez abierto, abra la carpeta `Backend`.
3. En el archivo de conexión con el cliente, cambie la contraseña por su clave personal de PostgreSQL:
  
   js
   const client = new Client({
     host: 'localhost',
     user: 'postgres',
     port: 5432,
     password: 'tu_clave_personal', // Cambiar clave a su clave personal
     database: 'FullStock'
   });

4. Abra la terminal en la carpeta Backend y ejecute: node index.js

Debería aparecer el mensaje:

Conexión establecida con PostgreSQL
Servidor Express escuchando en el puerto 5150

5. Luego, abra otra terminal en la carpeta frontend y ejecute: npm run dev

VITE v5.3.1  ready in 8172 ms
➜  Local:   http://localhost:5173/
➜  Network: use --host to expose
➜  press h + enter to show help

##  Activación de la Aplicación
Abra su navegador de preferencia y vaya a http://localhost:5173/ para activar la aplicación.
     






 
