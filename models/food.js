const mongoose = require("mongoose");

// Food Schema (Now Referenced Instead of Embedded)
const foodSchema = new mongoose.Schema({
  name: { type: String, required: true },
});

const Food = mongoose.model("Food", foodSchema);

module.exports = Food;
