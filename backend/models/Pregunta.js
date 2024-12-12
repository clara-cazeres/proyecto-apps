import mongoose from 'mongoose';

const respuestaSchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, default: () => new mongoose.Types.ObjectId() },
  date: { type: Date, default: Date.now },
  user: { type: String, required: true },
  description: { type: String, required: true },
  img: { type: String, default: '' },
});

const preguntaSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  user: { type: String, required: true },
  date: { type: Date, default: Date.now },
  courseLevel: { type: String, required: true },
  category: { type: String, required: true },
  img: { type: [String], default: [] },
  respuestas: { type: [respuestaSchema], default: [] },
});

const Pregunta = mongoose.model('Pregunta', preguntaSchema);

export default Pregunta;