
// declarations
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');


// setup
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());




let root = [];
let rootPath = './';
let storePath = './src/app/store/slices';
// define routes
app.get('/', (req, res) => {
  res.json('you got it dude!');
  root = fs.readdirSync(storePath);
  console.log('root', root);
});

app.post('/', (req, res) => {
  req.body.root = root;
  console.log('body', req.body);
  res.json(req.body);
});



app.listen(3000, () => console.log('Example app listening on port 3000!'));
