/*=======================
Import Node Modules
=========================*/

const express = require('express'); //Fast, unopinionated, minimalist web framework for node.
const app = express(); //Initiate express application
const router = express.Router(); //Creates a new router object
const path = require('path'); //NodeJS Package for file paths
const bodyParser = require('body-parser'); //Parse incoming request bodies in a middleware before your handlers, available under the req.body property.
const cors = require('cors'); //CORS is a node.js 
const logger = require('morgan');
const mysql = require('mysql');
const connection = require('express-myconnection');
const port = process.env.PORT || 8080;

app.use(connection(mysql, {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'dbtriune'

}, 'request'));


/*======================
Middleware
========================*/

app.use(logger('dev')); 
app.use(cors({ origin: 'http://localhost:4200'}));
app.use(bodyParser.urlencoded({ extended: false })); //Parse application/x-www-form-urlencoded
app.use(bodyParser.json()); //Parse application/json
app.use(express.static(__dirname + '/client/dist/')); //Provide static directory for frontend

//Connect server to Angular 2 Index.html
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/dist/index.html'));
});

//Start Server: Listen on port 8080
app.listen(port, () => {
    console.log('listening on port' + port);
})
