import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function App() {
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    const fetchMeals = async () => {
      const res = await fetch("/meals");
      const data = await res.json();
      setMeals(data);
    };

    fetchMeals();
  }, []);

  return (
    <div>
      <h1>Page Title</h1>
      <p>Subtitle</p>
      <div>
        {meals.slice(0, 3).map((meal) => (
          <div key={meal.mealID}>
            <h3>{meal.title}</h3>
            <p>{meal.description}</p>
            <p>{meal.price}</p>
          </div>
        ))}
      </div>
      <Link to="/meals">See more</Link>
      <footer>Footer</footer>
    </div>
  );
}

export default App;
