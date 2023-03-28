import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import App from "./App";
import Meal from "./components/Meal";
import MealsList from "./components/MealsList";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Switch>
        <Route exact path="/" component={App} />
        <Route exact path="/meals" component={MealsList} />
        <Route exact path="/meals/:id" component={Meal} />
      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
