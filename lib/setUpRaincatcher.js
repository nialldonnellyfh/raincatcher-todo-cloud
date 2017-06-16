var config = require('../config.json');
var mbaasApi = require('fh-mbaas-api');
var mediator = require('fh-wfm-mediator/lib/mediator');
var raincatcherSync = require('fh-wfm-sync/lib/server');
var raincatcherWorkorder = require('fh-wfm-workorder/lib/cloud');
var raincatcherSimpleStore = require('fh-wfm-simple-store');

module.exports = function() {

  var mockData = require('./mockData.json');

  //Initialising the raincatcher workorder module
  raincatcherWorkorder(mediator);

  //Creating a simple store
  var Store = raincatcherSimpleStore(config);

  //Using the simple store to store the workorders in memory
  var workorderStore = new Store('workorders');

  //The store is subscribing to the cloud data topics for Workorders
  workorderStore.init(mockData);
  workorderStore.listen(":cloud:data", mediator);

  //Initialising sync for the "workorders data set"
  return raincatcherSync.init(mediator, mbaasApi, 'workorders', config.syncOptions);
};