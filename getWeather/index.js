const axios = require('axios');
const LIFX = require('lifx-http-api');

let client = new LIFX({
  bearerToken: process.env.LIFX_TOKEN
});


module.exports = function (context, myTimer) {

  if (myTimer.isPastDue) {
    context.log('JavaScript is running late!');
  }

  let endpoint = `${process.env.DS_API}/${process.env.DS_SECRET}/${
    process.env.LAT
    },${process.env.LNG}`;

  axios
    .get(endpoint)
    .then(data => {
      let temp = Math.round(data.data.currently.temperature);
      let hue = 200 + (160 / (100 / temp));
      return Promise.all([
        data,
        client.setState('all', { color: `hue:${hue}` })
      ]);
    })
    .then(result => {
      context.log(result[1]);
    })
    .catch(err => {
      context.log(err.message);
    });
};