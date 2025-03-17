const express = require("express");
const router = express.Router();
const Recipe = require("../models/recipe");
const Ingredient = require("../models/ingredient");

// Recipe Routes
router.get("", async (req, res) => {
  const recipes = await Recipe.find();
  const ingredients = await Ingredient.find();
  res.render("recipes/index.ejs", { recipes, ingredients });
});

router.get("/new", async (req, res) => {
  const ingredients = await Ingredient.find();
  res.render("recipes/new.ejs", { ingredients });
});

router.post("", async (req, res) => {
  const recipe = new Recipe(req.body);
  recipe.owner = req.session.user._id;
  await recipe.save();
  res.redirect("/recipes");
});

router.get("/:recipeId", async (req, res) => {
  const recipe = await Recipe.findById(req.params.recipeId).populate(
    "ingredients"
  );

  if (recipe.owner?.equals(req.session.user._id)) {
    // Proceed with viewing the recipe
    res.render("recipes/show.ejs", { recipe });
  } else {
    // Unauthorized. Redirect to /unauthorized
    res.status(401).redirect("/unauthorized");
  }
});

router.get("/:recipeId/edit", async (req, res) => {
  const recipe = await Recipe.findById(req.params.recipeId);
  const ingredients = await Ingredient.find();

  if (recipe.owner?.equals(req.session.user._id)) {
    // Proceed with viewing the recipe
    res.render("recipes/edit.ejs", { recipe, ingredients });
  } else {
    // Unauthorized. Redirect to /unauthorized
    res.statusCode(401).redirect("/unauthorized");
  }
});

router.put("/:recipeId", async (req, res) => {
  const recipe = await Recipe.findById(req.params.recipeId);

  if (recipe.owner?.equals(req.session.user._id)) {
    // Proceed with viewing the recipe
    recipe.set(req.body);
    await recipe.save();
    res.redirect("/recipes");
  } else {
    // Unauthorized. Redirect to /unauthorized
    res.statusCode(401).redirect("/unauthorized");
  }
});

router.delete("/:recipeId", async (req, res) => {
  const recipe = await Recipe.findById(req.params.recipeId);

  if (recipe.owner?.equals(req.session.user._id)) {
    // Proceed with viewing the recipe
    await Recipe.findByIdAndDelete(req.params.recipeId);
    res.redirect("/recipes");
  } else {
    // Unauthorized. Redirect to /unauthorized
    res.statusCode(401).redirect("/unauthorized");
  }
});

module.exports = router;
