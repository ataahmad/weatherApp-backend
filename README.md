# weatherApp-backend
  * This is a stateless server that I have built that serves our weather data to the front end of our React weather application.

## Engineering Highlights:
  * We securely store our API keys with this server integrated with our architecture.

## Technologies used:
  * Node / Express
  * Mocha and Chai for testing
  * CircleCI for Continuous Integration
  * Heroku for hosting!

## Data Model:
### POST `/`
```js
// res.body
{
    "address1": STRING;
    "address2": STRING;
    "city": STRING;
    "state": STRING;
}

// req.body
[
    0: {
        "endTime": STRING;
        "intervals": ARRAY;
        "startTime": STRING;
        "timestep": STRING;
    }
]

// Each item in the interval array is an object of the form:
{
    "startTime": STRING;
    "values": {
        "cloudCover": NUMBER
        "precipitationProbability": NUMBER;
        "precipitationType": NUMBER;
        "temperature": NUMBER;
    }
}
```