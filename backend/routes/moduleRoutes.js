import express from 'express';
import Module from '../models/Modulo.js';

const router = express.Router();

// Obtener todos los cursos
router.get('/', async (req, res) => {
  try {
    const modules = await Module.find();
    res.status(200).json(modules);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener los cursos', error: error.message });
  }
});

// Obtener un curso por ID
router.get('/:id', async (req, res) => {
  try {
    const module = await Module.findById(req.params.id);
    if (!module) {
      return res.status(404).json({ mensaje: 'Curso no encontrado' });
    }
    res.status(200).json(module);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener el curso', error: error.message });
  }
});


// Crear un nuevo curso
router.post('/', async (req, res) => {
  try {
    console.log('Cuerpo recibido:', req.body); // Agregar log aquí
    const module = new Module(req.body);
    await module.save();
    res.status(201).json(module);
  } catch (error) {
    console.error('Error al crear el módulo:', error.message);
    res.status(500).json({ mensaje: 'Error al crear el curso', error: error.message });
  }
});


// Actualizar un curso
router.put('/:id', async (req, res) => {
  try {
    const module = await Module.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!module) {
      return res.status(404).json({ mensaje: 'Curso no encontrado' });
    }
    res.status(200).json(module);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al actualizar el curso', error: error.message });
  }
});

// Eliminar un curso
router.delete('/:id', async (req, res) => {
  try {
    const module = await Module.findByIdAndDelete(req.params.id);
    if (!module) {
      return res.status(404).json({ mensaje: 'Curso no encontrado' });
    }
    res.status(200).json({ mensaje: 'Curso eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar el curso', error: error.message });
  }
});

export default router;
