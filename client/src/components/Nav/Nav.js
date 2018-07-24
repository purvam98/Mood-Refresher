import React, { Component } from "react";
import "./Nav.css";
import { Modal, Button, OverlayTrigger, Popover, Tooltip } from 'react-bootstrap';

class Nav extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.state = {
      show: false
    };
  }
  
  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }
  render() {
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
            <a className="nav-link" href="#"><font className="textcolor"><b>Contact</b></font></a>
          </li>
        </ul>
        {/* <form className="form-inline my-2 my-lg-0">
          <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
          <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
        </form> */}
        <Button bsStyle="primary" bsSize="large" onClick={this.handleShow}>
          My Stuff
        </Button>
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4>Text in a modal</h4>
            <p>
              Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            </p>

            <hr />

            <h4>Overflowing text to show scroll behavior</h4>
            <p>
              Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
              dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta
              ac consectetur ac, vestibulum at eros.
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.props.onClick}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    </nav>
  )
}
};
// const buttonsInstance = (
//   <ButtonToolbar>{BUTTONS.map(renderDropdownButton)}</ButtonToolbar>
// );

export default Nav;