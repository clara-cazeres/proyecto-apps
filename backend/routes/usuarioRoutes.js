import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Usuario from '../models/Usuario.js';
import mongoose from 'mongoose';

import { verificarToken } from '../middlewares/middlewares.js';
import procesarCuestionario from '../services/procesarCuestionario.js';


const router = express.Router();

// Obtener usuarios
router.get('/', async (req, res) => {
  try {
    const usuarios = await Usuario.find(); // Obtiene todos los usuarios
    res.status(200).json(usuarios); // Devuelve los usuarios como JSON
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener los usuarios', error: error.message });
  }
});

// Registro de usuario
// con lógica de procesamiento del cuestionario inicial

router.post('/registro', async (req, res, next) => {
  try {
    const { username, email, password, name = '', birthDate } = req.body;

    // Verificar si ya existe un usuario
    const usuarioExistente = await Usuario.findOne({ $or: [{ username }, { email }] });
    if (usuarioExistente) {
      return res.status(400).json({ mensaje: 'El usuario o el correo ya están registrados' });
    }

    // Hashear contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear usuario
    const nuevoUsuario = new Usuario({
      name,
      username,
      email,
      password: hashedPassword,
      birthDate,
      gender: '',
      city: '',
      country: '',
      height: 0,
      weight: 0,
      vo2max: 0,
      boatType: '',
      boatName: '',
      aboutMe: '',
      courseLevel: '',
      completedClasses: [],
    });

    await nuevoUsuario.save();

    // Generar token
    const token = jwt.sign(
      { id: nuevoUsuario._id, username: nuevoUsuario.username },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(201).json({
      _id: nuevoUsuario._id,
      mensaje: 'Usuario registrado exitosamente',
      usuario: nuevoUsuario,
      token,
    });
  } catch (error) {
    next(error);
  }
});




// Login de usuario
router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Buscar al usuario por email
    const usuario = await Usuario.findOne({ email });
    if (!usuario) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }

    // Verificar la contraseña
    const esValida = await bcrypt.compare(password, usuario.password);
    if (!esValida) {
      return res.status(401).json({ mensaje: 'Credenciales incorrectas' });
    }

    // Generar el token JWT
    const token = jwt.sign(
      { id: usuario._id, username: usuario.username },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(200).json({
      mensaje: 'Inicio de sesión exitoso',
      token,
      user: {
        id: usuario._id,
        name: usuario.name,
        email: usuario.email,
        birthDate: usuario.birthDate,
        city: usuario.city,
        country: usuario.country,
        boatType: usuario.boatType,
        // Agrega más campos según sea necesario
      },
    });
  } catch (error) {
    next(error);
  }
});

// Obtener perfil de un usuario por ID

router.get('/:id', verificarToken, async (req, res) => {
  const { id } = req.user; // Utiliza el ID del usuario decodificado del token
  console.log('Usuario autenticado con ID:', id);

  // Verifica si el ID es un ObjectId válido
  if (!mongoose.Types.ObjectId.isValid(id)) {
    console.log('ID inválido:', id);
    return res.status(400).json({ mensaje: 'ID inválido' });
  }

  try {
    console.log('Ruta /usuarios/:id llamada con ID:', id);
    const usuario = await Usuario.findById(id).select('-password');
    if (!usuario) {
      console.log('Usuario no encontrado para ID:', id);
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }
    res.status(200).json(usuario);
  } catch (error) {
    console.error('Error al obtener el perfil:', error.message);
    res.status(500).json({ mensaje: 'Error al obtener el perfil del usuario', error: error.message });
  }
});


export default router;
