const db = require("../models");
const path = require("path");
const googleMapsClient = require('@google/maps').createClient({
  key: 'AIzaSyBWGS0HJ1QdcEcm-bQKWv_gkpww3u88Ge4',
  Promise: Promise
});

module.exports = {
  getPlaces: function (req, res) {
    googleMapsClient.places({
      query: 'chickfila',
      location: {
        lat: 33.7490,
        lng: 84.3880
      },
      radius: 10
  })
  .asPromise()
  .then((response) => {
    //let obj = Place(response.json.results[1].id, response.json.results[1].formatted_address, response.json.results[1].name, response.json.results[1].photos, response.json.results[1].rating)
    let obj = response.json.results.map(place => ({
      'id': place.id,
      'name': place.name,
      'address': place.formatted_address,
      'photos': place.photos,
      'rating': place.rating,
    }));
    res.send(obj);
  })
  .catch((err) => res.status(422).json(err));
  },
  findSaved: function (req, res) {
    db.Article
      .find(req.query)
      .sort({ date: -1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  save: function (req, res) {
    db.Article
      .create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  remove: function (req, res) {
    console.log(req.params.id)
    db.Article
      .findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  navigate: function (req, res) {
    res.sendFile(path.join(__dirname, '../client/build/', 'index.html'));
  },
};
