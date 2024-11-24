import mongoose from 'mongoose';

const usuarioSchema = new mongoose.Schema({
  name: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  birthDate: { type: Date, required: true },
  gender: { type: String, required: false },
  city: { type: String, required: false },
  country: { type: String, required: false },
  height: { type: Number, required: false },
  weight: { type: Number, required: false },
  vo2max: { type: Number, required: false }, 
  boatType: { type: String, required: false },
  boatName: { type: String, required: false },
  aboutMe: { type: String, maxlength: 200 },
  courseLevel: { type: String, required: false },
  completedClasses: { type: [String], default: [] }, 
});

// Crear el modelo de Mongoose
const Usuario = mongoose.model('Usuario', usuarioSchema);

export default Usuario;
