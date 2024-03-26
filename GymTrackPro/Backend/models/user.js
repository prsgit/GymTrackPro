const { Schema, model } = require("mongoose");

const userSchema = Schema({
  name: {
    type: String,
    required: true,
  },
  surname: String,
  nick: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    select: false, //asi evitamos que nos devuelva la password.
  },
  role: {
    type: String,
    default: "role_user",
    select: false, //asi evitamos que nos devuelva el role.
  },
  image: {
    type: String,
    default: "default.png",
  },
  create_at: {
    type: Date,
    default: Date.now,
  },
});

module.exports = model("User", userSchema, "users");
