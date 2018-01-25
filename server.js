
// declarations
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');


// setup
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());





// define routes
app.get('/', (req, res) => {
  res.json('you got it dude!');
});

app.post('/', (req, res) => {
  console.log('body', req.body);
  res.json(req.body);
});



app.listen(3000, () => console.log('Example app listening on port 3000!'));
