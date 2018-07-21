import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import API from "../../utils/API";
import "./Moods.css";

class Moods extends Component {
  state = {
    zipcode: "",
    weather_1:"",
    weather_2:"",
    joie:"true",
    moods:["Fun","Romantic","Chill","Sporty","Extreme"],
    justclick:"",
    fun:["icecream.png","movies.png"],
    places:[]
  };
  componentDidMount() {
    this.setState({
      zipcode: this.props.match.params.zipcode
    });
     this.loadWeather();
  }
    loadWeather = () => {
      API.getWeather(this.props.match.params.zipcode)
      .then((res) => {
          this.setState({ weather_1: res.data.current_observation.weather });
          this.setState({ weather_2: res.data.current_observation.temp_f });
          
      }).catch((err) => {
          console.log(err);
      });
  };
  handleMood(mood)
  {
    this.setState({ justclick: mood });
    if(this.state.mood="fun")
    {
      this.setState({ places: ["icecream","bowling","drink","movies"] });
      
    }
  }
  render() {

    return (

      <Container fluid>
        
        <Row>
          <Col size="md-12">
          <h3 className="title">Current weather:<font className="weather">{this.state.weather_1},{this.state.weather_2}F</font></h3>
          </Col>
        </Row>
      
        <Row>

          <Col size="md-12" align="center">
            <h2 className="title" align="center">Tap on the moods you're looking for!</h2>
          </Col>

        </Row>
        
        <Row>
          <Col size="md-3">
          </Col>

          <Col size="md-8">
            <ul className="vibes">
            {this.state.moods.map(mood =>
              <li key={mood} onClick={() => this.handleMood(mood)}>
                {mood}
              </li>
            )}
            </ul>
            
          </Col>

        </Row>
        <Row>
          <Col size="md-2">
          
          </Col>

          <Col size="md-8">
          <br/>
          
            <ul className="places">
            {this.state.places.map(place =>
              <li key={place}>
                <img src={require(`./${place}.png`)} className="img" /><font className="headingplace">{place}</font>
              </li>
            )}
            </ul>
            
          </Col>

        </Row>

      </Container>

    );
  }
}
export default Moods;