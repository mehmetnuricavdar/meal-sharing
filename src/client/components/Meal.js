import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Reviews from "./Reviews";

const Meal = () => {
  const [meals, setMeal] = useState({});
  const [reservation, setReservation] = useState({});
  const [availableSpots, setAvailableSpots] = useState(0);
  const [review, setReview] = useState({ name: "", rating: "", comment: "" });
  const { mealID } = useParams();
  const [displayedMeals, setDisplayedMeals] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const response = await fetch(`./api/meals/${mealID}`);
        if (!response.ok) {
          throw new Error("Meal not found");
        }
        const data = await response.json();
        console.log(mealID);
        setMeal(data);
        setAvailableSpots(data.available_reservations);
      } catch (error) {
        console.error(error);
        setError(error.message);
      }
    };
    fetchMeals();
  }, [mealID]);

  useEffect(() => {
    if (meals.mealID) {
      setDisplayedMeals([meals]);
    }
  }, [meals]);
  console.log(displayedMeals);

  useEffect(() => {
    const fetchReview = async () => {
      try {
        const response = await fetch(`./api/reviews/${mealID}`);
        if (!response.ok) {
          throw new Error("Review not found");
        }
      } catch (error) {
        console.error(error);
        setError(error.message);
      }
    };fetchReview()
  }, [mealID]);

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
        setAvailableSpots(availableSpots - 1);
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
  };

  const handleReviewSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch(`/api/reviews/${mealID}`, {
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
      {error ? (
        <div>{error}</div>
      ) : (
        <div>
          {displayedMeals.map((meal) => (
            <div key={meal.mealID} className="meal-card">
              <h2>{meal.title}</h2>
              <p>Price: {meal.price} EUR</p>
              <p>Max Reservations: {meal.max_reservations}</p>
              <p>Available Reservations: {availableSpots}</p>
            </div>
          ))}
          <Reviews />
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
          <form onSubmit={handleReviewSubmit}>
            <h3>Leave a Review</h3>
            <label>Name:</label>
            <input
              type="text"
              value={review.name}
              onChange={(e) => setReview({ ...review, name: e.target.value })}
              required
            />

            <label>Rating: </label>

            <input
              type="number"
              value={review.rating}
              onChange={(e) => setReview({ ...review, rating: e.target.value })}
              required
            />
            <label>Comment: </label>
            <textarea
              value={review.comment}
              onChange={(e) =>
                setReview({ ...review, comment: e.target.value })
              }
              required
            />
            <button type="submit">Submit Review</button>
          </form>
        </div>
      )}

      <Link to="/meals">Back to Meals</Link>
      <footer>This is a HackYourFuture Denmark project</footer>
    </>
  );
};

export default Meal;
