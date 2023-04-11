import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./App.css";


function App() {
  const [meals, setMeals] = useState([]);
  const [searchTitle, setSearchTitle] = useState("");

  useEffect(() => {
    const fetchMeals = async () => {
      const res = await fetch("./api/meals");
      const data = await res.json();
      console.log(data)
      setMeals(data);
    };

    fetchMeals();
  }, []);

  const handleTitleChange = (event) => {
    setSearchTitle(event.target.value);
  };

  const filteredMeals = meals.filter(
    (meal) =>
      meal.title.toLowerCase().includes(searchTitle.toLowerCase()) ||
      meal.description.toLowerCase().includes(searchTitle.toLowerCase())
  );

  return (
    <div className="homepage-container">
      <h1>MealSharing App</h1>
      <p>This project is for HYF Denmark</p>
      <div className="homepage-mealCard">
        <input
          type="text"
          placeholder="Search by title"
          value={searchTitle}
          onChange={handleTitleChange}
        />
        {filteredMeals.slice(0, 3).map((meal) => (
          <div key={meal.mealID}>
            <h3>{meal.title}</h3>
            <p>{meal.description}</p>
            <p>{meal.price}</p>
          </div>
        ))}
      </div>
      <Link className="links" to="/meals">See more</Link>
      <footer>This is a HackYourFuture Denmark project</footer>
    </div>
  );
}

export default App;
