require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const db = require('./database');
const port = 3000;
const router = require('./routes');
const bycrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

app.use(bodyParser.json());
router(app);
app.listen(port, ()=>{console.log('server running......')});