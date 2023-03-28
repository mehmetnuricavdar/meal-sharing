import React, { useState } from "react";
import { useParams } from "react-router-dom";

const Meal = ({ meal }) => {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [date, setDate] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/meals/${id}/reservations`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, date }),
      });
      const data = await response.json();
      console.log("Reservation created:", data);
      // Reset form fields
      setName("");
      setEmail("");
      setDate("");
    } catch (error) {
      console.error("Error creating reservation:", error);
    }
  };

  return (
    <div className="meal-details">
      <h2>Meal Details</h2>
      <div className="meal-card"></div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label htmlFor="email">Email:</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="date">Date:</label>
        <input
          id="date"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <button type="submit">Create Reservation</button>
      </form>
    </div>
  );
};

export default Meal;
