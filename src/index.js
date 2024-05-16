const express = require('express');
const app = express();
const morgan = require('morgan');
const port = 3001;

const db = require('../config/db');
db.connect();

app.use(morgan('combined'));
app.use(express.json());


const routes = require('./routes');
routes(app);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
