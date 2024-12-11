import express from 'express';
import Cuestionario from '../models/Cuestionario.js';
import procesarCuestionario from '../services/procesarCuestionario.js';


const router = express.Router();

// Crear un nuevo cuestionario
router.post('/', async (req, res) => {
  try {
    const cuestionario = new Cuestionario(req.body);
    await cuestionario.save();
    res.status(201).json(cuestionario);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al crear el cuestionario', error: error.message });
  }
});

// Obtener todos los cuestionarios
router.get('/', async (req, res) => {
  try {
    const cuestionarios = await Cuestionario.find();
    res.status(200).json(cuestionarios);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener los cuestionarios', error: error.message });
  }
});

// Obtener un cuestionario por ID
router.get('/:id', async (req, res) => {
  try {
    const cuestionario = await Cuestionario.findById(req.params.id);
    if (!cuestionario) {
      return res.status(404).json({ mensaje: 'Cuestionario no encontrado' });
    }
    res.status(200).json(cuestionario);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener el cuestionario', error: error.message });
  }
});

router.post('/responder', async (req, res) => {
  try {
    const { userId, respuestas } = req.body;
    console.log('Datos recibidos para procesar el cuestionario:', req.body);


    if (!userId || !respuestas) {
      return res.status(400).json({ mensaje: 'Faltan datos para procesar el cuestionario' });
    }

    // Procesar la respuesta clave
    const respuestaClave = respuestas['Navego hace']; // Cambiar el título según el cuestionario
    if (!respuestaClave) {
      
      return res.status(400).json({ mensaje: 'Respuesta clave no proporcionada' });
      
    }

    // Actualizar las clases completadas del usuario
    const clasesDesbloqueadas = await procesarCuestionario(respuestaClave, userId);

    res.status(200).json({
      mensaje: 'Cuestionario procesado correctamente',
      clasesDesbloqueadas,
    });
  } catch (error) {
    console.error('Error al procesar el cuestionario:', error.message);
    res.status(500).json({ mensaje: 'Error al procesar el cuestionario' });
  }
});




export default router;


