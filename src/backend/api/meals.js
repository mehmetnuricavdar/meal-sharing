const express = require("express");
const router = express.Router();
const knex = require("../database");

// GET all meals with query parameters
router.get("/", async (req, res) => {
  try {
    const {
      maxPrice,
      availableReservations,
      title,
      dateAfter,
      dateBefore,
      limit,
      sortKey,
      sortDir,
    } = req.query;

    let meals = knex.select().from("meals");

    if (maxPrice) {
      meals = meals.where("price", "<", maxPrice);
    }

    if (availableReservations) {
      if (availableReservations === "true") {
        meals = meals.whereExists(function () {
          this.select("*")
            .from("reservations")
            .whereRaw("reservations.meal_id = meals.id")
            .whereRaw("reservations.number_of_guests < meals.max_reservations");
        });
      } else {
        meals = meals.whereNotExists(function () {
          this.select("*")
            .from("reservations")
            .whereRaw("reservations.meal_id = meals.id")
            .whereRaw("reservations.number_of_guests < meals.max_reservations");
        });
      }
    }

    if (title) {
      meals = meals.where("title", "like", `%${title}%`);
    }

    if (dateAfter) {
      meals = meals.where("when", ">", dateAfter);
    }

    if (dateBefore) {
      meals = meals.where("when", "<", dateBefore);
    }

    if (limit) {
      meals = meals.limit(limit);
    }

    if (sortKey) {
      if (sortKey === "when") {
        meals = meals.orderBy("when", sortDir || "asc");
      } else if (sortKey === "max_reservations") {
        meals = meals.orderBy("max_reservations", sortDir || "asc");
      } else if (sortKey === "price") {
        meals = meals.orderBy("price", sortDir || "asc");
      } else {
        res.status(400).json({ message: "Invalid sort key" });
        return;
      }
    }

    meals = await meals;

    res.json(meals);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});



// GET a meal by id
router.get("/:id", async (req, res) => {
  try {
    const meal = await knex("meals").where({ mealID: req.params.id }).first();
    if (!meal) {
      res.status(404).json({ message: "Meal not found" });
      return;
    }
    res.json(meal);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// CREATE a new meal
router.post("/", async (req, res) => {
  try {
    const { title, description, location, when, max_reservation, price } =
      req.body;

    const meal = await knex("meals").insert({
      title,
      description,
      location,
      when,
      max_reservation,
      price,
    });
    res.status(201).json(meal);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// UPDATE a meal by id
router.put("/:id", async (req, res) => {
  try {
    const { title, description, location, when, max_reservation, price } =
      req.body;
    if (
      !title ||
      !description ||
      !location ||
      !when ||
      !max_reservation ||
      !price
    ) {
      res.status(400).json({
        message: "All fields are required",
      });
      return;
    }
    const meal = await knex("meals")
      .where("id", req.params.id)
      .update({
        title,
        description,
        location,
        when,
        max_reservation,
        price,
      })
      .returning("*");
    if (!meal) {
      res.status(404).json({ message: "Meal not found" });
      return;
    }
    res.json(meal);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE a meal by id
router.delete("/:id", async (req, res) => {
  try {
    const deletedMeal = await knex("meals")
      .where({ mealID: req.params.id })
      .del();
    if (!deletedMeal) {
      return res.status(404).json({ message: "Meal not found" });
    }
    res.json({ message: "Meal deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
