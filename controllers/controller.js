const db = require("../models");
const path = require("path");
const googleMapsClient = require('@google/maps').createClient({
  key: 'AIzaSyBWGS0HJ1QdcEcm-bQKWv_gkpww3u88Ge4',
  Promise: Promise
});

module.exports = {
  getPlaces: function (req, res) {
    console.log(req);
    googleMapsClient.places({
      query: req.query.category,
      location: {
        lat: req.query.lat,
        lng: req.query.long
      },
      radius: 10
  })
  .asPromise()
  .then((response) => {
    console.log(response);
    //let obj = Place(response.json.results[1].id, response.json.results[1].formatted_address, response.json.results[1].name, response.json.results[1].photos, response.json.results[1].rating)
    let obj = response.json.results.map(place => ({
      'id': place.id,
      'name': place.name,
      'address': place.formatted_address,
      'photos': place.photos,
      'rating': place.rating,
       'place_id':place.place_id
    }));
    res.send(obj);
  
    console.log(obj);
    
  })
  .catch((err) => res.status(422).json(err));
  },
  getPlacesDetails:function(req,res)
  {
    console.log(req.query.id);
    googleMapsClient.place({
      placeid:req.query.id
    })
    .asPromise()
    .then((response)=>{
      console.log(response.json.result.formatted_phone_number);

    
    res.send(response.json.result);
  })
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
