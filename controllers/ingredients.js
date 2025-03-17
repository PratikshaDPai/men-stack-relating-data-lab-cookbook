const express = require("express");
const router = express.Router();
const Ingredient = require("../models/ingredient"); // Ensure this path is correct

router.post("", async (req, res) => {
  const { name } = req.body;
  if (!name.trim()) {
    return res.status(400).send("Ingredient name cannot be empty.");
  }

  const trimmedName = name.trim().toLowerCase();

  // Check if ingredient already exists (case insensitive match)
  const existingIngredient = await Ingredient.findOne({ name: trimmedName });

  if (existingIngredient) {
    return res.status(400).send("Ingredient already exists.");
  }

  // Create new ingredient
  const newIngredient = new Ingredient({ name: trimmedName });
  await newIngredient.save();

  res.redirect("/recipes");
});

module.exports = router;
