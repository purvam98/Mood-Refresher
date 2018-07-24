import React, { Component } from "react";
import logo from '../../logo.svg';
import header from './title.gif';
import '../../App.css';
import Nav from "../../components/Nav";
import { List, ListItem } from "../../components/List";
import API from "../../utils/API";
import { Col, Row, Container } from "../../components/Grid";
import { Input, TextArea, FormBtn } from "../../components/Form";
import { Link } from "react-router-dom";

class App extends Component {

  state = {
    logged: "",
    zipcode: "",
    show: false,
    id: "",
    places: [],
    status: ""
  };

  componentDidMount() {
    this.getProfile();
  }

  getProfile() {
    API.getProfile()
      .then(res => {
        if (res.status === 200) {
          this.setState({ status: 200 })
          this.setState({ logged: res.data.success, id: res.data.id, places: res.data.places })
        } else {
          this.setState({ status: 403 })
        }
      }
      ).catch(err => {
        if (err.response.status === 403) {
          this.setState({ status: 403 })
        }
      }
      );
  };

  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };
  handleFormSubmit = event => {
    event.preventDefault();

  };
  doit = (log) => {
    console.log(log)
    const logged = log;
    return logged
  }

  render() {

    return (
      <div>
        <Nav logged={this.state.logged} id={this.state.id} places={this.state.places}/>

        <Container fluid>
          <br />
          <br />
          <br />
          <Row>
            <Col size="md-4">
            </Col>
            <Col size="md-6">
              <img src={header} />
            </Col>

          </Row>
          <Row>
            <Col size="md-3">
            </Col>
            <Col size="md-1">
            </Col>
            <Col size="md-4 ">
              <h3 className="title">Enter Your Zipcode to refresh your  Mood</h3>
            </Col>

          </Row>

          <Row>
            <Col size="md-5">
            </Col>
            <Col size="md-2">
              <form>

                <Input
                  value={this.state.zipcode}
                  onChange={this.handleInputChange}
                  name="zipcode"
                  placeholder="Enter the ZipCode"
                />
                <a
                  href={"/Moods/" + this.state.zipcode}
                  className="button"
                >
                  Submit
              </a>
              </form>
            </Col>

          </Row>
        </Container>
      </div>
    );
  }
}

export default App;
