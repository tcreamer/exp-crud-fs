let express = require('express');
let path = require('path');
let http = require('http');
let fs = require('fs');

let app = express();

app.set('port', process.env.PORT || 3000);

app.get('/', (req, res) => res.send('hello world!'));

http.createServer(app).listen(app.get('port'), '0.0.0.0', function() {
  console.log('Server running on port ' + app.get('port'));
})