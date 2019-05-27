const express = require('express');
const mongodb = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const db             = require('./config/db');
const ObjectID = require('mongodb').ObjectID;

const app = express();

app.set('view engine','ejs');
app.use('/public/assets',express.static('public/assets'));
app.use(bodyParser.urlencoded({ extended: true }));
var middle = bodyParser.urlencoded({extended:false})

const port=process.env.PORT || 3000

mongodb.connect(db.url,{'useNewUrlParser':true}, (err, database) => {
    if (err) return console.log(err)
    else console.log('MONgo is up')
    
    var DB = database.db('Afraz_Notable')
    var collection = DB.collection('notes')
    
    app.get('/',(req,rep)=>{
      collection.find({}).toArray(function(err,result){
        if(err) console.log('error')
        else rep.render('note',{Notes:result})
    })
      
    })

    // addding note 
    app.post('/addNote',middle,(req,rep)=>{

      var note = req.body;
      DB.collection('notes').insertOne(note, (err, result) => {
        if (err) { 
          //rep.send({ 'error': 'An error has occurred' }); 
          rep.json({msg:'error'})
        } else {
          DB.collection('notes').find({}).sort({_id:-1}).limit(1).toArray(function(err,result2){
          rep.json({msg:result2})
          });
          
        }
      })      
  })

  //searching a note
  app.post('/searchnote',middle,(req,rep)=>{
    var text = req.body.value;
    
        // DB.collection('notes').createIndex({note:"text"});
        DB.collection('notes').find({'note':{$regex : ".*"+text+".*",$options:'i'}}).toArray(function(err,result){
          if (err) rep.json({msg:'error'})
          else  rep.json({msg:result.length})
        
      })
    })

  // updating a note
  app.put('/updatenote',middle,(req,rep)=>{
    var searchID = {'_id':new ObjectID(req.body.id)}
    var note = {note:req.body.text};

    DB.collection('notes').updateOne(searchID,{$set:note},(err,result)=>{
      if(err) rep.json({msg:'error'})
      else rep.json({msg:'updated'})
    })
  })
  
  // deleting a note
  app.delete('/deletenote',middle,(req,rep)=>{
    var del_ID = {'_id':new ObjectID(req.body.id)}
    DB.collection('notes').deleteOne(del_ID,(err,result)=>{
      if(err) rep.json({msg:'error'})
      else rep.json({msg:'deleted'})
    })
  })

})
  app.listen(port, () => {
    console.log('We are live on ' + port);
    
  })
