import express from 'express';
import { conectarDB } from './database/connection.js';
import { applyMiddlewares, manejarErrores } from './middlewares/middlewares.js';
import usuarioRoutes from './routes/usuarioRoutes.js';

const app = express();
const port = process.env.PORT || 3001;

// aplicar middlewares generales
applyMiddlewares(app);

// rutas
app.use('/usuarios', usuarioRoutes);

// Middleware para manejar errores
app.use(manejarErrores);

// Iniciar el servidor
const iniciarServidor = async () => {
  try {
    await conectarDB();
    app.listen(port, () => {
      console.log(`Servidor corriendo en http://localhost:${port}`);
    });
  } catch (error) {
    console.error('Error al iniciar el servidor:', error.message);
  }
};

iniciarServidor();
