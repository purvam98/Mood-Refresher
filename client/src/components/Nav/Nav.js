import React from "react";
import "./Nav.css";
import { SplitButton, MenuItem } from 'react-bootstrap';;

const Nav = (props) => {
  const { logged } = props;
  console.log(props.logged)
  return (
<nav className="navbar navbar-expand-lg navbar-light navhead">
<a className="navbar-brand" href="/"><font className="textcolor"><b>Mood Refresher</b></font></a>
<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
  <span className="navbar-toggler-icon"></span>
</button>

<div className="collapse navbar-collapse" id="navbarSupportedContent">
  <ul className="navbar-nav mr-auto">
    <li className="nav-item">
    {!props.logged && <a className="nav-link" href="/Login"><font className="textcolor"><b>login</b></font></a>}
    {props.logged && <a className="nav-link" href="/Login"><font className="textcolor"><b>logout</b></font></a>}
    </li>
    <li className="nav-item">
      <a className="nav-link" href="/Register"><font className="textcolor"><b>Register</b></font></a>
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
  <SplitButton
      bsStyle="my stuff"//{title.toLowerCase()}
      title="my stuff"//{title}
      key={1}
      id={`split-button-basic-${1}`}
    >
      <MenuItem eventKey="1">Action</MenuItem>
      <MenuItem eventKey="2">Another action</MenuItem>
      <MenuItem eventKey="3">Something else here</MenuItem>
      <MenuItem divider />
      <MenuItem eventKey="4">Separated link</MenuItem>
    </SplitButton>
</div>
</nav>
  )
};
// const buttonsInstance = (
//   <ButtonToolbar>{BUTTONS.map(renderDropdownButton)}</ButtonToolbar>
// );

export default Nav;