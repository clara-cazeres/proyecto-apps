import cors from 'cors';
import express from 'express';
import jwt from 'jsonwebtoken';

// middlewares generales
export const applyMiddlewares = (app) => {
    app.use(cors()); // Manejo de CORS
    app.use(express.json()); // Parseo de JSON
    app.use(mostrarDatosRequest); // Middleware para logging
  };

// middleware para mostrar datos de la request
export const mostrarDatosRequest = (req, res, next) => {
  console.log('METHOD:', req.method);
  console.log('URL:', req.url);
  console.log('BODY:', req.body);
  next(); // pasa al siguiente middleware
};

// middleware para manejar errores
export const manejarErrores = (error, req, res, next) => {
  console.error(error.stack);
  res.status(500).send(`Ha ocurrido un error: ${error.message}`);
};



export const verificarToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];

  // Verificar si el token está presente
  if (!authHeader) {
    return res.status(401).json({ mensaje: 'Acceso denegado. Token no proporcionado.' });
  }

  const token = authHeader.split(' ')[1]; // Obtener el token después de "Bearer"

  try {
    // Verificar el token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Agregar datos del usuario a la request
    next();
  } catch (error) {
    res.status(403).json({ mensaje: 'Token inválido o expirado.' });
  }
};



