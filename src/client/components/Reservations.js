import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Meal from "./Meal";

const Reservations = () => {
  const [meals, setMeal] = useState({});
  const [reservation, setReservation] = useState({});
  const [availableSpots, setAvailableSpots] = useState(0);
  const { mealID } = useParams();
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReservations = async () => {
      ("./api/reservations");
      try {
        const response = await fetch(`./api/reservations/${mealID}`);
        const data = await response.json();
        console.log(mealID);
        console.log(data.guest_count);
        setReservation(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchReservations();
  }, []);

  const handleReservation = async (event) => {
    event.preventDefault();

    if (availableSpots > 0) {
      const response = await fetch("/api/reservations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...reservation,
          mealID: meals.mealID,
        }),
      });

      if (response.ok) {
        alert("Reservation created successfully!");
        setReservation({});
        setAvailableSpots(availableSpots - data.guest_count);
        setMeal({
          ...meals,
          available_reservations: meals.available_reservations - 1,
        });
      } else {
        alert("Error creating reservation.");
      }
    } else {
      alert("No available spots for this meal.");
    }
    setMeal({
      ...meals,
      available_reservations:
        meals.available_reservations - reservation.guest_count,
    });

  };

  

  return (
    <>
      {error ? (
        <div>{error}</div>
      ) : (
        <div>
          <form onSubmit={handleReservation}>
            <h3>Make a reservation</h3>

            <label htmlFor="name">Name:</label>
            <input
              type="text"
              name="name"
              value={reservation.name || ""}
              onChange={(e) =>
                setReservation({ ...reservation, name: e.target.value })
              }
            />
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              name="email"
              value={reservation.email || ""}
              onChange={(e) =>
                setReservation({ ...reservation, email: e.target.value })
              }
            />
            <label htmlFor="phone">Phone:</label>
            <input
              type="tel"
              name="phone"
              value={reservation.phone || ""}
              onChange={(e) =>
                setReservation({ ...reservation, phone: e.target.value })
              }
            />
            <button type="submit">Book seat</button>
          </form>
        </div>
      )}
    </>
  );
};

export default Reservations;
