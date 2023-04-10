const express = require("express");
const router = express.Router();
const knex = require("../database");

// GET all reviews
router.get("/", async (req, res) => {
  try {
    const reviews = await knex("reviews").select();
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get all reviews for a meal by meal ID
router.get("/:mealID", async (req, res) => {
  try {
    const { mealID } = req.params;
    const reviews = await knex("reviews").where({ mealID: mealID });
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add a new review for a meal
router.post("/", async (req, res) => {
  const { mealID, name, rating, comment } = req.body;
  await knex("reviews").insert({ mealID, name, rating, comment });
  res.sendStatus(201);
});

// Update an existing review by ID
router.put("/:id", async (req, res) => {
  const { mealID } = req.params;
  const { name, rating, comment } = req.body;
  await knex("reviews").where({ mealID }).update({ name, rating, comment });
  res.sendStatus(204);
});

// Delete a review by ID
router.delete("/:id", async (req, res) => {
  const { mealID } = req.params;
  await knex("reviews").where({ mealID }).del();
  res.sendStatus(204);
});

module.exports = router;
