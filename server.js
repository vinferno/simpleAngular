
// declarations
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

// setup
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'dist')));
let root = [];
let storeFiles = [];
let rootPath = './';
let storePath = './src/app/store/slices';

const dist = './dist/';



// define routes
app.get('/', (req, res) => {
  console.log('someone accessed this');
  res.sendFile(dist + 'index.html');
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
  });
  res.json(req.body);
});


app.post('/read-dir', (req, res) => {
  console.log(req.body, req.body);
  if (req.body.hasOwnProperty('path')) {
    console.log('path', req.body.path);
    const keys = fs.readdirSync( rootPath + req.body.path);
    const results = keys.map( key => {
      const data = {};
      data.key = key;
      data.isDir = fs.lstatSync( rootPath +  req.body.path + '/' + key).isDirectory();
      return data;
    });
    res.json(results);
  }
  else {
    res.json({error: 'wrong path'});
  }
});

app.post('/read-file', (req, res) => {
  console.log(req.body, req.body);
  if (req.body.hasOwnProperty('path')) {
    const result = fs.readFileSync(rootPath + req.body.path, 'utf8');
    res.json(result);
  }
  else {
    res.json({error: 'wrong path'});
  }
});

app.post('/write-file', (req, res) => {
  console.log('body', req.body);
  if (!req.body.object) { return; }
  const check = fs.existsSync(rootPath  + 'src/app/store/slices/' + req.body.newDataName);

  if(!check) {
    fs.mkdirSync(rootPath + 'src/app/store/slices/' + req.body.newDataName)
  }
  const success = fs.writeFileSync(rootPath  + 'src/app/store/slices/' +
    req.body.newDataName + '/index.json', req.body.object, 'utf8');
  const action = fs.writeFileSync(rootPath  + 'src/app/store/slices/' +
    req.body.newDataName + '/' + req.body.newDataName +'.ts', req.body.actionFileCreated, 'utf8');
  const main = fs.writeFileSync(rootPath  + 'src/app/store/main.ts', req.body.mainFileCreated, 'utf8');
  res.json({ success, action, main });
});


app.listen(3000, () => console.log('Example app listening on port 3000!'));


function readDir(req) {


}
