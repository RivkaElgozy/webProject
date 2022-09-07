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
    for(let i=0; i<items.length; i++){
        if(items[i].name == req.query.userName){
        res.send(""+items[i].highScore);
        }
    }
});

app.use(express.json());
app.post('/api/update-new-user', (req, res) => {
    items.push(req.body);
    res.send("200 ok");
});

app.post('/api/update-high-score', (req, res) => {
    for(let i=0; i<items.length; i++){
        if(items[i].name == req.body.name){
            items[i].highScore = req.body.highScore;
            break;
        }

    }
    res.send("200 ok");
});

