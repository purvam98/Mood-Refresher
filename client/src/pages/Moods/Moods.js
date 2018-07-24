import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import API from "../../utils/API";
import "./Moods.css";
import Nav from "../../components/Nav";

class Moods extends Component {
  state = {
    zipcode: "",
    weather_1:"",
    weather_2:"",
    joie:"true",
    moods:["Fun","Romantic","Chill","Sporty","Peaceful"],
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
    
    console.log(mood);
    if(mood==="Fun")
    {
      
     return this.setState({ places: ["icecream","bowling","aquarium","movie theater","restaurant","zoo"] });
      
    }
    else if(mood==="Romantic")
    {
      return this.setState({places:["cafe","park","bar","movie theater","restaurant","icecream"]});
    }
    else if(mood==="Chill")
    {
      return this.setState({places:["art_gallery","spa","night_club","fishing","casino","picnic"]});
    }
    else if(mood==="Sporty")
    {
      return this.setState({places:["tennis","hike","golf","paintball","volleyball","baseball"]});
    }
    else if(mood==="Peaceful")
    {
      return this.setState({places:["library","church","museum","temple","park","mosque"]});
    }

  }
  render() {

    return (
      <div>
        <Nav logged={this.state.logged} />
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
               <a href={"/results/"+this.state.zipcode+"/"+place}> <img src={require(`./${place}.png`)} className="img" /><br/><font className="headingplace">{place}</font></a></li>
                
              
            )}
            </ul>
            
          </Col>

        </Row>

      </Container>
      </div>
    );
  }
}
export default Moods;