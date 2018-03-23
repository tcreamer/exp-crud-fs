var bodyParser = require('body-parser');
let express = require('express');
let http = require('http');
let path = require('path');

let API =  require('./API');

let app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

app.get('/', (req, res) => {
  API.GET()
  .then(result => {
    if (result) {
      res.render('index.ejs', {data: JSON.parse(result)});
    } else {
      res.render('index.ejs', {data: "no data"});
    }
  })
  .catch(err => console.log(err));
});

app.post('/api/post', (req, res) => {
  API.POST(req.body.itemInput)
  .then(() => res.redirect('/'))
});

app.get('/api/delete/:id', (req, res) => {
  API.DELETE(req.params.id)
  .then(() => res.redirect('/'))
});

http.createServer(app)
  .listen(app.get('port'), '0.0.0.0', () => {
    console.log('Server running on port ' + app.get('port'));
  })