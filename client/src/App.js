import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import home from "./pages/home";

const App = () => (
  <Router>
    <div>
        <Route exact path="/" component={home} />
    </div>
  </Router>
);

export default App;
