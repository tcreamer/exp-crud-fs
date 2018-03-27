let API =  require('../API');

function index(req, res){
  API.GET()
  .then(result => {
    if (result) {
      res.render('index.ejs', {data: JSON.parse(result)});
    } else {
      res.render('index.ejs', {data: "no data"});
    }
  })
  .catch(err => console.log(err));
};

function post(req, res) {
  API.POST(req.body.itemInput)
  .then(() => res.redirect('/'))
  .catch(err => console.log(err));
}

function completed(req, res) {
  API.UPDATE(req.params.id)
  .then(() => res.redirect('/'))
  .catch(err => console.log(err));
}

function deleted(req, res) {
  API.DELETE(req.params.id)
  .then(() => res.redirect('/'))
  .catch(err => console.log(err));
}

module.exports = {
  index,
  post,
  completed,
  deleted
}