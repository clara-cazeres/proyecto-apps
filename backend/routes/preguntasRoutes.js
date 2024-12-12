import express from 'express';
import Pregunta from '../models/Pregunta.js';
import { verificarToken } from '../middlewares/middlewares.js';

const router = express.Router();

// get preguntas
router.get('/', async (req, res) => {
  try {
    const preguntas = await Pregunta.find().sort({ date: -1 });
    res.status(200).json(preguntas);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener las preguntas.' });
  }
});

// post nueva pregunta
router.post('/', async (req, res) => {
    try {
      const { title, description, user, courseLevel, category, img } = req.body;
  
      // Crear la pregunta
      const nuevaPregunta = new Pregunta({
        title,
        description,
        user, 
        courseLevel,
        category,
        img,
      });
  
      const preguntaCreada = await nuevaPregunta.save();
      res.status(201).json(preguntaCreada);
    } catch (error) {
      console.error('Error al crear la pregunta:', error);
      res.status(500).json({ error: 'Error al crear la pregunta.' });
    }
  });
  

// get pregunta por id
router.get('/:id', async (req, res) => {
  try {
    const pregunta = await Pregunta.findById(req.params.id);
    if (!pregunta) {
      return res.status(404).json({ error: 'Pregunta no encontrada.' });
    }
    res.status(200).json(pregunta);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener la pregunta.' });
  }
});

// post respuesta a una pregunta 
router.post('/:id/respuestas', async (req, res) => {
    try {
      const { user, description, img } = req.body;
      const pregunta = await Pregunta.findById(req.params.id);
  
      if (!pregunta) {
        return res.status(404).json({ error: 'Pregunta no encontrada.' });
      }
  
      const nuevaRespuesta = {
        user,
        description,
        img,
        date: new Date(),
      };
  
      pregunta.respuestas.push(nuevaRespuesta);
      const preguntaActualizada = await pregunta.save();
      res.status(201).json(preguntaActualizada);
    } catch (error) {
      console.error('Error al añadir la respuesta:', error);
      res.status(500).json({ error: 'Error al añadir la respuesta.' });
    }
  });
  

export default router;
