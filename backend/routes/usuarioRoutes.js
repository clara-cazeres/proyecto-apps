import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Usuario from '../models/Usuario.js';

const router = express.Router();


//get usuarios 

router.get('/', async (req, res) => {
  try {
    const usuarios = await Usuario.find(); // Obtiene todos los usuarios
    res.status(200).json(usuarios); // Devuelve los usuarios como JSON
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener los usuarios', error: error.message });
  }
});


// Registro de usuario
// Registro de usuario
router.post('/registro', async (req, res, next) => {
  try {
    const { username, email, password, name = '', birthDate } = req.body;

    // Verificar si el usuario o email ya existen
    const usuarioExistente = await Usuario.findOne({ $or: [{ username }, { email }] });
    if (usuarioExistente) {
      return res.status(400).json({ mensaje: 'El usuario o el correo ya están registrados' });
    }

    // Hashear la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear el nuevo usuario con todos los campos inicializados
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
    res.status(201).json({ mensaje: 'Usuario registrado exitosamente', usuario: nuevoUsuario });
  } catch (error) {
    next(error); // Pasar el error al middleware de manejo de errores
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
      { id: usuario._id, username: usuario.username }, // Información dentro del token
      process.env.JWT_SECRET, // Clave secreta
      { expiresIn: '1h' } // Tiempo de expiración
    );

    // Login exitoso
    res.status(200).json({
      mensaje: 'Inicio de sesión exitoso',
      token,
    });
  } catch (error) {
    next(error); // Pasar el error al middleware de manejo de errores
  }
});


import { verificarToken } from '../middlewares/middlewares.js';

// Ruta protegida para obtener el perfil del usuario
router.get('/perfil', verificarToken, async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.user.id).select('-password'); // Excluir contraseña
    if (!usuario) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }
    res.status(200).json(usuario);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener el perfil del usuario' });
  }
});


export default router;
