const { Schema, model } = require("mongoose");

const emailSchema = Schema({
  email: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  create_at: {
    type: Date,
    default: Date.now,
  },
});

module.exports = model("Email", emailSchema, "emails");
