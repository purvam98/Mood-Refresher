import React, { Component } from "react";
import logo from '../logo.svg';
import '../App.css';
import { List, ListItem } from "../components/List";
import API from "../utils/API";

class App extends Component {

  state = {
    search: "",
    saved: "",
    topics: [],
    results: [],
    articles: [],
    places: [],
    error: ""
  };

  componentDidMount() {
    this.loadSave();
  }

  loadSave = () => {
    API.getPlaces().then(res =>
      this.setState({ places: res.data})
    )
    .catch(err => console.log(err));
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">mood refresher</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <List>
                {this.state.places.map(place => (
                  <ListItem key={place._id}>
                  <div>{place.id}</div>
                  {/* <a href={article.web_url}>{article.title}</a> */}
                  </ListItem>
                ))}
              </List>
      </div>
    );
  }
}

export default App;
