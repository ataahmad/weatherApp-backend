const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');


const googleKey = process.env.googleAPIKey;
const tomorrowKey = process.env.tomorrowAPIKey;


router.get('/', (req, res) => {
  res.send("You're on the front view of the backend server.");
});

// Creating route for user info submission.
router.post('/', async (req, res) => {

  // Taking in relevant user data.
  const userInfo = [
    req.body.address1,
    req.body.address2,
    req.body.city,
    req.body.state
  ];

  // Formatting user input into paramters that will be appended onto our Request URL.
  let urlParams = [];
  userInfo.forEach(ind => {
    if (userInfo[ind] !== '') {
      let cleanInfo = ind.replace(/\s/g, '+').trim();
      urlParams.push(cleanInfo);
    }
  })

  // Constructing Request URL.
  let googleAddressKey = urlParams.join('+').replace('++', '+').trim();
  let googleAPIUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${googleAddressKey}&key=${googleKey}`;

  // Grabbing the latitude and longitute coordinates from the Google Geocode API via node fetch.
  let lat, lng;
  let weather;
  const response = await fetch(googleAPIUrl)
    .then(response => {
      return response.json();
    }).then(data => {
      try {
        lat = data.results[0].geometry.location.lat;
        lng = data.results[0].geometry.location.lng;
      } catch(e) {}

      //Constructing final request URL we will hit for our raw weather data.
      var tomorrowAPIUrl = `https://api.tomorrow.io/v4/timelines?location=${lat},${lng}&fields=temperature,cloudCover,precipitationProbability,precipitationType&timesteps=1h&units=metric&apikey=${tomorrowKey}`;

      // Making another API call and passing it into the stream
      return fetch(tomorrowAPIUrl);

    }).then(response => {
      return response.json();
    }).then(data => {
      // Caching the data to a variable
      weather = data;

      // Now that we have both API responses back we will return this data.
      // Next phase of development will be to build front end to attach this to.
      return weather.data.timelines;

    }).catch(error => {
      console.log(error);
      return (error);
    });

  res.json(response);
});

module.exports = router;