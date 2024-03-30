//Importar conexión a bd
const connection = require("./database/connection");

//Importar dependencias
const express = require("express");
const cors = require("cors");

//Mensaje de bienvenida
console.log("API REST run !");

//Ejecutar conexión a bd
connection();

//Crear servidor de Node
const app = express();
const port = 3911;

//Configurar Cors
app.use(cors());

//Convertir lops datos del body a objetos js
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Cargar configuración de rutas
const userRoutes = require("./routes/user");
const typesRoutes = require("./routes/types_of_workouts");
const workoutsRoutes = require("./routes/workouts");
const emailRoutes = require("./routes/email");

// Cargar rutas
app.use("/api/user", userRoutes);
app.use("/api/types-of-workouts", typesRoutes);
app.use("/api/workouts", workoutsRoutes);
app.use("/api/email", emailRoutes);

//Rutas de prueba
app.get("/testing-route", (req, res) => {
  return res.status(200).send({
    name: "Pedro",
    lastname: "Rueda",
  });
});

//Poner el servidor a escuchar peticiones http
app.listen(port, () => {
  console.log("The node server is listening on port:", port);
});
