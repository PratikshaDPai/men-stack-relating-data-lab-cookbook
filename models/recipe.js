const mongoose = require("mongoose");

// Recipe Schema
const recipeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  instructions: { type: String },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  ingredients: [{ type: mongoose.Schema.Types.ObjectId, ref: "Ingredient" }],
});

// Creating models
const Recipe = mongoose.model("Recipe", recipeSchema);

module.exports = Recipe;
