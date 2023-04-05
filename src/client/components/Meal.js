import React from "react";

const Meal = ({ meal }) => {
  return (
    <div className="meal-card">
      <div className="meal-image-container">
     </div>
      <div className="meal-details">
        <h3>{meal.title}</h3>
        <p>{meal.description}</p>
        <p>Price: ${meal.price}</p>
      </div>
    </div>
  );
};

export default Meal;
