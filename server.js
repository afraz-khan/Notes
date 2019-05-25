const express = require('express');
const mongodb = require('mongodb');
const bodyParser = require('body-parser');
const db             = require('./config/db');
const app = express();

app.set('view engine','ejs');
app.use('/public/assets',express.static('public/assets'));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/',(req,rep)=>{
    rep.render('note')
})  

app.listen(3000)