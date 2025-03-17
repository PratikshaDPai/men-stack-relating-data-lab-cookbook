const express = require("express");
const router = express.Router();
const Recipe = require("../models/recipe"); // Ensure this path is correct

// Recipe Routes
router.get("", async (req, res) => {
  const recipes = await Recipe.find();
  res.render("recipes/index.ejs", { recipes });
});

router.get("/new", (req, res) => {
  res.render("recipes/new.ejs");
});

router.post("", async (req, res) => {
  const recipe = new Recipe(req.body);
  recipe.owner = req.session.user._id;
  await recipe.save();
  res.redirect("/recipes");
});

router.get("/:recipeId", async (req, res) => {
  const recipe = await Recipe.findById(req.params.recipeId);

  if (recipe.owner?.equals(req.session.user._id)) {
    // Proceed with viewing the recipe
    res.render("recipes/view.ejs", { recipe });
  } else {
    // Unauthorized. Redirect to /unauthorized
    res.status(401).redirect("/unauthorized");
  }
});

router.get("/:recipeId/edit", async (req, res) => {
  const recipe = await Recipe.findById(req.params.recipeId);

  if (recipe.owner?.equals(req.session.user._id)) {
    // Proceed with viewing the recipe
    res.render("recipes/edit.ejs", { recipe });
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
