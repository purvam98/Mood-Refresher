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
import { Redirect } from 'react-router';
import { FormGroup, Form, Button, ControlLabel, FormControl } from 'react-bootstrap'

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
    console.log(this.state.zipcode)
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
    // if (this.state.zipcode) {
    //   return <Redirect to={"/Moods/" + this.state.zipcode} />
    // }
    return (
      <div>
        <Nav logged={this.state.logged} id={this.state.id} places={this.state.places} />

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
            <Col size="md-4">
            </Col>
            <Col size="md-7">
              {/* <Form>
                <FormGroup controlId="formInlineEmail">
                  <ControlLabel>Zipcode</ControlLabel>{' '}
                  <FormControl value={this.state.zipcode} type="text" placeholder="Enter Zip" />
                </FormGroup>{' '}
                <Button type="submit" onSubmit={this.handleInputChange}>Find Yo Moods</Button>
              </Form> */}
              <form style={{width: '100%'}}>
              <Row style={{margin: '0px'}}>
              <Col size="md-4" style={{margin: '0px'}}>
                <Input
                  value={this.state.zipcode}
                  onChange={this.handleInputChange}
                  name="zipcode"
                  placeholder="Enter the ZipCode"
                  style={{width: '100%', height: '40px', lineHeight: '20px', fontSize: '20px', padding: '5px', width: 'auto', float: 'left'}}

                />
                </Col>
                <Col size="md-4">
                <a
                  href={"/Moods/" + this.state.zipcode}
                  className="button"
                  style={{height: '40px', margin: '0px', lineHeight: '20px', fontSize: '20px', float: 'left', justifyContent: 'center', alignItems: 'center'}}
                >
                  Submit
              </a>
              </Col>
              </Row>
              </form>
            </Col>

          </Row>
        </Container>
      </div >
    );
  }
}

export default App;
