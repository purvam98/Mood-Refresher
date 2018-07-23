import React from "react";
import "./Nav.css";

const Nav = () => (
<nav className="navbar navbar-expand-lg navbar-light navhead">
<a className="navbar-brand" href="#"><font className="textcolor"><b>Mood Refresher</b></font></a>
<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
  <span className="navbar-toggler-icon"></span>
</button>

<div className="collapse navbar-collapse" id="navbarSupportedContent">
  <ul className="navbar-nav mr-auto">
    <li className="nav-item">
      <a className="nav-link" href="/Login"><font className="textcolor"><b>Login</b></font></a>
    </li>
    <li className="nav-item">
      <a className="nav-link" href="/Register"><font className="textcolor"><b>register</b></font></a>
    </li>
    <li className="nav-item">
      <a className="nav-link" href="#"><font className="textcolor"><b>About</b></font></a>
    </li>
    <li className="nav-item">
      <a className="nav-link" href="#"><font className="textcolor"><b>Contact</b></font></a>
    </li>
  </ul>
  <form className="form-inline my-2 my-lg-0">
    <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
    <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
  </form>
</div>
</nav>
);

export default Nav;
