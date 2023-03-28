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
    <div>
      <h1>All Meals</h1>
      <div className="meals-grid">
        {meals.map((meal) => (
          <div className="meal-card" key={meal.mealID}>
            <Meal key={meal.mealID} meal={meal} />
            <Link to={`/meals/${meal.mealID}`}>
              <h3>{meal.title}</h3>
              <p>{meal.description}</p>
              <p>{meal.price}</p>
            </Link>
          </div>
        ))}
      </div>
      <footer>Footer</footer>
    </div>
  );
}

export default MealsList;
