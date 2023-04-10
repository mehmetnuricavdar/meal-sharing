import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function Reviews() {
  const [reviews, setReviews] = useState([]);
  const {mealID} = useParams()

  useEffect(() => {
    const fetchReviews = async () => {
      ("./api/reviews");
      try {
        const response = await fetch(`./api/reviews/${mealID}`);
        const data = await response.json();
        console.log(mealID)
        console.log(data)
        setReviews(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchReviews();
  }, []);

  return (
    <div className="reviews-card">
      <h2>Reviews</h2>
      {reviews.map((review) => (
        <div key={review.reviewID}>
          <p>{review.comment}</p>
          <p>{review.reviewer_name}</p>
          <p>Rating: {review.rating} ⭐️</p>
        </div>
      ))}
    </div>
  );
}

export default Reviews;
