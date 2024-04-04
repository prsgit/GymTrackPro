const { Schema, model } = require("mongoose");

const types_of_workoutsSchema = Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
});

module.exports = model("Type", types_of_workoutsSchema, "types-workouts");
