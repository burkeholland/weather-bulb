
const axios = require('axios');
const LIFX = require('lifx-http-api');

let client = new LIFX({
  bearerToken: process.env.LIFX_TOKEN
});

module.exports = function (context, myTimer) {
  // build up the DarkSky endpoint
  let endpoint = `${process.env.DS_API}/${process.env.DS_SECRET}/${
    process.env.LAT
    },${process.env.LNG}`;

  // use axios to call DarkSky for weather
  axios
    .get(endpoint)
    .then(data => {
      let temp = Math.round(data.data.currently.temperature);

      // make sure the temp isn't above 100 because that's as high as we can go
      temp = temp < 100 ? temp : 100;

      // determine the hue
      let hue = 200 + (160 * (temp / 100));

      // return Promise.all so we can resolve at the top level
      return Promise.all([
        data,
        client.setState('all', { color: `hue:${hue}` })
      ]);
    })
    .then(result => {
      // result[0] contains the darksky result
      // result[1] contains the LIFX result
      context.log(result[1]);
    })
    .catch(err => {
      context.log(err.message);
    });
};