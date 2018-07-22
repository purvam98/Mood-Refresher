import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import Nav from "./components/Nav";
import Moods from "./pages/Moods";
import Results from "./pages/Results";

const App = () => (
  <Router>
    <div>
    <Nav/>
    <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/moods/:zipcode" component={Moods} />
        <Route exact path="/results/:zipcode/:place" component={Results}/>
    </Switch>
    </div>
  </Router>
);

export default App;
