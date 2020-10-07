const express = require('express');
const Datastore = require('nedb');
const fs = require('fs');

const app = express();
app.listen(3000, () => console.log('listening at 3000'));

app.use(express.static('public'));
app.use(express.json({ limit: '1mb' })); // express.json() pass the incoming request to JSON data

const database = new Datastore('./data-dev/database.db');
database.loadDatabase();

app.post('/api', (req, res) => {
  let data = req.body;
  const timestamp = Date.now();
  data.timestamp = timestamp;
  data.fileName = timestamp + '.png';
  data.filePath = 'public/images/';

  const base64Data = data.image64.replace(/^data:image\/\w+;base64,/, '');
  fs.writeFileSync(
    data.filePath + data.fileName,
    base64Data,
    'base64',
    (err) => {
      console.log(err);
    }
  );
  delete data.image64;
  // the sever responses to the client with data formatted in JSON
  database.insert(data);
  res.json(data);
  //console.log(data);
  //JSON.stringfy(data) convert JS obj to JSON data
});

app.get('/api', (req, res) => {
  database.find({}, (err, data) => {
    if (err) {
      res.end();
      return;
    }
    res.json(data);
  });
});
