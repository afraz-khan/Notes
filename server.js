const express = require('express');
const mongodb = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const db             = require('./config/db');

const app = express();

app.set('view engine','ejs');
app.use('/public/assets',express.static('public/assets'));
app.use(bodyParser.urlencoded({ extended: true }));

let database;

mongodb.connect(db.url, (err, database) => {
    if (err) return console.log(err)
    
    app.listen(port, () => {
      console.log('We are live on ' + port);
    });               
  })


app.get('/',(req,rep)=>{
    rep.render('note')
})  

app.listen(3000)