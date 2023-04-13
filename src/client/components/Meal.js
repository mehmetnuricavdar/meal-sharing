import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const Meal = () => {
  const [meal, setMeal] = useState({});
  const [reservation, setReservation] = useState({});
  const [isAvailable, setIsAvailable] = useState(false);
  const { mealID } = useParams();
  const [review, setReview] = useState({ name: "", rating: "", comment: "" });

  useEffect(() => {
    const getMeal = async () => {
      const response = await fetch(`/api/meals/${mealID}`);
      const data = await response.json();
      setMeal(data);
      setIsAvailable(data.available_reservations > 0);
    };
    getMeal();
  }, [mealID]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setReservation({ ...reservation, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch("/api/reservations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...reservation,
        id: meal.id,
      }),
    });

    if (response.ok) {
      alert("Reservation created successfully!");
      setReservation({});
      setIsAvailable(meal.available_reservations - 1 > 0);
      setMeal({
        ...meal,
        available_reservations: meal.available_reservations - 1,
      });
    } else {
      alert("Error creating reservation.");
    }
  };

  const handleReviewSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch("/api/review", {
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
      {isAvailable ? (
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            name="name"
            value={reservation.name || ""}
            onChange={handleChange}
          />
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            name="email"
            value={reservation.email || ""}
            onChange={handleChange}
          />
          <label htmlFor="phone">Phone:</label>
          <input
            type="tel"
            name="phone"
            value={reservation.phone || ""}
            onChange={handleChange}
          />
          <button type="submit">Book seat</button>
        </form>
      ) : (
        <p>No available reservations for this meal.</p>
      )}
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
