const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const db = require('./database');
const port = 3000;
const Todo = require('./controllers');
const router = require('./routes')

app.use(bodyParser.json());
router(app);
app.listen(port, ()=>{console.log('server running......')});