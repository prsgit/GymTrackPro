//Importar mongoose
const mongoose = require("mongoose");

//Método de conexión
const connection = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/app_GymTrackPro");

    console.log("Correctly connected to the bd : GymTrackPro");
  } catch (error) {
    console.log(error);
    throw new Error("The connection to the bd hasn´t been established !");
  }
};

//Exportar conexión
module.exports = connection;
