'use strict'

const fs = require('fs');
const crypto = require('crypto');
const hash = crypto.createHash('sha256');

let name = process.env.name || null,
    id = process.env.id || null;

let utils = {};

function saveConfig (callback) {
  let configData = {
    "id": getId(),
    "name": getName()
  }

  fs.writeFile('./config.json', JSON.stringify(configData), function(err){
    if(err) {
      console.log('Error writing the configuration file.');
      console.log(err);
      return;
    }
  });
  if(callback) return callback(configData);
}

function loadConfig (callback) {
  let configData = fs.readFileSync('./config.json');

  try {
    utils.config = JSON.parse(configData);
    if(id) utils.config.id = id;
    if(name) utils.config.name = name;
    callback(utils.config);
  }
  catch (err) {
    console.log('Error trying to parse the configuration file.');
    console.log(err);
    console.log('creating new file');
    saveConfig(function(cfg){
      utils.config = cfg;
      callback(cfg)
    });
  }

}

function getName () {
  return name || "super-simple-monitor-"+(+(new Date));
  }

function getId () {
  return id || utils.id;
}

function setConfig () {
  hash.on('readable', () => {
    let hash_id = hash.read();
    if(hash_id) {
      utils.id = hash_id.toString('hex');
      loadConfig(function(cfg){
        return utils.config;
      });
    }
  });


  hash.write(timestamp.toString() + timestamp.toString() + timestamp.toString() + timestamp.toString() + timestamp.toString());
  hash.end();

}

setConfig();

function timestamp () {
  return +(new Date);
}

function getConfig () {
  return utils.config;
}

utils.getConfig = getConfig;

module.exports = utils;
