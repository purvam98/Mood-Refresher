import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import API from "../../utils/API";
import { List, ListItem } from "../../components/List";

class Results extends Component {
    state = {
        zipcode: "",
        category: "",
        lat: "",
        long: "",
        places: [],
        photos: [],
        places_final: [],
        details:[]

    };

    componentDidMount() {

        this.setState({
            zipcode: this.props.match.params.zipcode
        });
        this.setState({

            category: this.props.match.params.place

        });
        this.loadlatlong();

    }
    dothething = (places) => {
        places.forEach(place => {
            if (place.photos) {
                place.photos = place.photos[0].photo_reference
            }
            else {
                place.photos = 'oops'
            }
        })
        this.setState({ places_final: places });
        console.log(places)
    }
    loadlatlong = () => {
        API.getLatLong(this.props.match.params.zipcode)
            .then((res) => {
                this.setState({ lat: res.data.results[0].geometry.location.lat });
                this.setState({ long: res.data.results[0].geometry.location.lng });
                console.log(this.state.lat);
                console.log(this.state.long);
                API.getPlaces(this.state.lat, this.state.long, this.props.match.params.place)
                    .then((res) => {
                        this.setState({ places: res.data })



                        this.dothething(this.state.places)


                    }).catch((err) => {
                        console.log(err);
                    });

            }).catch((err) => {
                console.log(err);
            });

    };
    handleDetails = (id) => {
        API.getPlacesDetails(id)
            .then((res) => {
                this.setState({ details: res.data })  
                console.log(this.state.details.formatted_phone_number);
            });
    };
    render() {
        return (
            <List>
                {this.state.places_final.map(place => (
                    <ListItem key={place.id}>
                        <div>{place.address}</div>

                        <img src={place.photos !== "oops" ? "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=" + place.photos + "&key=AIzaSyBWGS0HJ1QdcEcm-bQKWv_gkpww3u88Ge4" : require(`./not-found.png`)} />

                        {/* <a href={article.web_url}>{article.title}</a> */}
                        <button onClick={() => this.handleDetails(place.place_id)}>Click</button>
                    </ListItem>

                ))}
            </List>




        )
    }
}
export default Results;