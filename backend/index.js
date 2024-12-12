import express from 'express';
import cors from 'cors';


import { conectarDB } from './database/connection.js';
import { applyMiddlewares, manejarErrores } from './middlewares/middlewares.js';
import usuarioRoutes from './routes/usuarioRoutes.js';
import moduleRoutes from './routes/moduleRoutes.js';
import cuestionarioRoutes from './routes/cuestionarioRoutes.js'
import preguntasRoutes from './routes/preguntasRoutes.js';
import dotenv from 'dotenv';


const app = express();
const port = process.env.PORT || 3001;

dotenv.config();

app.use(
  cors({
    origin: '*', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true, 
  })
);

// aplicar middlewares generales
applyMiddlewares(app);


// ruta raiz
app.get('/', (req, res) => {
  res.status(200).send('Bienvenido al backend de la app de clases de vela.');
});

app.use((req, res, next) => {
  console.log(`Método: ${req.method}, URL: ${req.url}`);
  next();
});


//rutas
app.use('/usuarios', usuarioRoutes);

app.use('/modules', moduleRoutes);

app.use('/cuestionarios', cuestionarioRoutes);

app.use('/preguntas', preguntasRoutes);

// Middleware para manejar errores
app.use(manejarErrores);

// Iniciar el servidor
const iniciarServidor = async () => {
  try {
    await conectarDB();
    app.listen(port, () => {
      //console.log(`Servidor corriendo en http://localhost:${port}`)
      console.log(`Servidor corriendo en https://proyecto-apps.onrender.com/`);
    });
  } catch (error) {
    console.error('Error al iniciar el servidor:', error.message);
  }
};

iniciarServidor();
