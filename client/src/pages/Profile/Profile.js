import React, { Component } from "react";
//import { Link } from "react-router-dom";
import { Redirect } from 'react-router';
import { List, ListItem } from "../../components/List";
import { Col, Row, Container } from "../../components/Grid";
//import { Input, TextArea, FormBtn } from "../../components/Form";
import API from "../../utils/API";

class Login extends Component {
  state = {
    places: [],
    status: ''
  };

  componentDidMount() {
    API.getProfile(this.props.match.params.id)
      .then(res => {
        console.log(res)
        if (res.status === 200) {
          this.setState({ status: 200 })
          this.setState({ places: res.data })
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
  }

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.email && this.state.password) {
      API.login({
        email: this.state.email,
        password: this.state.password
      }).then(res => {
        this.setState({ password: "", email: "" })
        console.log(res)
        if (res.status === 200) {
          this.setState({ redirect: 200 })
          // or <Redrect to="/thankyou" /> if you are using react-router
        }
      })
        .catch(err => console.log(err));
    }
  };

  render() {
    if (this.state.status === 403) {
      return <Redirect to="/login" />
    }

    return (

      <Container fluid>
        <List>
          {this.state.places.map(place => (
            <ListItem key={place.id}>
              <Row>
                <Col size="md-2">
                <img style={{ width: '150px', float: 'left' }} src={place.photos !== "oops" ? "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=" + place.photos + "&key=AIzaSyBWGS0HJ1QdcEcm-bQKWv_gkpww3u88Ge4" : require(`../Results/not-found.png`)} />
                </Col>
                <Col size="md-5">
                <div className="place info" style={{ padding: '15px'}}>
                  <div style={{fontSize: '2em'}}>{place.name}</div>
                  <div>{place.address}</div>
                </div>
                </Col>
                <Col size="md-4">
                <button style={{float: 'right'}} onClick={() => this.handleDetails(place.place_id)}>Remove from saves 🗙</button>
                </Col>
              </Row>
            </ListItem>
          ))}
        </List>
      </Container>
    );
  }
}

export default Login;
