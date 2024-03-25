// acción de prueba
const prueba = (req, res) => {
  return res.status(200).send({
    status: "success",
    message: "Message sent from: controllers/workouts.js",
  });
};
//  exportar acciones
module.exports = {
  prueba,
};
