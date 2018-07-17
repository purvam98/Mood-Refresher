import React, { Component } from "react";
import logo from '../../logo.svg';
import header from './title.gif';
import '../../App.css';
import { List, ListItem } from "../../components/List";
import API from "../../utils/API";
import { Col, Row, Container } from "../../components/Grid";
import { Input, TextArea, FormBtn } from "../../components/Form";

class App extends Component {

  state = {
    // search: "",
    // saved: "",
    // topics: [],
    // results: [],
    // articles: [],
    // places: [],
    // error: ""
    zipcode: ""

  };

  // componentDidMount() {
  //   this.loadSave();
  // }

  // loadSave = () => {
  //   API.getPlaces().then(res =>
  //     this.setState({ places: res.data})
  //   )
  //   .catch(err => console.log(err));
  // };
  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };
  handleFormSubmit = event => {
    event.preventDefault();
  };

  render() {
    return (
      // <div className="App">
      //   <header className="App-header">
      //     <img src={logo} className="App-logo" alt="logo" />
      //     <h1 className="App-title">mood refresher</h1>
      //   </header>
      //   <p className="App-intro">
      //     To get started, edit <code>src/App.js</code> and save to reload.
      //   </p>
      //   <List>
      //           {this.state.places.map(place => (
      //             <ListItem key={place.id}>
      //             <div>{place.address}</div>
      //             {/* <a href={article.web_url}>{article.title}</a> */}
      //             </ListItem>
      //           ))}
      //         </List>
      // </div>
      <Container fluid>
        <br />
        <br />
        <br />
        <Row>
          <Col size="md-3">
          </Col>
          <Col size="md-6">
            <img src={header} />
          </Col>
          <Col size="md-3">
          </Col>
        </Row>
        <Row>
          <Col size="md-3">
          </Col>
          <Col size="md-6">
            <h3>Enter Your Zipcode to refresh your  Mood</h3>
          </Col>
          <Col size="md-3">
          </Col>
        </Row>
        <br />
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
              <FormBtn
                disabled={!(this.state.zipcode)}
                onClick={this.handleFormSubmit}
              >
                Submit
              </FormBtn>
            </form>
          </Col>
          <Col size="md-4">
          </Col>
        </Row>
      </Container>
    );
  }
}

export default App;
