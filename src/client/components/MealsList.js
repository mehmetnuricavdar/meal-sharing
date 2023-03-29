import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Meal from "./Meal";

function MealsList() {
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    const fetchMeals = async () => {
      const res = await fetch("/api/meals");
      const data = await res.json();
      setMeals(data);
    };

    fetchMeals();
  }, []);

  return (
    <>
      <h1>All Meals</h1>

      {meals.map((meal) => (
        <div className="meal-card" key={meal.mealID}>
          <Link to={`/meals/${meal.mealID}`}>
            <h3>{meal.title}</h3>
            <p>{meal.description}</p>
            <p>{meal.price} DKK</p>
          </Link>
          <Meal key={meal.mealID} meal={meal} />
        </div>
      ))}

      <footer>Hack Your Future Denmark MealSharing App HomeWork</footer>
    </>
  );
}

export default MealsList;
