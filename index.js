let express = require('express');
let path = require('path');
let http = require('http');
let fs = require('fs');

let app = express();

app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

app.get('/', (req, res) => {
  let data = {};
  fs.readFile('data.json', 'utf8', (err, result) => {
    if (err) {
      console.log(err);
       res.render('index.ejs', {data: "no data"});
    } else {
      data = JSON.stringify(result);
      res.render('index.ejs', {data: data});
    }
  })
});

http.createServer(app)
  .listen(app.get('port'), '0.0.0.0', () => {
    console.log('Server running on port ' + app.get('port'));
  })