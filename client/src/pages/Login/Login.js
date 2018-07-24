import React, { Component } from "react";
import Nav from "../../components/Nav";
import { Redirect } from 'react-router';
import { Input, FormBtn } from "../../components/Form";
import API from "../../utils/API";
import { Col, Row, Container } from "../../components/Grid";

class Login extends Component {
  state = {
    email: "",
    password: "",
    logged: "",
    id: ""
  };

  componentDidMount() {
    this.auth();
  };
  auth = () => {
    API.authenticate().then(res =>
      this.setState({ logged: res.data.success }),
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
    if (this.state.email && this.state.password) {
      API.login({
        email: this.state.email,
        password: this.state.password
      }).then(res =>

        {
          this.setState({ password: "", email: "" })
          if (res.status === 200){ 
            console.log(res.data)
            this.setState({ id: res.data, redirect: 200 })
          // or <Redrect to="/thankyou" /> if you are using react-router
        } else {
          this.setState({ redirect: 403 })
        }
        })
        .catch(err => console.log(err));
    }
  };

  render() {
    if (this.state.redirect === 200){ 
      console.log(this.state.redirect)
      return <Redirect to={"/"} />
      // "/books/" + book._id
      // or <Redrect to="/thankyou" /> if you are using react-router
    } else if (this.state.redirect === 403) {
      return <Redirect to="/login" />
    }

    return (
            <div>
            <Nav logged={this.state.logged}/>
            <Container fluid>
              <br />
              <br />
              <br />
              <form>
                <Row>
                <Col size="md-12">
                    <div className="row align-items-center justify-content-center">
                      <div className="col-md-4">
                    <h3 className="title">Login</h3>
                    </div>
                    </div>
                  </Col>
                  <Col size="md-12">
                    <div className="row align-items-center justify-content-center">
                      <div className="col-md-4">
                        <Input
                          value={this.state.email}
                          onChange={this.handleInputChange}
                          name="email"
                          placeholder="email (required)"
                        />
                      </div>
                    </div>
                  </Col>
                  <Col size="md-12">
                    <div className="row align-items-center justify-content-center">
                      <div className="col-md-4">
                        <Input
                          value={this.state.password}
                          onChange={this.handleInputChange}
                          name="password"
                          placeholder="password (required)"
                        />
                      </div>
                    </div>
                  </Col>
                  <Col size="md-12">
                    <div className="row align-items-center justify-content-center">
                      <div className="col-md-4">
                        <FormBtn
                          disabled={!(this.state.email && this.state.password)}
                          onClick={this.handleFormSubmit}
                        >
                          Login
                    </FormBtn>
                      </div>
                    </div>
                  </Col>
                </Row>
              </form>
      
            </Container>
            </div>
    );
  }
}

export default Login;
