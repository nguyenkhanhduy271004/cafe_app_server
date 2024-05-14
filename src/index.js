const express = require('express');
const app = express();
const morgan = require('morgan');
const nodemailer = require('nodemailer');
const uuid = require('uuid');
const validator = require('email-validator');
const path = require('path');
const port = 3001;

const db = require('../config/db');
db.connect();

app.use(morgan('combined'));
app.use(express.json());
const { format } = require('date-fns');


const routes = require('./routes');
routes(app);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
