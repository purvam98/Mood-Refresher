const db = require("../models");
const path = require("path");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const verifyToken = require('../authService.js').verifyToken
const agentMan = require('../config/config.js');
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
          'place_id': place.place_id
        }));
        res.send(obj);

        console.log(obj);

      })
      .catch((err) => res.status(422).json(err));
  },
  getPlacesDetails: function (req, res) {
    console.log(req.query.id);
    googleMapsClient.place({
      placeid: req.query.id
    })
      .asPromise()
      .then((response) => {


        res.send(response.json.result);
      })
  },

  findSaved: function (req, res) {
    db.User
      .find(req.query)
      .sort({ date: -1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  save: function (req, res) {
    verifyToken(req).then(result => {
      if (result.success) {
        db.User
          .update(
            { _id: result.decoded.userId },
            { $push: { places: req.body } }
          ).then(dbModel => res.json(
            {
              msg: 'Saved!'
            }
          ))
          .catch(err => res.status(422).json(err));
      } else {
        res.sendStatus(403)
      }
    }).catch(err => res.status(403).json(err))
  },
  remove: function (req, res) {
    console.log(req.params.id)
    //db.users.update({_id: ObjectId("5b500eb398ac8f428c3683c8")}, {$pull: { places: [ "09c9f64cbaab0fb65fb52d19047760998d80a34b" ]}})
    db.User
      .findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  register: (req, res) => {
    if (Object.keys(req.signedCookies).length === 0) {
      bcrypt.genSalt(10, function (err, salt) {
        if (err) {
          res.json({
            'error': err,
            'msg': 'oops... something went wrong'
          })
        } else {
          new Promise((resolve, reject) => {
            bcrypt.hash(req.body.password, salt, function (err, hash) {
              if (err) {
                reject(err);
              }
              else {
                resolve(
                  db.User
                    .create({
                      'username': req.body.username,
                      'email': req.body.email,
                      'password': hash
                    })
                    .then(dbModel => res.json({
                      'success': true,
                      'msg': 'Registered'
                    }))
                    .catch(err => res.status(422).json(err))
                );
              }
            })
          }).catch((err) => {
            res.json({
              'error': err,
              'success': false,
              'msg': 'oops... something went wrong'
            })
          })
        }
      });
    } else {
      verifyToken(req).then(result => {
        if (result.success) {
          result.success ? result.decoded = result.decoded.username : result.decoded = '';
          res.json(result);
        } else {
          res.status(403).send('Invalid tolken');
        }
      }).catch(err => res.status(403).json(err));
    }
  },
  login: (req, res, next) => {
    if (Object.keys(req.signedCookies).length === 0) {
      db.User
        .find({ email: req.query.email })
        .then((data) => {
          if (data[0]) {
            bcrypt.compare(req.query.password, data[0].password, function (err, valid) {
              if (valid && !err) {
                const jwtAuthToken = jwt.sign({
                  'userId': data[0]._id,
                  'username': data[0].username
                },
                  agentMan.secret,
                  { expiresIn: 3600000 });
                res.cookie('jwtAuthToken', jwtAuthToken, {
                  maxAge: 3600000,
                  httpOnly: false,
                  signed: true,
                })
                res.status(200).send(data[0]._id);
              } else {
                res.status(403).send('Incorrect username or password');
              }
            })
          } else {
            res.status(403).send('Incorrect username or password');
          }
        }).catch(next);
    } else {
      verifyToken(req).then(result => {
        result.success ? result.decoded = result.decoded.username : result.decoded = '';
        res.json(result);
      }).catch(err => res.status(403).json(err));
    }

  },
  authenticate: (req, res) => {
    if (Object.keys(req.signedCookies).length === 0) {
      res.json({
        success: false,
        msg: 'not logged in'
      })
    } else {
      verifyToken(req).then(result => {
        result.success ? result.decoded = result.decoded.username : result.decoded = '';
        res.json(result);
      }).catch(err => res.status(403).json(err));
    }
  },
  profile: (req, res, next) => {
    if (Object.keys(req.signedCookies).length === 0) {
      res.json({
        success: false,
        msg: 'not logged in'
      })
    } else {
      verifyToken(req).then(result => {
        if (result.success) {
          db.User
            .findById({ _id: req.params.id })
            .sort({ date: -1 })
            .then(dbModel => res.json(dbModel.places))
            .catch(err => res.status(422).json(err));
        } else {
          res.sendStatus(403)
        }
      }).catch(err => res.status(403).json(err));
    }
    },
    navigate: function (req, res) {
      res.sendFile(path.join(__dirname, '../client/build/', 'index.html'));
    },
  };
