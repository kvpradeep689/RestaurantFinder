var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var restaurants = require('./routes/restaurants');

var port = 3000;
var app = express();

//View Engine
//set paths of the views folder
app.set('views', path.join(__dirname, 'views'));
//which engine to use
app.set('view engine', 'ejs');
//render files with html extension
app.engine('html', require('ejs').renderFile);

//Set Static folder - All Angular UI stuff will be here
app.use(express.static(path.join(__dirname, 'client')));

//Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/', index);
app.use('/api', restaurants);

app.listen(port, function(){
    console.log('Server starter on port ' + port);
});
