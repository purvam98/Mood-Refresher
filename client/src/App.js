import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import Nav from "./components/Nav";
import Moods from "./pages/Moods";

const App = () => (
  <Router>
    <div>
    <Nav/>
    <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/moods/:zipcode" component={Moods} />
    </Switch>
    </div>
  </Router>
);

export default App;
