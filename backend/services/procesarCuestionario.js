// Función para procesar las respuestas del cuestionario y asignar clases desbloqueadas
import Module from '../models/Module.js';
import Usuario from '../models/Usuario.js';

const procesarCuestionario = async (respuestaCuestionario, usuarioId) => {
  try {
    let clasesDesbloqueadas = [];

    // Verifica la respuesta específica "Navego hace..."
    if (respuestaCuestionario === "entre 6 meses y 2 años" || respuestaCuestionario === "más de dos años") {
      const nivelRequerido = "Básico";

      // Busca los módulos con el nivel de curso "Básico"
      const modulosBasicos = await Module.find({ courseLevel: nivelRequerido });

      // Recorre las lecciones de los módulos básicos para obtener las clases desbloqueadas
      modulosBasicos.forEach((modulo) => {
        modulo.lessons.forEach((leccion) => {
          clasesDesbloqueadas.push(leccion.id); // Agrega el ID de cada lección al array
        });
      });
    }

    // Actualiza el usuario con las clases desbloqueadas
    await Usuario.findByIdAndUpdate(usuarioId, {
      $set: { completedClasses: clasesDesbloqueadas },
    });

    console.log(`Clases desbloqueadas para el usuario ${usuarioId}:`, clasesDesbloqueadas);
    return clasesDesbloqueadas;
  } catch (error) {
    console.error("Error al procesar el cuestionario:", error);
    throw new Error("No se pudo procesar el cuestionario inicial");
  }
};

export default procesarCuestionario;
