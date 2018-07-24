import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import API from "../../utils/API";
import { List, ListItem } from "../../components/List";
import Nav from "../../components/Nav";
import "./Results.css";
import ReactModal from 'react-modal';

class Results extends Component {
    constructor() {

        super();
        this.state = {
            zipcode: "",
            category: "",
            lat: "",
            long: "",
            weather_1: "",
            weather_2: "",
            places: [],
            photos: [],
            places_final: [],
            details: [],
            showModal: false,
            weekday_text: [],
            reviews: [],
            review1_author_name: "",
            review2_author_name: "",
            review3_author_name: "",
            review1_author_rating: "",
            review2_author_rating: "",
            review3_author_rating: "",
            review1_author_text: "",
            review2_author_text: "",
            review3_author_text: "",
            photo_d: "",
            i: 1,
            logged: "",

        };

        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
    }

    handleOpenModal() {
        this.setState({ showModal: true });
        console.log(this.state.showModal);
    }

    handleCloseModal() {
        this.setState({ showModal: false });
    }

    componentDidMount() {

        this.setState({
            zipcode: this.props.match.params.zipcode
        });
        this.setState({

            category: this.props.match.params.place

        });
        this.loadWeather();
        this.loadlatlong();

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
    submit = (id) => {
        let result = this.state.places.filter(obj => {
            return obj.place_id === id
        })
        API.save(result[0])
            .then((res) => {
                //this.setState({ msg: res.data })  
                console.log(res.data);
            }).catch((err) => {
                console.log(err);
            });
    };

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
                        console.log(this.state.places);


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
                console.log(this.state.details);
                if (this.state.details.hasOwnProperty('opening_hours')) {
                    this.setState({ weekday_text: this.state.details.opening_hours.weekday_text })
                }
                else {
                    this.setState({ weekday_text: "-" })
                }
                if (this.state.details.hasOwnProperty('reviews')) {
                    this.setState({ reviews: this.state.details.reviews })
                    this.setState({ review1_author_name: this.state.reviews[0].author_name });
                    this.setState({ review2_author_name: this.state.reviews[1].author_name });
                    this.setState({ review3_author_name: this.state.reviews[2].author_name });
                    this.setState({ review1_author_rating: this.state.reviews[0].rating });
                    this.setState({ review2_author_rating: this.state.reviews[1].rating });
                    this.setState({ review3_author_rating: this.state.reviews[2].rating });
                    this.setState({ review1_author_text: this.state.reviews[0].text });
                    this.setState({ review2_author_text: this.state.reviews[1].text });
                    this.setState({ review3_author_text: this.state.reviews[2].text });
                }
                else {
                    this.setState({ reviews: "-" })
                }
                if (this.state.details.hasOwnProperty('photos')) {

                    this.setState({ photo_d: this.state.details.photos[0].photo_reference });
                }
                else {
                    this.setState({ photo_d: "-" });
                }
            });
        this.handleOpenModal();
    };
    nextpitcure = () => {
        this.state.i = this.state.i + 1;
        if (this.state.details.photos[this.state.i]) {


            this.setState({ photo_d: this.state.details.photos[this.state.i].photo_reference });
        }
        else {
            this.setState({ i: 0 });
            this.setState({ photo_d: this.state.details.photos[0].photo_reference });
        }
    };

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
                            <h2 className="title" align="center">Tap on the places you're looking for!</h2>
                        </Col>

                    </Row>
                    <br />
                    <Row>
                        {this.state.places_final.map(place => (
                            <Col size="md-4" align="center">
                                <div className="div">
                                    <h3 className="title middle">{place.name}</h3>
                                    <img className="img_middle" align="middle" src={place.photos !== "oops" ? "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=" + place.photos + "&key=AIzaSyBWGS0HJ1QdcEcm-bQKWv_gkpww3u88Ge4" : require(`./not-found.png`)} width="300px" height="200px" />
                                    <Row>
                                        <Col size="md-2"></Col>
                                        <Col size="md-4" align="middle">
                                            <button align="middle" onClick={() => this.handleDetails(place.place_id)} type="button" class="btn btn-primary button_details" style={{ margin: '0 auto' }}>More Details</button>
                                        </Col>
                                        <Col size="md-4" align="middle">
                                            <button align="middle" onClick={() => this.submit(place.place_id)} type="button" class="btn btn-primary button_details" style={{ margin: '0 auto' }}>Save Place</button>
                                        </Col>
                                    </Row>
                                </div>
                            </Col>
                        ))}
                    </Row>
                    <ReactModal
                        isOpen={this.state.showModal}
                        contentLabel="Minimal Modal Example"
                    >
                        {/* {this.state.weekday_text[0]}   */}

                        <Row>
                            <Col size="md-12" align="center">
                                <h2 className="title" align="center">{this.state.details.name}</h2>
                            </Col>
                            <Col size="md-12" align="center">
                                <h3 className="title middle size"><b>{this.state.details.formatted_address}</b></h3>
                            </Col>

                            <Col size="md-4">
                                <h3 className="title middle size"><b>Rating:</b>{this.state.details.rating}</h3>
                            </Col>
                            <Col size="md-4">
                                <h3 className="title middle size"><b>Phone Number:</b>{this.state.details.formatted_phone_number}</h3>
                            </Col>
                            <Col size="md-4">
                                <h3 className="title middle size"><b>Website:</b><a href={this.state.details.website} target="_blank">{this.state.details.website}</a></h3>
                            </Col>


                            <Col size="md-12" align="center">
                                <h6 className="middle"><b>{this.state.weekday_text[0]} </b></h6>
                                <h6 className="middle"><b>{this.state.weekday_text[1]} </b></h6>
                                <h6 className="middle"><b>{this.state.weekday_text[2]} </b></h6>
                                <h6 className="middle"><b>{this.state.weekday_text[3]} </b></h6>
                                <h6 className="middle"><b>{this.state.weekday_text[4]} </b></h6>
                                <h6 className="middle"><b>{this.state.weekday_text[5]} </b></h6>
                                <h6 className="middle"><b>{this.state.weekday_text[6]} </b></h6>

                            </Col>
                            <Col size="md-12" align="center">
                                <div className="col-md-12 text-center">
                                    <br />
                                    <img className="img_middle" align="middle" src={this.state.photo_d !== "-" ? "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=" + this.state.photo_d + "&key=AIzaSyBWGS0HJ1QdcEcm-bQKWv_gkpww3u88Ge4" : require(`./not-found.png`)} width="400px" height="200px" />

                                    <br />
                                    <br />
                                    <button type="button" class="btn btn-primary" onClick={this.nextpitcure}>Next</button>
                                </div>
                            </Col>
                            <br />
                            <br />
                            <Col size="md-12" align="center">
                                <br />
                                <h2 className="title" align="center">Reviews</h2>
                            </Col>
                            <br />
                            <Col size="md-4">
                                <h6 className="middle"><b>Name:</b>{this.state.review1_author_name}</h6>
                                <h6 className="middle"><b>Rating:</b>{this.state.review1_author_rating}</h6>
                                <h6 className="middle"><b>Text:</b>{this.state.review1_author_text}</h6>
                            </Col>
                            <Col size="md-4">
                                <h6 className="middle"><b>Name:</b>{this.state.review2_author_name}</h6>
                                <h6 className="middle"><b>Rating:</b>{this.state.review2_author_rating}</h6>
                                <h6 className="middle"><b>Text:</b>{this.state.review2_author_text}</h6>
                            </Col>
                            <Col size="md-4">
                                <h6 className="middle"><b>Name:</b>{this.state.review3_author_name}</h6>
                                <h6 className="middle"><b>Rating:</b>{this.state.review3_author_rating}</h6>
                                <h6 className="middle"><b>Text:</b>{this.state.review3_author_text}</h6>
                            </Col>
                        </Row>

                        {/* <button align="center" onClick={this.handleCloseModal}>Close Modal</button> */}
                        <Col size="md-12" align="center">

                            <div className="col-md-12 text-center">
                                <button onClick={this.handleCloseModal} type="button" class="btn btn-primary">Close</button>
                                &nbsp;
                    <button type="button" class="btn btn-primary">Add To Favourite</button>

                            </div>
                        </Col>
                    </ReactModal>
                </Container>
            </div>



        )
    }
}
export default Results;