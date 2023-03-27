const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const lodash = require('lodash');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static('public'));

app.get('/',(req,res)=>{
   res.render('home',{
    
   })
});





app.listen(3000, function(){
    console.log("Server start on port 3000");
});
