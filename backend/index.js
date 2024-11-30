import express from 'express';
import { conectarDB } from './database/connection.js';
import { applyMiddlewares, manejarErrores } from './middlewares/middlewares.js';
import usuarioRoutes from './routes/usuarioRoutes.js';
import dotenv from 'dotenv';


const app = express();
const port = process.env.PORT || 3001;

dotenv.config();

// aplicar middlewares generales
applyMiddlewares(app);


// ruta raiz
app.get('/', (req, res) => {
  res.status(200).send('Bienvenido al backend de la app de clases de vela.');
});


//rutas
app.use('/usuarios', usuarioRoutes);

// Middleware para manejar errores
app.use(manejarErrores);

// Iniciar el servidor
const iniciarServidor = async () => {
  try {
    await conectarDB();
    app.listen(port, () => {
      console.log(`Servidor corriendo en http://192.168.1.10:${port}`);
    });
  } catch (error) {
    console.error('Error al iniciar el servidor:', error.message);
  }
};

iniciarServidor();
