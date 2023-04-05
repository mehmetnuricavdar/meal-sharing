import React, { useState, useEffect } from "react";
import Meal from "./Meal";

const MealsList = () => {
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("/api/meals");
      const data = await response.json();
      setMeals(data);
    }
    fetchData();
  }, []);

  return (
    <div className="meals-list">
      {meals.map((meal) => (
        <Meal key={meal.id} meal={meal} />
      ))}
    </div>
  );
};

export default MealsList;
