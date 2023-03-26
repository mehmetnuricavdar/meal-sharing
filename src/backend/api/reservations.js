const express = require("express");
const router = express.Router();
const knex = require("../database");

// GET all reservations
router.get("/", async (req, res) => {
  try {
    const reservations = await knex.select().from("reservations");
    res.json(reservations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET a reservation by id
router.get("/:id", async (req, res) => {
  try {
    const reservation = await knex
      .select()
      .from("reservations")
      .where("id", req.params.id)
      .first();
    if (!reservation) {
      res.status(404).json({ message: "Reservation not found" });
      return;
    }
    res.json(reservation);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// CREATE a new reservation
router.post("/", async (req, res) => {
  try {
    const {
      contactName,
      contactEmail,
      mealID,
      createdDate,
      contactPhoneNumber,
      numberOfGuests,
    } = req.body;
    console.log(
      "hello",
      contactName,
      contactEmail,
      mealID,
      createdDate,
      numberOfGuests,
      contactPhoneNumber
    );
    // if (!name || !email || !meal_id || !created_date) {
    //   res.status(400).json({
    //     message: `${!name && "Name"}, ${!email ? "email" : null}, ${
    //       !meal_id && "could not find the meal ID"
    //     } "and" ${!created_date && "date"} + " required")`,
    //   });
    //   return;
    // }
    const reservation = await knex("reservations").insert({
      contactName,
      contactEmail,
      mealID,
      createdDate,
      numberOfGuests,
      contactPhoneNumber,
    });
    // .returning("*");
    res.status(201).json(reservation);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// UPDATE a reservation by id
router.put("/:id", async (req, res) => {
  try {
    const { contactName, contactEmail, mealID, createdDate } = req.body;
    if (!contactName || !contactEmail || !mealID || !createdDate) {
      res.status(400).json({
        message: "Name, email, meal_id, and created_date are required",
      });
      return;
    }
    const reservation = await knex("reservations")
      .where("id", req.params.id)
      .update({
        contactName,
        contactEmail,
        mealID,
        createdDate,
        numberOfGuests,
      })
      .returning("*");
    if (!reservation) {
      res.status(404).json({ message: "Reservation not found" });
      return;
    }
    res.json(reservation);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE a reservation by id
router.delete("/:id", async (req, res) => {
  try {
    const reservation = await knex("reservations")
      .where("id", req.params.id)
      .del();
    if (!reservation) {
      res.status(404).json({ message: "Reservation not found" });
      return;
    }
    res.json({ message: "Reservation deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
