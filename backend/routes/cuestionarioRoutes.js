import express from 'express';
import Cuestionario from '../models/Cuestionario.js';
import procesarCuestionario from '../services/procesarCuestionario.js';
import Usuario from '../models/Usuario.js';

const router = express.Router();

// post un nuevo cuestionario
router.post('/', async (req, res) => {
  try {
    const cuestionario = new Cuestionario(req.body);
    await cuestionario.save();
    res.status(201).json(cuestionario);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al crear el cuestionario', error: error.message });
  }
});

// get todos los cuestionarios
router.get('/', async (req, res) => {
  try {
    const cuestionarios = await Cuestionario.find();
    res.status(200).json(cuestionarios);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener los cuestionarios', error: error.message });
  }
});

// get un cuestionario por id
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

    if (!userId || !respuestas) {
      return res.status(400).json({ mensaje: 'Faltan datos para procesar el cuestionario' });
    }

    const usuario = await Usuario.findById(userId);
    if (!usuario) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }

    console.log('Procesando cuestionario para el usuario:', userId);
    console.log('Respuestas recibidas:', respuestas);

    const clasesDesbloqueadas = await procesarCuestionario(respuestas['Navego hace'], userId);

    res.status(200).json({
      mensaje: 'Cuestionario procesado correctamente',
      clasesDesbloqueadas,
    });
  } catch (error) {
    console.error('Error al procesar el cuestionario:', error.message);
    res.status(500).json({ mensaje: 'Error al procesar el cuestionario', error: error.message });
  }
});


export default router;


