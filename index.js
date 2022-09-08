var pointer = 0;
var life = 3;
let numLength = 0;
let cnt = 0;
let index = [];
let items = [];
let counter = 0;

const axios = require('axios').default;
const https = require('https');

const httpsAgent = new https.Agent({rejectUnauthorized: false});
const express = require('express')
const app = express()
app.use(express.static('static'))
app.use(express.static(__dirname + '/public'));



app.use('/', express.static('index.html'))

  
  
app.use(express.json())

const PORT = process.env.PORT || 3001

app.listen(PORT)
console.log("server is listening in port 3001")

app.use(express.json());
app.get('/api/get-user-name', (req, res) => {
    for(let i=0; i<items.length; i++){
        if(items[i].name == req.query.userName){
            res.send("Exists");
        }
    }
    res.send("NotExists");
});

app.use(express.json());
app.get('/api/get-high-score', (req, res) => {
    let j = 0;
    if(req.query.level==4){
        j=0;
    }
    else if(req.query.level==6){
        j=1;
    }
    else {
        j=2;
    }
    for(let i=0; i<items.length; i++){
        if(items[i].name == req.query.userName){
            res.send(""+items[i].highScores[j]);
        }
    }
});

app.use(express.json());
app.post('/api/update-new-user', (req, res) => {
    items.push(req.body);
});

app.post('/api/update-high-score', (req, res) => {
    let j = 0;
    if(req.body.level==4){
        j=0;
    }
    else if(req.body.level==6){
        j=1;
    }
    else {
        j=2;
    }
    for(let i=0; i<items.length; i++){
        if(items[i].name == req.body.userName && items[i].highScores[j] > req.body.highScore){
            items[i].highScores[j] = req.body.highScore;
            break;
        }
    }
    res.send("200 ok");
});

