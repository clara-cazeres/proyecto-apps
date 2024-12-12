import mongoose from 'mongoose';

const opcionSchema = new mongoose.Schema({
  id: { type: String, required: true },
  text: { type: String, required: true },
});

const preguntaSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: false },
  type: { type: String, required: true },
  correctAnswer: { type: [String] }, 
  options: [opcionSchema], 
});

const cuestionarioSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  questions: [preguntaSchema], 
});

const Cuestionario = mongoose.model('Cuestionario', cuestionarioSchema);

export default Cuestionario;
