
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
let storeFiles = [];
let rootPath = './';
let storePath = './src/app/store/slices';
// define routes
app.get('/', (req, res) => {
  res.json('you got it dude!');
  storeFiles = fs.readdirSync(storePath);
  console.log('root', root);
});

app.post('/', (req, res) => {
  req.body.storeFiles = storeFiles;
  if (!storeFiles.length) {
    storeFiles = fs.readdirSync(storePath);
  }

  req.body.databases = {};

  storeFiles.forEach( slice => {
    req.body.databases[slice] = fs.readdirSync(storePath + '/' + slice);
  })

  console.log('body', req.body);
  res.json(req.body);
});



app.listen(3000, () => console.log('Example app listening on port 3000!'));


function readDir(req) {


}
