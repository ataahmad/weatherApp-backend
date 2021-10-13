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

  console.log("Server is hit with a post");

  // Formatting user input into paramters that will be appended onto our Request URL.
  let urlParams = [];
  userInfo.forEach(ind => {
    console.log(ind);
    if (userInfo[ind] !== '') {
      console.log(JSON.stringify(userInfo));
      let cleanInfo = ind.replace(/\s/g, '+').trim();
      urlParams.push(cleanInfo);
    }
  })

  // Constructing Request URL.
  let googleAddressKey = urlParams.join('+').replace('++', '+').trim();
  console.log(googleAddressKey);
  var googleAPIUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${googleAddressKey}&key=${googleKey}`;


  // Grabbing the latitude and longitute coordinates from the Google Geocode API via node fetch.
  var lat, lng;
  var weather;
  const response = await fetch(googleAPIUrl)
    .then(response => {
      // Retrieving response.
      return response.json();
    }).then(data => {

      // Test logging the data to the console.
      console.log('Geocode API data');
      console.log(JSON.stringify(data));


      // Caching the data to our variable, and test logging them.
      lat = data.results[0].geometry.location.lat;
      lng = data.results[0].geometry.location.lng;
      console.log('lat and lng variables:');
      console.log([lat, lng]);

      //Constructing final request URL we will hit for our raw weather data.
      var tomorrowAPIUrl = `https://api.tomorrow.io/v4/timelines?location=${lat},${lng}&fields=temperature,cloudCover,precipitationProbability,precipitationType&timesteps=1h&units=metric&apikey=${tomorrowKey}`;
      console.log(tomorrowAPIUrl);

      // Making another API call and passing it into the stream
      return fetch(tomorrowAPIUrl);

    }).then(response => {
      return response.json();
    }).then(data => {

      // Logging the data to the console.
      console.log('Here is the unformatted weather data');
      console.log(JSON.stringify(data));

      // Caching the data to a variable
      weather = data;

      // Now that we have both API responses back we will return this data.
      // Next phase of development will be to build front end to attach this to.
      return weather.data.timelines;

    }).catch(error => {
      // if there's an error, log it
      console.log(error);
      return(error);
    });

  res.json(response);
});

module.exports = router;