import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function MealsList() {
  const [meals, setMeals] = useState([]);
  const [searchTitle, setSearchTitle] = useState("");
  const [displayedMeals, setDisplayedMeals] = useState([]);

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const res = await fetch("/api/meals");
        const data = await res.json();

        setMeals(data || []);
      } catch (error) {
        console.log(error);
      }
    };
    fetchMeals();
  }, []);
  useEffect(() => {
    setDisplayedMeals(meals);
  }, [meals]);

  const handleTitleChange = (event) => {
    const value = event.target.value;
    console.log(value);
    setSearchTitle(value);
    console.log("searchTitle:", value);

    const filteredMeals = meals.filter((meal) => {
      const title = meal.title.toLowerCase();
      const search = value.toLowerCase();
      return title.includes(search);
    });
    console.log("filteredMeals:", filteredMeals);
    setDisplayedMeals(filteredMeals);
  };
  return (
    <>
      <input
        type="text"
        placeholder="Search by title"
        value={searchTitle}
        onChange={handleTitleChange}
      />
      <div className="meals-container">
        {displayedMeals.map((meal) => (
          <div key={meal.mealID} className="meal-card">
            <h3>{meal.title}</h3>
            <p>{meal.description}</p>
            <p>{meal.price} EUR</p>
            <Link to={`/meals/${meal.mealID}`}>View Details</Link>
          </div>
        ))}
      </div>
      <footer>This is a HackYourFuture Denmark project</footer>
    </>
  );
}

export default MealsList;
