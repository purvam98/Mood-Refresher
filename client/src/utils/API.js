import axios from "axios";

export default {
  getPlaces: function(lat,long,category) {
    return axios.get("/api/mood", {
      params: {
        lat: lat,
        long: long,
        category:category
      }
    })
  },
  getPlacesDetails:function(id)
  {
    console.log(id);
    return axios.get("/api/mood/details",{
      params:{
        id:id
      }
    })
  },
  getSearch: function(searchTerm) {
    let queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json";

    queryURL += "?api-key=b9f91d369ff59547cd47b931d8cbc56b:0:74623931";
    queryURL += "&q=" + searchTerm;
    // if (parseInt(startYear)) {
    //   queryURL += "&begin_date=" + startYear + "0101";
    // }
    // if (parseInt(endYear)) {
    //   queryURL += "&end_date=" + endYear + "0101";
    // }
    return axios.get(queryURL);
  },
  getWeather:function(searchZipcode)
  {
    const wuAPIKey = "a4c27a2f36ce4003";
    const queryURL = "https://api.wunderground.com/api/" + wuAPIKey + "/conditions/q/" + searchZipcode + ".json";
    return axios.get(queryURL);
  },
  getLatLong:function(searchZipcode)
  {
    const Apikey="AIzaSyBWGS0HJ1QdcEcm-bQKWv_gkpww3u88Ge4";
    const queryURL = "https://maps.googleapis.com/maps/api/geocode/json?address=" + searchZipcode + "&key=" + Apikey;
    return axios.get(queryURL);    

  },
  getSaved: function() {
    return axios.get("/api/mood");
  },
  deleteSaved: function(id) {
    return axios.delete("/api/mood/" + id);
  },
  save: function(data) {
    console.log(data)
    return axios.post("/api/mood/", data);
  },
  register: function(data) {
    return axios.post("/api/mood/users", data);
  },
  login: function(data) {
    let email = data.email
    return axios.get("/api/mood/users", {
      params: {
        email: email,
        password: data.password
      }
    })
  },
  authenticate: () => {
    return axios.get("/api/mood/auth/nav/");
  },
  getProfile: function(id) {
    return axios.get("/api/mood/users/auth/" + id)
  },
};