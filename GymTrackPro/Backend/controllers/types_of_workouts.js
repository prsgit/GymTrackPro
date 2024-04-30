//Importaciones
const types_of_workouts = require("../models/types_of_workouts");
const workouts = require("../models/workouts");

// acción guardar tipo de entrenamiento
const saveTypeWorkout = async (req, res) => {
  try {
    // Recoger datos del body
    const params = req.body;

    // Crear el objeto a guardar
    const type = new types_of_workouts(params);

    // Guardarlo de forma asíncrona
    const typeStored = await type.save();

    if (!typeStored) {
      return res.status(400).send({
        status: "error",
        message: "The type of workout hasn't been saved",
      });
    }

    res.status(200).send({
      status: "success",
      message: "Type of workout saved successfully",
      type: typeStored,
    });
  } catch (error) {
    res.status(500).send({
      status: "error",
      message: "Internal server error",
    });
  }
};

//------------------------------------------------------------------------------------------------------

// const oneTypeWorkout = async (req, res) => {
//   try {
//     // Sacar un params por la url
//     const typeId = req.params.id;

//     // Buscar type of workout y sacarlo de forma asíncrona
//     const type = await types_of_workouts.findById(typeId);

//     if (!type) {
//       return res.status(404).send({
//         status: "error",
//         message: "There is no type of workout",
//       });
//     }

//     res.status(200).send({
//       status: "success",
//       type,
//     });
//   } catch (error) {
//     res.status(500).send({
//       status: "error",
//       message: "Internal server error",
//     });
//   }
// };

// //-------------------------------------------------------------------------------------------------

const allTypesWorkout = async (req, res) => {
  try {
    // Buscar todos los tipos de entrenamiento de forma asíncrona
    const allTypes = await types_of_workouts.find();

    if (!allTypes || allTypes.length === 0) {
      return res.status(404).send({
        status: "error",
        message: "There are no types of workout",
      });
    }

    res.status(200).send({
      status: "success",
      allTypes,
    });
  } catch (error) {
    res.status(500).send({
      status: "error",
      message: "Internal server error",
    });
  }
};

//------------------------------------------------------------------------------

const oneTypeWorkout = async (req, res) => {
  try {
    const typeId = req.params.id;

    // Busca el tipo de workout por su ID
    const type = await types_of_workouts.findById(typeId);

    if (!type) {
      return res.status(404).send({
        status: "error",
        message: "There is no type of workout",
      });
    }

    // Realiza la operación de búsqueda para obtener los workouts asociados al typeId
    const Typeworkouts = await workouts.find({ typeofWorkouts: typeId });
    console.log(Typeworkouts);

    res.status(200).send({
      status: "success",
      type,
      Typeworkouts,
    });
  } catch (error) {
    res.status(500).send({
      status: "error",
      message: "Internal server error",
    });
  }
};

//-----------------------------------------------------------------------------------------

const update = async (req, res) => {
  try {
    // Recoger id tipo de entrenamiento url
    const id = req.params.id;

    // Recoger datos body
    const data = req.body;

    // Buscar y actualizar tipo
    const updateType = await types_of_workouts.findByIdAndUpdate(id, data, {
      new: true,
    });

    if (!updateType) {
      return res.status(500).send({
        status: "error",
        message: "The type of workout hasn't been updated",
      });
    }

    res.status(200).send({
      status: "success",
      updateType,
    });
  } catch (error) {
    res.status(500).send({
      status: "error",
      message: "Internal Server Error",
    });
  }
};

//-------------------------------------------------------------------------------------------------------

const remove = async (req, res) => {
  //Sacar la id del tipo de la url
  const idType = req.params.id;

  //Hacer consulta para buscar y eliminar el tipo con un await
  try {
    const typeRemoved = await types_of_workouts.findByIdAndDelete(idType);

    //Devolver resultado

    res.status(200).send({
      status: "success",
      message: "Type of workout removed",
      typeRemoved,
    });
  } catch (error) {
    res.status(500).send({
      status: "error",
      message: "Internal Server Error",
    });
  }
};

//  exportar acciones
module.exports = {
  saveTypeWorkout,
  oneTypeWorkout,
  allTypesWorkout,
  update,
  remove,
};
