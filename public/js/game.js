var para = new URLSearchParams(window.location.search);
var name = para.get("userName")
var highScore = para.get("highScore");
let level = para.get("level");

const canvas = document.getElementById("canvas");
var userName = document.getElementById("userName");
const ctx = canvas.getContext("2d");
// ctx.canvas.width  = window.innerWidth;
// ctx.canvas.height = window.innerHeight;

import Tile from './Tile.js';
// import axios from 'axios';
// import index from '../index.js';
var name2 = document.createTextNode("kjhgfd");
userName.appendChild(name2)

// helper functions to shuffle an array
function shuffle(array) {
  let currentIndex = array.length, temporaryValue, randomIndex;
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

let tiles = [];
let colors = ["red", "red",  "yellow", "yellow", "violet", "violet", "green",  "green"] // the optional colors
let shuffledColors = shuffle(colors.slice(0, level)); // get sub array according to the level
let flippedTiles = [];
let clickedTile = 0; // counts the open cards
let flag = 0, flagEND = 0;
const FPS = 30;
var bs = 30;
var xv, yv;


const progressBar = document.getElementById("progress-bar");
const steps = document.querySelectorAll(".step");
let active = 1;

const fireDiv = document.querySelector('.fireworksDiv');
const fireworks = new Fireworks(fireDiv,{
  delay:{min:10, max:15},
  trace: 5,
  speed:0.5,
  particles: 200,
  sound:{
    enable:true,
    files:['https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'],
    volume: {min: 1, max: 2}
  }
});


// create tiles
for (let i = 0; i < level/2; i++) {
  for(let j = 0; j < 2; j++) {
    // random ball starting speed (between 25 and 100 pps)
    xv = Math.floor(Math.random() * 76 + 25) / FPS;
    yv = Math.floor(Math.random() * 76 + 25) / FPS;

    // xv = Math.floor(Math.random() * 76 + 25) / 100;
    // yv = Math.floor(Math.random() * 76 + 25) / 100;
    
    // random ball direction
    if (Math.floor(Math.random() * 2) == 0) {
        xv = -xv;
    }
    if (Math.floor(Math.random() * 2) == 0) {
        yv = -yv;
    }
    tiles.push(new Tile(i * 300 +130,xv, j * 300 + 40,yv, shuffledColors.pop()));
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < tiles.length; i++) {
    if (tiles[i].revealed === false && flag === 1) {
      tiles[i].drawDown(ctx);
    } else {
      tiles[i].drawUp(ctx);
    }
  }
  flag = 1;
}

function update() {
  // console.log(clickedTile);
  if (flippedTiles.length === 2) {
    let first = flippedTiles[0];
    let second = flippedTiles[1];

    if (tiles[first].color === tiles[second].color) {
      flippedTiles = [];
      clickedTile = 0;

      //update the step progress bar
      active++;
      if (active > steps.length) {
        active = steps.length;
      }
      updateProgress();
    }

    if (tiles[first].color !== tiles[second].color) {
      setTimeout(function() {
        tiles[first].revealed = false;
        tiles[second].revealed = false;
        clickedTile = 0;
      }, 1500);
    }
    flippedTiles = [];
  }
}

function gameLoop() {
  for (let i = 0; i < tiles.length; i++){
    tiles[i].x += tiles[i].xv;
    tiles[i].y += tiles[i].yv;
    
    // bounce the ball off each wall
    if (tiles[i].x - bs / 2 < 0 && tiles[i].xv < 0) {
      tiles[i].xv = -tiles[i].xv;
    }
    if (tiles[i].x  + 3.2*bs > canvas.width && tiles[i].xv > 0) {
      tiles[i].xv = -tiles[i].xv;
    }
    if (tiles[i].y - bs / 2 < 0 && tiles[i].yv < 0) {
      tiles[i].yv = -tiles[i].yv;
    }
    if (tiles[i].y + 3.2*bs > canvas.height && tiles[i].yv > 0) {
      tiles[i].yv = -tiles[i].yv;
    }
    // 
    // for (let j = 0; j < tiles.length; j++){
    //   if(!(tiles[i].x + tiles[i].size < tiles[j].x || tiles[i].x > tiles[j].x + tiles[j].size || tiles[i].y + tiles[i].size < tiles[j].y || tiles[i].y > tiles[j].y + tiles[j].size)){
    //     if(!(tiles[i].x + tiles[i].size < tiles[j].x)){
    //       tiles[j].xv = -tiles[j].xv;
    //       tiles[j].x += tiles[j].xv;
    //     }
    //     if(!(tiles[i].x > tiles[j].x + tiles[j].size)){
    //       tiles[i].xv = -tiles[i].xv;
    //       tiles[i].x += tiles[i].xv;
    //     }
    //     if(!(tiles[i].y + tiles[i].size < tiles[j].y)){
    //       tiles[j].yv = -tiles[j].yv;
    //       tiles[j].y += tiles[j].yv;
    //     }
    //     if(!(tiles[i].y > tiles[j].y + tiles[j].size)){
    //       tiles[i].yv = -tiles[i].yv;
    //       tiles[i].y += tiles[i].yv;
    //     }
    //   }       
    // }
    // tiles[i].x += tiles[i].xv;
    // tiles[i].y += tiles[i].yv;//
  }
  draw();
  update();

  requestAnimationFrame(gameLoop);
}

document.addEventListener("click", function(e) {
  const rect = canvas.getBoundingClientRect();
  const mouseX = e.clientX - rect.left;
  const mouseY = e.clientY - rect.top;
  for (let i = 0; i < tiles.length; i++) {
    if (clickedTile <= 1 && tiles[i].is_selected(mouseX, mouseY) && tiles[i].revealed !== true) {
      tiles[i].revealed = true;
      flippedTiles.push(i);
      clickedTile++;
    }
  }
});

const updateProgress = () => {
  // toggle active class on list items
  steps.forEach((step, i) => {
    if (i < active) {
      step.classList.add("active");
    } else {
      step.classList.remove("active");
    }
  });
  // set progress bar width  
  progressBar.style.width = 
    ((active - 1) / (steps.length - 1)) * 100 + "%";
  if (active !== 1 && active === steps.length) {
    end();
  }
}

draw();
startClock();
window.setTimeout(gameLoop, 5000);

function end(){
  flagEND = 1;

  //fireworks
  fireworks.start();
  var context = new AudioContext();
  document.addEventListener('click', () => {
    context.resume().then(() => {
      console.log('Playback resumed successfully');
    });
  });
}
function startClock() {
  var timer;
var ele = document.getElementById('mins');

(function (){
  var sec = 0;
  var min = 0;
  let flag = 0;
  timer = setInterval(()=>{
    if(flag === 0){
      if(sec === 4){
        flag = 1;
        sec = 0;
      }
      ele.innerHTML = '00:00';
    }
    else{
      if(sec < 10)
        if(min < 10)
          ele.innerHTML = '0'+min+':0'+sec;
        else
          ele.innerHTML = min+':0'+sec;
      else
        if(min<10)
          ele.innerHTML = '0'+min+':'+sec;
        else{
          ele.innerHTML = '10:00';
          end()
        }
          //go to game over
      if(sec === 60) {
        sec = 0;
        min++;
      }
    }
    if(flagEND === 0)
      sec++;
  }, 1000) // each 1 second
})() 
}