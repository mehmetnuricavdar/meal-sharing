const express = require("express");
const router = express.Router();
const { Review } = require("../models");

// Returns all reviews
router.get("/api/reviews", async (req, res) => {
  try {
    const reviews = await Review.findAll();
    res.json(reviews);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

// Returns all reviews for a specific meal
router.get("/api/meals/:meal_id/reviews", async (req, res) => {
  try {
    const reviews = await Review.findAll({
      where: {
        meal_id: req.params.meal_id,
      },
    });
    res.json(reviews);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

// Adds a new review to the database
router.post("/api/reviews", async (req, res) => {
  try {
    const review = await Review.create(req.body);
    res.json(review);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

// Returns a review by id
router.get("/api/reviews/:id", async (req, res) => {
  try {
    const review = await Review.findByPk(req.params.id);
    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }
    res.json(review);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

// Updates the review by id
router.put("/api/reviews/:id", async (req, res) => {
  try {
    const review = await Review.findByPk(req.params.id);
    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }
    const updatedReview = await review.update(req.body);
    res.json(updatedReview);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

// Deletes the review by id
router.delete("/api/reviews/:id", async (req, res) => {
  try {
    const review = await Review.findByPk(req.params.id);
    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }
    await review.destroy();
    res.json({ message: "Review deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
