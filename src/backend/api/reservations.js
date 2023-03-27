const express = require("express");
const router = express.Router();
const knex = require("../database");

// GET all reservations
router.get("/", async (req, res) => {
  try {
    const reservations = await knex("reservations").select();
    res.json(reservations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET a reservation by id
router.get("/:id", async (req, res) => {
  try {
    const reservation = await knex("reservations")
      .select()
      .where("reservationID", req.params.id)
      .first();
    if (!reservation) {
      return res.status(404).json({ message: "Reservation not found" });
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

    if (!contactName || !contactEmail || !mealID || !createdDate) {
      return res.status(400).json({
        message: "Name, email, meal_id, and created_date are required",
      });
    }

    const reservation = await knex("reservations").insert({
      contactName,
      contactEmail,
      mealID,
      createdDate,
      numberOfGuests,
      contactPhoneNumber,
    }).returning('*');

    res.status(201).json(reservation);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// UPDATE a reservation by id
router.put("/:id", async (req, res) => {
  try {
    const {
      contactName,
      contactEmail,
      mealID,
      createdDate,
      contactPhoneNumber,
      numberOfGuests,
    } = req.body;

    if (!contactName || !contactEmail || !mealID || !createdDate) {
      return res.status(400).json({
        message: "Name, email, mealID, and createdDate are required",
      });
    }

    const reservation = await knex("reservations")
      .where("reservationID", req.params.id)
      .update({
        contactName,
        contactEmail,
        mealID,
        createdDate,
        numberOfGuests,
        contactPhoneNumber,
      })
      .returning("*");

    if (!reservation) {
      return res.status(404).json({ message: "Reservation not found" });
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
      .where("reservationID", req.params.id)
      .del();

    if (!reservation) {
      return res.status(404).json({ message: "Reservation not found" });
    }

    res.json({ message: "Reservation deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
