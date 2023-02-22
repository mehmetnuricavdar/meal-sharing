const express = require("express");
const router = express.Router();
const knex = require("../database");

// GET all meals
router.get("/", async (req, res) => {
  try {
    const meals = await knex("meals").select("*");
    res.json(meals);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// GET a single meal by id
router.get("/:id", async (req, res) => {
  try {
    const meal = await knex("meals").where({ id: req.params.id }).first();
    if (!meal) {
      return res.status(404).json({ message: "Meal not found" });
    }
    res.json(meal);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// CREATE a new meal
router.post("/", async (req, res) => {
  try {
    const { name, description, price } = req.body;
    const newMeal = await knex("meals").insert({ name, description, price });
    res.status(201).json(newMeal);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// UPDATE a meal by id
router.put("/:id", async (req, res) => {
  try {
    const { name, description, price } = req.body;
    const updatedMeal = await knex("meals")
      .where({ id: req.params.id })
      .update({ name, description, price });
    if (!updatedMeal) {
      return res.status(404).json({ message: "Meal not found" });
    }
    res.json({ message: "Meal updated successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// DELETE a meal by id
router.delete("/:id", async (req, res) => {
  try {
    const deletedMeal = await knex("meals").where({ id: req.params.id }).del();
    if (!deletedMeal) {
      return res.status(404).json({ message: "Meal not found" });
    }
    res.json({ message: "Meal deleted successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
