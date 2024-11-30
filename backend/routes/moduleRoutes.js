import express from 'express';
import Course from '../models/Course.js';

const router = express.Router();

// Obtener todos los cursos
router.get('/', async (req, res) => {
  try {
    const courses = await Course.find();
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener los cursos', error: error.message });
  }
});

// Obtener un curso por ID
router.get('/:id', async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ mensaje: 'Curso no encontrado' });
    }
    res.status(200).json(course);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener el curso', error: error.message });
  }
});

// Crear un nuevo curso
router.post('/', async (req, res) => {
  try {
    const course = new Course(req.body);
    await course.save();
    res.status(201).json(course);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al crear el curso', error: error.message });
  }
});

// Actualizar un curso
router.put('/:id', async (req, res) => {
  try {
    const course = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!course) {
      return res.status(404).json({ mensaje: 'Curso no encontrado' });
    }
    res.status(200).json(course);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al actualizar el curso', error: error.message });
  }
});

// Eliminar un curso
router.delete('/:id', async (req, res) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);
    if (!course) {
      return res.status(404).json({ mensaje: 'Curso no encontrado' });
    }
    res.status(200).json({ mensaje: 'Curso eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar el curso', error: error.message });
  }
});

export default router;
