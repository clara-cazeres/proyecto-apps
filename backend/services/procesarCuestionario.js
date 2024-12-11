import Module from '../models/Modulo.js';
import Usuario from '../models/Usuario.js';

const procesarCuestionario = async (respuestaCuestionario, usuarioId) => {
  try {
    let clasesDesbloqueadas = [];

    // Interpreta el valor de 'Navego hace'
    const nivelRequerido = 
      respuestaCuestionario === '2' ? 'Básico' : // Entre 6 meses y 2 años
      respuestaCuestionario === '3' ? 'Básico' : // Más de dos años
      null;

    if (nivelRequerido) {
      // Busca los módulos con el nivel de curso correspondiente
      const modulos = await Module.find({ courseLevel: nivelRequerido });

      // Recorre las lecciones para desbloquear clases
      modulos.forEach((modulo) => {
        modulo.lessons.forEach((lesson) => {
          clasesDesbloqueadas.push(lesson.id); // Usa `id` (no `_id`)
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
