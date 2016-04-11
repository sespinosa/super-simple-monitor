'use strict';

const VitalSigns = require('vitalsigns'),
      vitals = new VitalSigns();

vitals.monitor('cpu');
vitals.monitor('mem', { units: 'MB' });
vitals.monitor('tick');
vitals.monitor('uptime');

module.exports =  vitals.getReport;
