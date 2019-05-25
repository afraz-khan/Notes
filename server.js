const express = require('express');
const mongodb = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const db             = require('./config/db');

const app = express();

app.set('view engine','ejs');
app.use('/public/assets',express.static('public/assets'));
app.use(bodyParser.urlencoded({ extended: true }));

var port  = 3000

mongodb.connect(db.url,{'useNewUrlParser':true}, (err, database) => {
    if (err) return console.log(err)
    
    var DB = database.db('Afraz_Notable')
    var collection = DB.collection('notes')
    
    app.get('/',(req,rep)=>{
        console.log(DB.collection('notes').find())
        rep.render('note')
    })

                   
  })

  app.listen(port, () => {
    console.log('We are live on ' + port);
    
  });


  
