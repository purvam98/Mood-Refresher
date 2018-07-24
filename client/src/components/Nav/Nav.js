import React, { Component } from "react";
import "./Nav.css";
import ReactDOM from 'react-dom';
//import { Modal, Button, OverlayTrigger, Popover, Tooltip } from 'react-bootstrap';
import ReactModal from 'react-modal';
import API from "../../utils/API";

class Nav extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.state = {
      show: false,
      logged: false,
      id: ''
    };
  }

  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }
  render() {
    console.log(this.state.show)
    return (
      <nav className="navbar navbar-expand-lg navbar-light navhead">
        <a className="navbar-brand" href="/"><font className="textcolor"><b>Mood Refresher</b></font></a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              {!this.props.logged && <a className="nav-link" href="/Login"><font className="textcolor"><b>login</b></font></a>}
              {this.props.logged && <a className="nav-link" href="/Login"><font className="textcolor"><b>logout</b></font></a>}
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/Register"><font className="textcolor"><b>Register</b></font></a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#"><font className="textcolor"><b>About</b></font></a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#"><font className="textcolor"><b>{this.props.id}</b></font></a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href={"/users/auth/" + this.props.id}><font className="textcolor"><b>my page</b></font></a>
            </li>
          </ul>
          {/* <form className="form-inline my-2 my-lg-0">
          <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
          <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
        </form> */}
          <button type="button" bsStyle="primary" bsSize="large" onClick={this.handleShow}>
            My Stuff
        </button>
          <div className="static-modal">
            <ReactModal
              isOpen={this.state.show}
              contentLabel="Minimal Modal Example"
              ariaHideApp={false}
            >
              {/* {this.state.weekday_text[0]}   */}

              {/* <button align="center" onClick={this.handleCloseModal}>Close Modal</button> */}

              <div className="col-md-12 text-center">
                <button onClick={this.handleClose} type="button" className="btn btn-primary">Close</button>
                &nbsp;

                </div>
            </ReactModal>
          </div>
        </div>
      </nav>
    )
  }
};
// const buttonsInstance = (
//   <ButtonToolbar>{BUTTONS.map(renderDropdownButton)}</ButtonToolbar>
// );

export default Nav;