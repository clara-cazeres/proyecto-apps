import express from 'express';
import Cuestionario from '../models/Cuestionario.js';

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

export default router;
