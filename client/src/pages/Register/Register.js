import React, { Component } from "react";
//import { Link } from "react-router-dom";
import { Container } from "../../components/Grid";
import API from "../../utils/API";
import { Input, FormBtn } from "../../components/Form";

class Register extends Component {
  state = {
    username: "",
    email: "",
    password: ""
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
    if (this.state.username && this.state.email && this.state.password) {
      API.register({
        username: this.state.username,
        email: this.state.email,
        password: this.state.password
      }).then(res =>
        this.setState({ username: "", password: "", email: "" })
      )
        .catch(err => console.log(err));
    }
  };
  render() {
    return (
      <Container fluid>
        <form>
              <Input
                value={this.state.username}
                onChange={this.handleInputChange}
                name="username"
                placeholder="username (required)"
              />
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
                disabled={!(this.state.username && this.state.password)}
                onClick={this.handleFormSubmit}
              >
                Register
              </FormBtn>
            </form>
      </Container>
    );
  }
}

export default Register;
