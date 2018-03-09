const axios = require('axios');
const LIFX = require('lifx-http-api');

let client = new LIFX({
  bearerToken: process.env.LIFX_TOKEN
});

module.exports = function (context, req) {

  if (req.query.temp) {
    let hue = 200 + (160 / (100 / req.query.temp));

    client.setState('all', { color: `hue:${hue}` }).then(result => {
      context.res = {
        // status: 200, /* Defaults to 200 */
        body: result
      }
    }).catch(err => {
      context.res = {
        // status: 200, /* Defaults to 200 */
        body: err.message
      };
    }).then(() => {
      context.done();
    });
  } else {
    context.res = {
      status: 400,
      body: 'Please pass "temp" parameter'
    };

    context.done();
  }
};
