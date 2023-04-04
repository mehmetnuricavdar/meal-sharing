import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const Meal = () => {
  const [meal, setMeal] = useState({});
  const [searchTitle, setSearchTitle] = useState("");
  const [reservation, setReservation] = useState({});
  const [availableSpots, setAvailableSpots] = useState(0);
  const [review, setReview] = useState({ name: "", rating: "", comment: "" });
  const { mealID } = useParams();

  useEffect(() => {
    const getMeal = async () => {
      const response = await fetch(`/api/meals/${searchTitle}`);
      const data = await response.json();
      setMeal(data);
      setAvailableSpots(data.available_reservations);
    };
    getMeal();
  }, [mealID]);

  const handleSearch = (event) => {
    setSearchTitle(event.target.value);
  };

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
          mealId: meal.id,
        }),
      });

      if (response.ok) {
        alert("Reservation created successfully!");
        setReservation({});
        setAvailableSpots(availableSpots - 1);
        setMeal({
          ...meal,
          available_reservations: meal.available_reservations - 1,
        });
      } else {
        alert("Error creating reservation.");
      }
    } else {
      alert("No available spots for this meal.");
    }
  };

  const handleReviewSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch("/api/reviews", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(review),
    });

    if (response.ok) {
      alert("Review created successfully!");
      setReview({ name: "", rating: "", comment: "" });
    } else {
      alert("Error creating review.");
    }
  };

  return (
    <>
      <div>
        <h2>Hello{meal.title}</h2>
        <p>Price: {meal.price}</p>
        <p>Max Reservations: {meal.maxReservations}</p>
        <p>Available Reservations: {availableSpots}</p>
      </div>

      <form onSubmit={handleReservation}>
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

      <form onSubmit={handleReviewSubmit}>
        <h3>Leave a Review</h3>
        <label>
          Name:
          <input
            type="text"
            value={review.name}
            onChange={(e) => setReview({ ...review, name: e.target.value })}
            required
          />
        </label>
        <br />
        <label>
          Rating:
          <input
            type="number"
            value={review.rating}
            onChange={(e) => setReview({ ...review, rating: e.target.value })}
            required
          />
        </label>
        <br />
        <label>
          Comment:
          <textarea
            value={review.comment}
            onChange={(e) => setReview({ ...review, comment: e.target.value })}
            required
          />
        </label>
        <br />
        <button type="submit">Submit Review</button>
      </form>
    </>
  );
};

export default Meal;
