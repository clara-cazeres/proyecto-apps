import cors from 'cors';
import express from 'express';
import jwt from 'jsonwebtoken';

// middlewares generales
export const applyMiddlewares = (app) => {
    app.use(cors()); 
    app.use(express.json()); 
    app.use(mostrarDatosRequest); 
  };

// middleware para mostrar datos de la request
export const mostrarDatosRequest = (req, res, next) => {
  console.log('METHOD:', req.method);
  console.log('URL:', req.url);
  console.log('BODY:', req.body);
  next(); 
};

// middleware para manejar errores
export const manejarErrores = (error, req, res, next) => {
  console.error('Error no manejado:', error.stack || error.message);
  res.status(500).json({ mensaje: 'Error interno del servidor', error: error.message });
};



export const verificarToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  console.log(`Token recibido en el encabezado: ${authHeader}`);

  if (!authHeader) {
    console.log('Token no proporcionado');
    return res.status(401).json({ mensaje: 'Acceso denegado. Token no proporcionado.' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Token decodificado exitosamente:', decoded);
    req.user = decoded; 
    next();
  } catch (error) {
    console.log('Error al verificar el token:', error.message);
    return res.status(403).json({ mensaje: 'Token inválido o expirado.' });
  }
};







