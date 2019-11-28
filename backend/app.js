var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var cors = require('cors');
var mongoose = require('mongoose');
var expressValidator = require('express-validator');

//Init app
var app = express();

app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());

app.use(cors());

require('dotenv').config();

//Connect to DB
mongoose.connect(process.env.mongoURI, {
  useNewUrlParser: true
});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('Connected to MongoDB');
});

//Routes
var signUp=require('./routes/signUp');
var logIn=require('./routes/logIn');
var createEvent=require('./routes/createEvent');
var events=require('./routes/eventList');
var visitorForm=require('./routes/visitorForm');
var visitorList=require('./routes/visitorList');

//Middlewares
app.use('/sign-up',signUp);
app.use('/login',logIn);
app.use('/create-event',createEvent);
app.use('/events',events);
app.use('/visitorForm',visitorForm);
app.use('/visitorList',visitorList);

//Starts the server
var port = 3000;
app.listen(process.env.PORT || port, () => {
  console.log('Server started on port ' + port)
});