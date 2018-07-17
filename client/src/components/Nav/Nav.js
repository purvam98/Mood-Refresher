import React from "react";
import "./Nav.css";

const Nav = () => (
<nav class="navbar navbar-expand-lg navbar-light navhead">
<a class="navbar-brand" href="#"><font className="textcolor"><b>Mood Refresher</b></font></a>
<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
  <span class="navbar-toggler-icon"></span>
</button>

<div class="collapse navbar-collapse" id="navbarSupportedContent">
  <ul class="navbar-nav mr-auto">
    <li class="nav-item">
      <a class="nav-link" href="#"><font className="textcolor"><b>Login</b></font></a>
    </li>

    <li class="nav-item">
      <a class="nav-link" href="#"><font className="textcolor"><b>About</b></font></a>
    </li>
    <li class="nav-item">
      <a class="nav-link" href="#"><font className="textcolor"><b>Contact</b></font></a>
    </li>
  </ul>
  <form class="form-inline my-2 my-lg-0">
    <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
    <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
  </form>
</div>
</nav>
);

export default Nav;
