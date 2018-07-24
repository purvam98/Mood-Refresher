import React, { Component } from "react";
import logo from '../../logo.svg';
import header from './title.gif';
import '../../App.css';
import { List, ListItem } from "../../components/List";
import API from "../../utils/API";
import { Col, Row, Container } from "../../components/Grid";
import { Input, TextArea, FormBtn } from "../../components/Form";
import { Link } from "react-router-dom";
import Nav from "../../components/Nav";

class App extends Component {

  state = {
    logged: "",
    zipcode: ""

  };

  componentDidMount() {
    this.auth();
  }

  auth = () => {
    API.authenticate().then(res =>
      this.setState({ logged: res.data.success }),
      console.log(this.state.logged)
    )
      .catch(err => console.log(err));
  };

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
        <Nav logged={this.state.logged} />

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
