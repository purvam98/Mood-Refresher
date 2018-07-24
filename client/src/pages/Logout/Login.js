import React, { Component } from "react";
import Nav from "../../components/Nav";
import { Redirect } from 'react-router';
import { Container } from "../../components/Grid";
import { Input, FormBtn } from "../../components/Form";
import API from "../../utils/API";

class Login extends Component {
  state = {
    email: "",
    password: "",
    redirect: "",
    id: ""
  };
  // When this component mounts, grab the book with the _id of this.props.match.params.id
  // e.g. localhost:3000/books/599dcb67f0f16317844583fc
  // componentDidMount() {
  //   API.getBook(this.props.match.params.id)
  //     .then(res => this.setState({ book: res.data }))
  //     .catch(err => console.log(err));
  // }

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
      return <Redirect to={"/users/auth/" + this.state.id} />
      // "/books/" + book._id
      // or <Redrect to="/thankyou" /> if you are using react-router
    } else if (this.state.redirect === 403) {
      return <Redirect to="/login" />
    }

    return (
      <div>
      <Nav logged={this.state.logged}/>
      <Container fluid>
        <form>
              <Input
                value={this.state.email}
                onChange={this.handleInputChange}
                name="email"
                placeholder="email (required)"
              />
              <Input
                value={this.state.password}
                onChange={this.handleInputChange}
                name="password"
                placeholder="password (required)"
              />
              <FormBtn
                disabled={!(this.state.email && this.state.password)}
                onClick={this.handleFormSubmit}
              >
                Login
              </FormBtn>
            </form>
      </Container>
      </div>
    );
  }
}

export default Login;
