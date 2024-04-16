// const { Schema, model } = require("mongoose");

// const workoutsSchema = Schema({
//   typeofWorkouts: {
//     type: Schema.ObjectId,
//     ref: "TypeOfWorkouts",
//   },
//   name: {
//     type: String,
//     required: true,
//   },
//   image: {
//     type: String,
//     default: "default.png",
//   },
//   additionalInfo: String,
//   description: String,
// });

// module.exports = model("Workout", workoutsSchema, "workouts");

const { Schema, model } = require("mongoose");

const workoutsSchema = Schema({
  typesWorkouts: {
    type: Schema.ObjectId,
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
