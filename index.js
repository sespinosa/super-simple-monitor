'use strict';

const monitorReport = require('./lib/monitor_report'),
      request = require('request');
let utils = require('./lib/utils');

const config = utils.getConfig();

setInterval(() => {
  sendUpdate();
}, 2000);

function sendUpdate () {
  /*
   TODO: Using request or socket.io send
   updates to the server using the id name pair.
  */
  console.log('toing!');
}
