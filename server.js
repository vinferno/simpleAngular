const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
app.get('/', (req, res) => res.json('Hello World!'));

app.listen(3000, () => console.log('Example app listening on port 3000!'));
