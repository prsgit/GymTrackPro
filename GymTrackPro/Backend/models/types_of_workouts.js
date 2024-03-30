const { Schema, model } = require("mongoose");

const types_of_workoutsSchema = Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  type: {
    type: String,
    enum: ["Fuerza", "Hipertrofía", "Aeróbico"],
    required: true,
  },
});

module.exports = model("type", types_of_workoutsSchema, "types");
