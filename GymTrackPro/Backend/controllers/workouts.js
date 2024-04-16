//Importaciones
const workouts = require("../models/workouts");
const fs = require("fs");
const path = require("path");

// acción guardar tipo de entrenamiento
const saveWorkout = async (req, res) => {
  // Recoger datos del body
  const params = req.body;

  // Crear el objeto a guardar
  const workout = new workouts(params);

  try {
    // Guardarlo de forma asíncrona
    const workoutStored = await workout.save();

    if (!workoutStored) {
      return res.status(400).send({
        status: "error",
        message: "The workout hasn't been saved",
      });
    }

    res.status(200).send({
      status: "success",
      message: "Workout saved successfully",
      workoutStored,
    });
  } catch (error) {
    res.status(500).send({
      status: "error",
      message: "Internal server error",
    });
  }
};

//----------------------------------------------------------------------------------

// const oneWorkout = async (req, res) => {
//   try {
//     // Sacar un params por la url
//     const oneWorkoutId = req.params.id;

//     // Buscar type of workout y sacarlo de forma asíncrona
//     const typeWorkout = await workouts.findById(oneWorkoutId);

//     if (!typeWorkout) {
//       return res.status(404).send({
//         status: "error",
//         message: "There is no workout",
//       });
//     }

//     res.status(200).send({
//       status: "success",
//       typeWorkout,
//     });
//   } catch (error) {
//     res.status(500).send({
//       status: "error",
//       message: "Internal server error",
//     });
//   }
// };

// const oneWorkout = async (req, res) => {
//   try {
//     // Obtener el ID del tipo de entrenamiento desde los parámetros de la URL
//     const oneWorkoutId = req.params.id;
//     console.log(oneWorkoutId);

//     // Buscar el tipo de entrenamiento y los ejercicios asociados de forma asíncrona
//     const typeWorkoutWithExercises = await workouts.find({
//       typeofWorkouts: oneWorkoutId,
//     });
//     console.log(typeWorkoutWithExercises);

//     if (!typeWorkoutWithExercises) {
//       return res.status(404).send({
//         status: "error",
//         message: "No se encontró el tipo de entrenamiento",
//       });
//     }
//     res.status(200).send({
//       status: "success",
//       typeWorkout: typeWorkoutWithExercises,
//     });
//   } catch (error) {
//     res.status(500).send({
//       status: "error",
//       message: "Error interno del servidor",
//     });
//   }
// };

const exercisesByType = async (req, res) => {
  try {
    const typeId = req.params.typeId; // ID o identificador del tipo de entrenamiento

    // Buscar ejercicios por el tipo de entrenamiento
    const exercises = await workouts.find({ typeofWorkout: typeId });

    if (!exercises || exercises.length === 0) {
      return res.status(404).send({
        status: "error",
        message: "No exercises found for the specified type of training",
      });
    }

    res.status(200).send({
      status: "success",
      exercises,
    });
  } catch (error) {
    res.status(500).send({
      status: "error",
      message: "Internal server error",
    });
  }
};

// //-------------------------------------------------------------------------------------

const update = async (req, res) => {
  try {
    // Recoger id tipo de entrenamiento url
    const id = req.params.id;

    // Recoger datos body
    const data = req.body;

    // Buscar y actualizar tipo
    const updateWorkout = await workouts.findByIdAndUpdate(id, data, {
      new: true,
    });

    if (!updateWorkout) {
      return res.status(500).send({
        status: "error",
        message: "The workout hasn't been updated",
      });
    }

    res.status(200).send({
      status: "success",
      updateWorkout,
    });
  } catch (error) {
    res.status(500).send({
      status: "error",
      message: "Internal Server Error",
    });
  }
};

//-------------------------------------------------------------------------------------------------------

const upload = async (req, res) => {
  try {
    // Configuración de subida (multer) está en routes/user.js
    // y la ponemos en devolver respuesta file:req.file.

    // Recoger workout Id
    let workoutId = req.params.id;

    // Recoger fichero de imagen y comprobar si existe
    if (!req.file) {
      return res.status(404).send({
        status: "error",
        message: "The request doesn't include the image",
      });
    }

    // Conseguir el nombre del archivo
    let image = req.file.originalname;

    // Sacar info. de la imagen
    const imageSplit = image.split(".");
    const extension = imageSplit[1];

    // Comprobar si la extensión es válida
    if (
      extension != "png" &&
      extension != "jpg" &&
      extension != "jpeg" &&
      extension != "webp"
    ) {
      // Borrar archivo
      const filePath = req.file.path;
      const fileDeleted = fs.unlinkSync(filePath);

      // Devolver error
      return res.status(404).send({
        status: "error",
        message: "The extension isn't valid",
      });
    }

    // Si es correcto, guardar la imagen en la bbdd
    const workoutUpdated = await workouts.findOneAndUpdate(
      { _id: workoutId },
      { image: req.file.filename },
      { new: true }
    );

    if (!workoutUpdated) {
      return res.status(500).send({
        status: "error",
        message: "Error in file upload",
      });
    }

    // Devolver respuesta
    return res.status(200).send({
      status: "success",
      workout: workoutUpdated,
      file: req.file,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      status: "error",
      message: "Error in file upload",
    });
  }
};

//---------------------------------------------------------------------------------------

const image = (req, res) => {
  //Sacar el parámetro de la url
  const file = req.params.file;

  //Montar el path real de la imagen
  const filePath = "./uploads/workouts/" + file;

  //Comprobar que existe el fichero
  fs.stat(filePath, (error, exists) => {
    if (error || !exists) {
      return res.status(404).send({
        status: "error",
        message: "The image doesn´t exist",
      });
    }

    //Devolver el fichero
    return res.sendFile(path.resolve(filePath));
  });
};

//-------------------------------------------------------------------------------------------

const remove = async (req, res) => {
  //Sacar la id del tipo de la url
  const idWorkout = req.params.id;

  //Hacer consulta para buscar y eliminar el tipo con un await
  try {
    const workoutRemoved = await workouts.findByIdAndDelete(idWorkout);

    //Devolver resultado

    res.status(200).send({
      status: "success",
      message: "Workout removed",
      workoutRemoved,
    });
  } catch (error) {
    res.status(500).send({
      status: "error",
      message: "Internal Server Error",
    });
  }
};

//-------------------------------------------------------------------------------------------------

//  exportar acciones
module.exports = {
  saveWorkout,
  // oneWorkout,
  exercisesByType,
  update,
  upload,
  image,
  remove,
};
