import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Reviews from "./Reviews";
import Reservations from "./Reservations";

const Meal = () => {
  const [meals, setMeal] = useState({});
  const [availableSpots, setAvailableSpots] = useState(0);
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
        setMeal(data);
        setAvailableSpots(
          (prevAvailableSpots) => prevAvailableSpots - data.guest_count
        );
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

  const encodedTitle = encodeURIComponent(meals.title);
  const imageUrl = `https://source.unsplash.com/150x200/?${encodedTitle}`;

  return (
    <>
      {error ? (
        <div>{error}</div>
      ) : (
        <div className="meal-container">
          {displayedMeals.map((meal) => (
            <div key={meal.mealID} className="meal-card">
              <img src={imageUrl} alt={meal.title} className="meal-image" />
              <h2>{meal.title}</h2>
              <p>Price: {meal.price} EUR</p>
              <p>Max Reservations: {meal.max_reservations}</p>
              <p>Available Reservations: {availableSpots}</p>
            </div>
          ))}
          <Reviews />
          <Reservations />
        </div>
      )}

      <Link className="links" to="/meals">
        Back to Meals
      </Link>
      <footer>This is a HackYourFuture Denmark project</footer>
    </>
  );
};

export default Meal;
