import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

function MealsList() {
  const [meals, setMeals] = useState([]);
  const [searchTitle, setSearchTitle] = useState("");
  const [displayedMeals, setDisplayedMeals] = useState([]);
  const { search } = useLocation();

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
    let filteredMeals = meals;

    if (searchTitle) {
      filteredMeals = meals.filter((meal) => {
        const title = meal.title.toLowerCase();
        const search = searchTitle.toLowerCase();
        return title.includes(search);
      });
    }

    const params = new URLSearchParams(search);
    const sortKey = params.get("sortKey") || "price";
    const sortDir = params.get("sortDir") || "asc";

    filteredMeals.sort((a, b) => {
      if (a[sortKey] < b[sortKey]) {
        return sortDir === "asc" ? -1 : 1;
      } else if (a[sortKey] > b[sortKey]) {
        return sortDir === "asc" ? 1 : -1;
      } else {
        return 0;
      }
    });

    setDisplayedMeals(filteredMeals);
  }, [meals, searchTitle, search]);

  const handleTitleChange = (event) => {
    const value = event.target.value;
    setSearchTitle(value);
  };

  const getSortUrl = (sortKey) => {
    const params = new URLSearchParams(search);
    const currentSortKey = params.get("sortKey") || "price";
    const currentSortDir = params.get("sortDir") || "asc";
    let sortDir = "asc";
    if (sortKey === currentSortKey) {
      sortDir = currentSortDir === "asc" ? "desc" : "asc";
    }
    params.set("sortKey", sortKey);
    params.set("sortDir", sortDir);
    return `/meals?${params.toString()}`;
  };

  return (
    <>
      <nav>
        <Link className="links-nav" to={`/`}>
          Home
        </Link>{" "}
        <input
          className="search-bar"
          type="text"
          placeholder="Search by title"
          value={searchTitle}
          onChange={handleTitleChange}
        />
      </nav>
      <div className="sorting-container">
        <h4>Sort by:</h4>
        <div className="sorting">
          <div>
            <a href={getSortUrl("title")}>Title</a>
          </div>
          <div>
            <a href={getSortUrl("description")}>Description</a>
          </div>
          <div>
            <a href={getSortUrl("price")}>Price</a>
          </div>
        </div>
      </div>
      <div className="meals-container">
        {displayedMeals.map((meal) => (
          <div key={meal.mealID} className="meal-card">
            <h3>{meal.title}</h3>
            <p>{meal.description}</p>
            <p>{meal.price} EUR</p>
            <Link className="links" to={`/meals/${meal.mealID}`}>
              View Details
            </Link>
          </div>
        ))}
      </div>
      <footer>This is a HackYourFuture Denmark project</footer>
    </>
  );
}
export default MealsList;
