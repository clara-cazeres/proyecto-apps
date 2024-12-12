import mongoose from 'mongoose';

const lessonSchema = new mongoose.Schema({
  id: { type: String, required: true },
  title: { type: String, required: true },
  img: { type: String, required: false },
  description: { type: String, required: true },
  module: { type: Number, required: true },
  lessonNumber: { type: Number, required: true },
  level: { type: String, required: true },
  requiredClasses: { type: [String], default: [] },
  video: { type: String, required: false },
  time: { type: Number, required: true }, // en minutos
  summary: { type: String, required: false }, // puede ser un string o un array si es listado
  category: { type: Array, required: true },
});

const moduleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  img: { type: String, required: false },
  video: { type: String, required: false },
  description: { type: String, required: true },
  goal: { type: String, required: true },
  courseLevel: { type: String, required: true },
  category: { type: Array, required: true },
  lessons: [lessonSchema], 
  createdAt: { type: Date, default: Date.now },
});

const Module = mongoose.model('Module', moduleSchema);

export default Module;
