import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const urlDB = process.env.MONGO_URI;

export const conectarDB = async () => {
  try {
    await mongoose.connect(urlDB);
    console.log('Successful DB connection');
  } catch (error) {
    console.error('Error al conectar a MongoDB:', error.message);
    process.exit(1); 
  }
};
