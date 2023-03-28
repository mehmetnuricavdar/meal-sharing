import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import MealsList from "./components/MealsList";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Meals App</h1>
      </header>
      <main>
        <MealsList />
      </main>
    </div>
  );
}

export default App;

