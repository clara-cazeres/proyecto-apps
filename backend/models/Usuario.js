import mongoose from 'mongoose';

const usuarioSchema = new mongoose.Schema({
  name: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  birthDate: { type: Date, required: true },
  gender: { type: String, required: false, default: ''  },
  city: { type: String, required: false, default: ''  },
  country: { type: String, required: false, default: ''  },
  height: { type: Number, required: false, default: 0  },
  weight: { type: Number, required: false, default: 0  },
  vo2max: { type: Number, required: false, default: 0  }, 
  boatType: { type: String, required: false, default: ''  },
  boatName: { type: String, required: false, default: ''  },
  aboutMe: { type: String, maxlength: 200, default: ''  },
  courseLevel: { type: String, required: false, default: ''  },
  completedClasses: { type: [String], default: [] }, 
});

const Usuario = mongoose.model('Usuario', usuarioSchema);

export default Usuario;
