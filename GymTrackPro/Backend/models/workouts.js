const { Schema, model } = require("mongoose");

const workoutsSchema = Schema({
  typesWorkouts: {
    type: Schema.ObjectId,
    ref: "types-workouts",
  },
  workoutType: {
    // Nuevo campo para el nombre del tipo de entrenamiento
    type: String,
    required: true,
    ref: "types-workouts",
  },
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    default: "default.png",
  },
  additionalInfo: String,
  description: String,
});

module.exports = model("Workout", workoutsSchema, "workouts");
