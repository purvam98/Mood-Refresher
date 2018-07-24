import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import Nav from "./components/Nav";
import Moods from "./pages/Moods";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Results from "./pages/Results";
import NoMatch from "./pages/NoMatch";

const App = () => (
  <Router>
    <div>
    <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/Register" component={Register} />
        <Route exact path="/Login" component={Login} />
        <Route exact path="/moods/:zipcode" component={Moods} />
        <Route exact path="/results/:zipcode/:place" component={Results}/>
        <Route ecact path="/users/auth/:id" component={Profile} />
        <Route component={NoMatch} />
    </Switch>
    </div>
  </Router>
);

export default App;
