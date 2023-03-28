import React, { useState, useEffect } from "react";

function MealsList() {
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    async function fetchMeals() {
      const response = await fetch("/api/meals");
      const data = await response.json();
      setMeals(data);
    }
    fetchMeals();
  }, []);

  return (
    <div>
      {meals.map((meal) => (
        <div key={meal.id}>
          <h3>{meal.title}</h3>
          <p>{meal.description}</p>
          <p>Price: ${meal.price}</p>
        </div>
      ))}
    </div>
  );
}

export default MealsList;
