import React, { Component } from "react";
import "./Nav.css";
import ReactDOM from 'react-dom';
//import { Modal, Button, OverlayTrigger, Popover, Tooltip } from 'react-bootstrap';
import { Col, Row, Container } from "../../components/Grid";
import ReactModal from 'react-modal';
import API from "../../utils/API";
import { ButtonGroup, ButtonToolbar, Button } from 'react-bootstrap'

const appElement = document.getElementById('example');

ReactModal.setAppElement(appElement);

class Nav extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.state = {
      show: false,
      logged: '',
      id: '',
      details: [],
      photo_d: '',
      weekday_text: [],
      reviews: [],
      detsclick: false
    };
  }

  handleDetails = (id) => {
    API.getPlacesDetails(id)
      .then((res) => {
        this.setState({ details: res.data });
        this.setState({ weekday_text: "-" });
        this.setState({ reviews: "-" });
        this.setState({ photo_d: "-" });
        this.setState({ detsclick: true });
        switch (true) {
          case this.state.details.hasOwnProperty('opening_hours'):
            this.setState({ weekday_text: this.state.details.opening_hours.weekday_text })
          case this.state.details.hasOwnProperty('reviews'):
            this.setState({ reviews: this.state.details.reviews });
          case this.state.details.hasOwnProperty('photos'):
            this.setState({ photo_d: this.state.details.photos[0].photo_reference });
        }
      });
  };

  handleClose() {
    this.setState({ show: false });
  }

  logout = () => {
    API.logout()
  }

  handleShow() {
    this.setState({ show: true });
  }
  render() {
    const customStyles = {
      content: {
        height: '200 px', // <-- This sets the height
        width: '200 px',
        overlfow: 'hidden' // <-- This tells the modal to scrol
      }
    };
    return (
      <nav className="navbar navbar-expand-lg navbar-light navhead">
        <a className="navbar-brand" href="/"><font className="textcolor"><b>Mood Refresher</b></font></a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              {!this.props.logged && <a className="nav-link" href="/login"><font className="textcolor"><b>Login</b></font></a>}
              {this.props.logged && <a className="nav-link" href="" onClick={this.logout}><font className="textcolor"><b>Logout</b></font></a>}
            </li>
            {!this.props.logged && <li className="nav-item">
              <a className="nav-link" href="/Register"><font className="textcolor"><b>Register</b></font></a>
            </li>}
            <li className="nav-item">
              <a className="nav-link" href="/"><font className="textcolor"><b>About</b></font></a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/"><font className="textcolor"><b>Contact</b></font></a>
            </li>
          </ul>
          <h3></h3>
          {this.props.logged && <Button type="button" onClick={this.handleShow}>
            My Stuff
        </Button>}
          <div className="static-modal" style={{ overflowX: 'none' }}>
            <ReactModal isOpen={this.state.show} contentLabel="Minimal Modal Example" ariaHideApp={false} style={{ customStyles }}>
              <div className="modal-content">
                <div className="modal-header">
                  <h4 className="modal-title">My Faves</h4>
                  <button type="button" className="close" onClick={this.handleModalCloseRequest}>
                    <span aria-hidden="true">&times;</span>
                    <span className="sr-only">Close</span>
                  </button>
                </div>
                <div className="modal-body">
                  {this.props.logged && !this.state.detsclick && this.props.places.map(place => (
                    <Row key={place.id} style={{ overflowX: 'none' }}>
                      <div className="div" style={{ height: '250px', width: '100%', flexDirection: 'row', flex: '1' }}>
                        <h3 className="title middle">{place.name}</h3>
                        <div style={{ flexDirection: 'row', flex: '1', flexWrap: 'wrap' }}>
                          <Row>
                            <Col size="md-3">
                              <img className="img_middle" src={place.photos !== "oops" ? "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=" + place.photos + "&key=AIzaSyBWGS0HJ1QdcEcm-bQKWv_gkpww3u88Ge4" : require(`./not-found.png`)} width="150px" />
                            </Col>
                            <Col size="md-8">
                              <div style={{ flex: '1' }}>
                                <span style={{ flex: '1', paddingLeft: '15px', paddingBlockEnd: 'auto' }}>{place.address}</span><br></br>
                                <span style={{ flex: '1', paddingLeft: '15px' }}>Rating: {place.rating}</span>
                              </div>
                              <button align="middle" onClick={() => this.handleDetails(place.place_id)} type="button" className="btn btn-primary button_details" style={{ margin: '0 auto' }}>More Details</button>
                            </Col>
                          </Row>
                        </div>
                      </div>
                    </Row>
                  ))}
                  {this.props.logged && this.state.detsclick && <div>
                    <Row>
                      <Col size="md-12" align="center">
                        <h2 className="title" align="center">{this.state.details.name}</h2>
                      </Col>
                      <Col size="md-12" align="center">
                        <h3 className="title middle size"><b>{this.state.details.formatted_address}</b></h3>
                      </Col>

                      <Col size="md-4">
                        <h3 className="title middle size"><b>Rating:</b>{this.state.details.rating}</h3>
                      </Col>
                      <Col size="md-4">
                        <h3 className="title middle size"><b>Phone Number:</b>{this.state.details.formatted_phone_number}</h3>
                      </Col>
                      <Col size="md-4">
                        <h3 className="title middle size"><b>Website:</b><a href={this.state.details.website} target="_blank">{this.state.details.website}</a></h3>
                      </Col>


                      <Col size="md-12" align="center">
                        <h6 className="middle"><b>{this.state.weekday_text[0]} </b></h6>
                        <h6 className="middle"><b>{this.state.weekday_text[1]} </b></h6>
                        <h6 className="middle"><b>{this.state.weekday_text[2]} </b></h6>
                        <h6 className="middle"><b>{this.state.weekday_text[3]} </b></h6>
                        <h6 className="middle"><b>{this.state.weekday_text[4]} </b></h6>
                        <h6 className="middle"><b>{this.state.weekday_text[5]} </b></h6>
                        <h6 className="middle"><b>{this.state.weekday_text[6]} </b></h6>

                      </Col>
                      <Col size="md-12" align="center">
                        <div className="col-md-12 text-center">
                          <br />
                          <img className="img_middle" align="middle" src={this.state.photo_d !== "-" ? "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=" + this.state.photo_d + "&key=AIzaSyBWGS0HJ1QdcEcm-bQKWv_gkpww3u88Ge4" : require(`./not-found.png`)} width="400px" height="200px" />
                          <br />
                          <br />
                          <button type="button" className="btn btn-primary" onClick={this.nextpitcure}>Next</button>
                        </div>
                      </Col>
                      <br />
                      <br />
                      <Col size="md-12" align="center">
                        <br />
                        <h2 className="title" align="center">Reviews</h2>
                      </Col>
                      <br />
                      <Col size="md-4">
                        <h6 className="middle"><b>Name:</b>{this.state.details.reviews[0].author_name}</h6>
                        <h6 className="middle"><b>Rating:</b>{this.state.details.reviews[0].rating}</h6>
                        <h6 className="middle"><b>Text:</b>{this.state.details.reviews[0].text}</h6>
                      </Col>
                      <Col size="md-4">
                        <h6 className="middle"><b>Name:</b>{this.state.details.reviews[1].author_name}</h6>
                        <h6 className="middle"><b>Rating:</b>{this.state.details.reviews[1].rating}</h6>
                        <h6 className="middle"><b>Text:</b>{this.state.details.reviews[1].text}</h6>
                      </Col>
                      <Col size="md-4">
                        <h6 className="middle"><b>Name:</b>{this.state.details.reviews[2].author_name}</h6>
                        <h6 className="middle"><b>Rating:</b>{this.state.details.reviews[2].rating}</h6>
                        <h6 className="middle"><b>Text:</b>{this.state.details.reviews[2].text}</h6>
                      </Col>
                    </Row>
                  </div>
                  }
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={this.handleClose}>Close</button>
                </div>
              </div>
            </ReactModal>
          </div>
        </div>
      </nav>
    )
  }
};

export default Nav;