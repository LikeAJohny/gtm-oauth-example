const express = require('express');
const app = express();
const routes = require('./config/routes.js');

app.set('view engine', 'pug');
app.use('/', routes);

app.listen(3030);