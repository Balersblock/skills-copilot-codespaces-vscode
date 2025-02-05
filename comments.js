// Create web server
// npm install express
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

// Set view engine
app.set('view engine', 'ejs');
app.set('views', './views');

// Set body parser
app.use(bodyParser.urlencoded({ extended: false }));

// Set static folder
app.use(express.static('public'));

// Set database
var Datastore = require('nedb');
var db = new Datastore({ filename: 'data.db', autoload: true });

// Set port
app.listen(3000);

// Set route
app.get('/', function(req, res) {
    db.find({}, function(err, docs) {
        res.render('index', { comments: docs });
    });
});

app.post('/comment', function(req, res) {
    var name = req.body.name;
    var content = req.body.content;
    db.insert({ name: name, content: content }, function(err, newDoc) {
        res.redirect('/');
    });
});

app.get('/delete/:id', function(req, res) {
    var id = req.params.id;
    db.remove({ _id: id }, {}, function(err, numRemoved) {
        res.redirect('/');
    });
}); 