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

  //Initialising the simple store. (https://github.com/feedhenry-raincatcher/raincatcher-simple-store)
  var Store = raincatcherSimpleStore(config);

  //Using the simple store to store the workorders in memory
  //Note: this will remove any entries when the app is restarted.
  var workorderStore = new Store(config.workordersEntityName);

  //Initialising the data store with some mock entries.
  workorderStore.init(mockData);

  //The store is subscribing to the cloud data topics for Workorders
  workorderStore.listen(config.cloudDataPrefix, mediator);

  //Initialising the raincatcher-sync for the "workorders data set".
  return raincatcherSync.init(mediator, mbaasApi, config.workordersEntityName, config.syncOptions);
};