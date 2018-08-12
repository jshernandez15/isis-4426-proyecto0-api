var express = require('express'),
    app = express(),
    port = process.env.PORT || 3000,
    bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var eventRoutes = require('./api/routes/eventRoutes');
eventRoutes(app);

var authRoutes = require('./api/routes/authenticationRouter');
authRoutes(app);

app.use(function(req, res) {
    res.status(404).send('Not found');
});

app.listen(port);

console.log('todo list RESTful API server started on: ' + port);