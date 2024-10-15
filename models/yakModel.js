const mongoose = require("mongoose");

const yakSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  sex: { type: String, enum: ["f", "m"], required: true },
  lastShaved: { type: Number, default: 0 },
});

module.exports = mongoose.model("Yak", yakSchema);
