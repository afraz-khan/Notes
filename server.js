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
    else console.log('MONgo is up')
    
    var DB = database.db('Afraz_Notable')
    var collection = DB.collection('notes')
    
    app.get('/',(req,rep)=>{
      collection.find({}).toArray(function(err,result){
        if(err) console.log('error')
        else console.log(result); rep.render('note')
      })
    })
    // app.get('/',(req,rep)=>{
    //   var note={'text':'asdasd','body':'sdfgh'}
    //   DB.collection('notes').insert(note, (err, result) => {
    //     if (err) { 
    //       //rep.send({ 'error': 'An error has occurred' }); 
    //       console.log('error')
    //       rep.render('note')
    //     } else {
    //       console.log('gone')
    //       rep.render('note')
    //     }
    //   });
        
    

    
             
  })

  app.listen(port, () => {
    console.log('We are live on ' + port);
    
  });


  
