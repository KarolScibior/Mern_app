'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//const express = require("express");
//const mongoose = require("mongoose");
//const bodyParser = require("body-parser");

var app = (0, _express2.default)();
// Bodyparser middleware
app.use(_bodyParser2.default.urlencoded({
  extended: false
}));
app.use(_bodyParser2.default.json());
// DB Config
var db = require("./config/keys").mongoURI;
// Connect to MongoDB
_mongoose2.default.connect(db, { useNewUrlParser: true }).then(function () {
  return console.log("MongoDB successfully connected");
}).catch(function (err) {
  return console.log(err);
});
var port = process.env.PORT || 5000; // process.env.port is Heroku's port if you choose to deploy the app there
app.listen(port, function () {
  return console.log('Server up and running on port ' + port + ' !');
});