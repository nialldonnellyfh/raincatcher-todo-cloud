var config = require('../config.json');
var mbaasApi = require('fh-mbaas-api');
var mediator = require('fh-wfm-mediator/lib/mediator');
var raincatcherSync = require('fh-wfm-sync/lib/server');
var workorderSubscribers = require('fh-wfm-workorder/lib/cloud');
var raincatcherSimpleStore = require('fh-wfm-simple-store');

//The topic generator is used to more easily generate topics to use with the mediator
//See https://github.com/feedhenry-raincatcher/raincatcher-mediator#topics-utilities
var TopicUtilGenerator = require('fh-wfm-mediator/lib/topics');

module.exports = function() {
//Setting up the topic utilities for the workorders module.
  var workorderTopicUtil = new TopicUtilGenerator(mediator).prefix(config.wfmCloudPrefix).entity(config.workordersEntityName);

  var mockData = require('./mockData.json');

  //Initialising the raincatcher workorder module
  //The workorder module will now subscribe to the `wfm:cloud:workorders` topics
  workorderSubscribers(mediator);

  //Initialising the simple store. (https://github.com/feedhenry-raincatcher/raincatcher-simple-store)
  var Store = raincatcherSimpleStore(config);

  //Using the simple store to store the workorders in memory
  //Note: this will remove any entries when the app is restarted.
  var workorderStore = new Store(config.workordersEntityName);

  //Initialising the data store with some mock entries.
  workorderStore.init(mockData);

  //The store is subscribing to the cloud data topics for Workorders
  workorderStore.listen(config.cloudDataPrefix, mediator);



  // Here we can set up subscribers for the `done` and `error` topics
  // from the raincatcher-workorder module.
  // This is useful for scenarios where business logic is required
  // when a workorder completes. (e.g. notify a user by SMS etc)


  workorderTopicUtil.onDone('create', function(todoItem) {
    console.log("A TODO item was created", todoItem)
  });

  workorderTopicUtil.onError('create', function(error) {
    console.log("An Error Occurred when creating a todo item", error)
  });

  workorderTopicUtil.onDone('update', function(todoItem) {
    console.log("A TODO item was updated", todoItem)
  });

  workorderTopicUtil.onError('update', function(error) {
    console.log("An Error Occurred when updating a todo item", error)
  });


  //Initialising the raincatcher-sync for the "workorders data set".
  return raincatcherSync.init(mediator, mbaasApi, config.workordersEntityName, config.syncOptions);
};