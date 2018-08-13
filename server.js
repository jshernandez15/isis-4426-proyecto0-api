var express = require('express'),
    app = express(),
    port = process.env.PORT || 3000,
    bodyParser = require('body-parser'),
    mysql = require('mysql'),
    myConnection = require('express-myconnection'),
    dbOptions = require('./api/database');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

  if ('OPTIONS' === req.method) {
    res.sendStatus(200);
  }
  else {
    next();
  }
});

app.use(myConnection(mysql, dbOptions, 'single'));

var eventRoutes = require('./api/routes/eventRoutes');
eventRoutes(app);

var authRoutes = require('./api/routes/authenticationRouter');
authRoutes(app);

app.use(function(req, res) {
    res.status(404).send('Not found');
});

app.listen(port);

console.log('Events RESTful API server started on: ' + port);