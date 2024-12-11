import Module from '../models/Modulo.js';
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
        modulo.lessons.forEach((lesson) => {
          clasesDesbloqueadas.push(lesson.id); // Agrega el campo `id` personalizado al array
        });
      });
    }

    // Actualiza el usuario con las clases desbloqueadas
    const usuarioActualizado = await Usuario.findByIdAndUpdate(
      usuarioId,
      { $set: { completedClasses: clasesDesbloqueadas } },
      { new: true } // Retorna el documento actualizado
    );

    console.log(`Clases desbloqueadas para el usuario ${usuarioId}:`, clasesDesbloqueadas);
    console.log("Usuario actualizado:", usuarioActualizado);
    return clasesDesbloqueadas;
  } catch (error) {
    console.error("Error al procesar el cuestionario:", error);
    throw new Error("No se pudo procesar el cuestionario inicial");
  }
};

export default procesarCuestionario;
