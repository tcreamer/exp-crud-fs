var bodyParser = require('body-parser');
let express = require('express');
let http = require('http');
let path = require('path');
let routes = require('./routes');
let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
app.use(express.static(path.join(__dirname, '/public')));

app.get('/', routes.index);

app.post('/api/post', routes.post);

app.get('/api/completed/:id', routes.completed);

app.get('/api/delete/:id', routes.deleted);

http.createServer(app)
  .listen(app.get('port'), '0.0.0.0', () => {
    console.log('Server running on port ' + app.get('port'));
  })