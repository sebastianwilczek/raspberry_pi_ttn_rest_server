var express = require('express');

var app = express();

app.get('/devices', function (req, res) {
  console.log("Incoming request at endpoint /devices");

  res.end("RESULT /devices");

  console.log("Request ended at endpoint /devices");
});

app.get('/entries', function (req, res) {
  console.log("Incoming request at endpoint /entries");

  res.end("RESULT /entries");

  console.log("Request ended at endpoint /entries");
});

app.get('/entries/:deviceId', function (req, res) {
  var deviceId = req.params.deviceId;
  console.log("Incoming request at endpoint /entries, Device ID is %s", deviceId);

  res.end("RESULT /entries/" + deviceId);
  
  console.log("Request ended at endpoint /entries for Device ID %s", deviceId);
});

var server = app.listen(8081, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log("Server listening at http://%s:%s", host, port);
});