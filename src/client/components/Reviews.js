import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function Reviews() {
  const [reviews, setReviews] = useState([]);
  const { mealID } = useParams();
  const [review, setReview] = useState({ name: "", rating: "", comment: "" });

  useEffect(() => {
    const fetchReviews = async () => {
      ("./api/reviews");
      try {
        const response = await fetch(`./api/reviews/${mealID}`);
        const data = await response.json();
        setReviews(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchReviews();
  }, []);

  const handleReviewSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch(`/api/reviews/${mealID}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(review),
    });

    if (response.ok) {
      alert("Review created successfully!");
      setReview({ name: "", rating: "", comment: "" });
    } else {
      alert("Error creating review.");
    }
  };

  return (
    <>
      <div className="reviews-card">
        <h2>Reviews</h2>
        {reviews.map((review) => (
          <div key={review.reviewID}>
            <p>{review.comment}</p>
            <p>{review.reviewer_name}</p>
            <p>Rating: {`${"⭐️".repeat(review.rating)}`}</p>
          </div>
        ))}
      </div>
      <form onSubmit={handleReviewSubmit}>
        <h3>Leave a Review</h3>
        <label>Name:</label>
        <input
          type="text"
          value={review.name}
          onChange={(e) => setReview({ ...review, name: e.target.value })}
          required
        />

        <label>Rating: </label>

        <input
          type="number"
          value={review.rating}
          onChange={(e) => setReview({ ...review, rating: e.target.value })}
          required
        />
        <label>Comment: </label>
        <textarea
          value={review.comment}
          onChange={(e) => setReview({ ...review, comment: e.target.value })}
          required
        />
        <button type="submit">Submit Review</button>
      </form>
    </>
  );
}

export default Reviews;
