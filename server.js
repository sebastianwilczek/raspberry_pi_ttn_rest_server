var express = require('express');

var app = express();
var MongoClient = require('mongodb').MongoClient;
//var url = "mongodb://localhost:27017/";
//var url = "mongodb://<USER>:<PASSWORD>@ds145484.mlab.com:45484/ttn";
var url = "mongodb://TTNUser:TTNPassword1@ds145484.mlab.com:45484/ttn";

app.get('/devices', function (req, res) {
  console.log("Incoming request at endpoint /devices");

  MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
    if (err) throw err;
    var dbo = db.db("ttn");
  
    dbo.collection("deviceLog").find({}, { projection: { _id: 0, device_id: 1 } }).toArray(function(err, result) {
      if (err) throw err;
      db.close();

      var resultArray = [];
      result.forEach(function(entry) {
        resultArray.indexOf(entry.device_id) === -1 ? resultArray.push(entry.device_id) : console.log("Duplicate of Device ID found, discarding");
      });

      console.log("Result:");
      console.log(resultArray);
      res.writeHead(200, { "Content-Type": "application/json"});
      res.write(JSON.stringify(resultArray));
      res.end();
      console.log("Request ended at endpoint /devices\n");
    });
  });
});

app.get('/entries', function (req, res) {
  console.log("Incoming request at endpoint /entries");

  MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
    if (err) throw err;
    var dbo = db.db("ttn");
  
    dbo.collection("deviceLog").find({}, { projection: { _id: 0 } }).toArray(function(err, result) {
      if (err) throw err;
      console.log("Result:");
      console.log(result);
      db.close();
      res.writeHead(200, { "Content-Type": "application/json"});
      res.write(JSON.stringify(result));
      res.end();
      console.log("Request ended at endpoint /entries\n");
    });
  });
});

app.get('/entries/:deviceId', function (req, res) {
  var deviceId = req.params.deviceId;
  console.log("Incoming request at endpoint /entries, Device ID is %s", deviceId);

  MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
    if (err) throw err;
    var dbo = db.db("ttn");

    var query = { device_id: deviceId };
  
    dbo.collection("deviceLog").find(query, { projection: { _id: 0 } }).toArray(function(err, result) {
      if (err) throw err;
      console.log("Result:");
      console.log(result);
      db.close();
      res.writeHead(200, { "Content-Type": "application/json"});
      res.write(JSON.stringify(result));
      res.end();
      console.log("Request ended at endpoint /entries for Device ID %s\n", deviceId);
    });
  });
});

var server = app.listen(8081, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log("Server listening at http://%s:%s", host, port);
});