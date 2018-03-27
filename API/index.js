let fs = require('fs');

//Delete an entry from data.json file
function DELETE(id) {
  return new Promise((res, rej) => {
    fs.readFile('data.json', 'utf8', (err, result) => {
      if (err) {
        rej(err);
      } else {
        let data = JSON.parse(result);
        let newData = data.items.filter(item => item.id !== Number(id));
        data.items = newData;
        data = JSON.stringify(data);
        fs.writeFile('data.json', data, (err, result) => {
          if (err) {
            rej(err);
          } else {
            res();
          }
        });
      }
    });
  });
}

//Get all entries from data.json file
function GET() {
  return new Promise((res, rej) => {
    fs.readFile('data.json', 'utf8', (err, result) => {
      if (err) {
        rej(err);
      } else {
        res(result);
      }
    });
  });
}

//Add an entry to data.json file
function POST(description) {
  return new Promise((res, rej) => {
    fs.readFile('data.json', 'utf8', (err, result) => {
      if (err) {
        rej(err);
      } else {
        let data = JSON.parse(result);
        let newItem = {
          id:new Date().getTime(),
          description: description,
          status: "incomplete"
        }
        data.items.push(newItem);
        data = JSON.stringify(data);
        fs.writeFile('data.json', data, (err, result) => {
          if (err) {
            rej(err);
          } else {
            res();
          }
        });
      }
    });
  });
}

//Update an entry in data.json file
function UPDATE(id) {
  return new Promise((res, rej) => {
    fs.readFile('data.json', 'utf8', (err, result) => {
      if (err) {
        rej(err);
      } else {
        let data = JSON.parse(result);
        for (let i of data.items) {
          if (i.id === Number(id)) {
            i.status = "complete";
          }
        }
        data = JSON.stringify(data);
        fs.writeFile('data.json', data, (err, result) => {
          if (err) {
            rej(err);
          } else {
            res();
          }
        });
      }
    });
  });
}

module.exports = {
  DELETE: DELETE,
  GET: GET,
  POST: POST,
  UPDATE: UPDATE
}