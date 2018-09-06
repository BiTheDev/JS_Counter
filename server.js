var express = require("express");
var session = require('express-session');
console.log("Let's find out what express is", express);
// invoke express and store the result in the variable app
var app = express();
console.log("Let's find out what app is", app);
var path = require('path');
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended : true}));
app.use(express.static(path.join(__dirname, "./static")));
app.use(session({
    secret: 'keyboardkitteh',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
  }))
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');
app.get('/', function(request, response) {
    if(!request.session.count){
        request.session.count = 1;
    }
    response.render('index', {count:request.session.count});
})
app.post('/add', function(request, response) {
    console.log("POST DATA \n\n", request.body)
    response.send(request.session.count += 2);
    response.redirect('/');
})

app.post('/destroy_session', function(request,response) {
    request.session.destroy();
    response.redirect('/');
})

app.listen(8000, function() {
    console.log("listening on port 8000");
  })