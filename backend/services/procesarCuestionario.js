import Module from '../models/Modulo.js';
import Usuario from '../models/Usuario.js';

const procesarCuestionario = async (respuestaCuestionario, usuarioId) => {
  try {
    let clasesDesbloqueadas = [];

    // valor de 'Navego hace'
    const nivelRequerido = 
      respuestaCuestionario === '2' ? 'Básico' : // Entre 6 meses y 2 años
      respuestaCuestionario === '3' ? 'Básico' : // Más de dos años
      null;

    if (nivelRequerido) {
    
      const modulos = await Module.find({ courseLevel: nivelRequerido });

      // recorre las lessons para desbloquear clases
      modulos.forEach((modulo) => {
        modulo.lessons.forEach((lesson) => {
          clasesDesbloqueadas.push(lesson.id); // Usa `id` (no `_id`)
        });
      });
    }

    // actualiza el usuario con las clases desbloqueadas
    const usuarioActualizado = await Usuario.findByIdAndUpdate(
      usuarioId,
      { $set: { completedClasses: clasesDesbloqueadas } },
      { new: true } // deuvelve info actualizada
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
