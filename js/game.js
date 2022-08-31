const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

import Tile from './Tile.js';

// helper functions
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
// let colors = ["red", "yellow", "violet", "green", "pink", "orange", "purple", "brown", "magenta", "cyan", "red", "yellow", "violet", "green", "pink", "orange", "purple", "brown", "magenta", "cyan"];
let colors = ["red", "yellow", "violet", "green","red", "yellow", "violet", "green"]
let shuffledColors = shuffle(colors);
let flippedTiles = [];
let clickedTile = 0;
let flag = 0;

const progressBar = document.getElementById("progress-bar");
const progressNext = document.getElementById("progress-next");
const progressPrev = document.getElementById("progress-prev");
const steps = document.querySelectorAll(".step");
let active = 1;

// create tiles
for (let i = 0; i < 4; i++) {
  for(let j = 0; j < 2; j++) {
    tiles.push(new Tile(i * 200, j * 200, shuffledColors.pop()));
  }
}

function draw() {
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
  console.log(clickedTile);
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
window.setTimeout(gameLoop, 5000);

function end(){
  const max_fireworks = 5,
  max_sparks = 50;
  let canvas = document.getElementById('canvas');
  let context = canvas.getContext('2d');
  let fireworks = [];
 
  for (let i = 0; i < max_fireworks; i++) {
    let firework = {
      sparks: []
    };
    for (let n = 0; n < max_sparks; n++) {
      let spark = {
        vx: Math.random() * 5 + .5,
        vy: Math.random() * 5 + .5,
        weight: Math.random() * .3 + .03,
        red: Math.floor(Math.random() * 2),
        green: Math.floor(Math.random() * 2),
        blue: Math.floor(Math.random() * 2)
      };
      if (Math.random() > .5) spark.vx = -spark.vx;
      if (Math.random() > .5) spark.vy = -spark.vy;
      firework.sparks.push(spark);
    }
    fireworks.push(firework);
    resetFirework(firework);
  }
  window.requestAnimationFrame(explode);
  
  function resetFirework(firework) {
    firework.x = Math.floor(Math.random() * canvas.width);
    firework.y = canvas.height;
    firework.age = 0;
    firework.phase = 'fly';
  }
  
  function explode() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    fireworks.forEach((firework,index) => {
      if (firework.phase == 'explode') {
          firework.sparks.forEach((spark) => {
          for (let i = 0; i < 10; i++) {
            let trailAge = firework.age + i;
            let x = firework.x + spark.vx * trailAge;
            let y = firework.y + spark.vy * trailAge + spark.weight * trailAge * spark.weight * trailAge;
            let fade = i * 20 - firework.age * 2;
            let r = Math.floor(spark.red * fade);
            let g = Math.floor(spark.green * fade);
            let b = Math.floor(spark.blue * fade);
            context.beginPath();
            context.fillStyle = 'rgba(' + r + ',' + g + ',' + b + ',1)';
            context.rect(x, y, 4, 4);
            context.fill();
          }
        });
        firework.age++;
        if (firework.age > 100 && Math.random() < .05) {
          resetFirework(firework);
        }
      } else {
        firework.y = firework.y - 10;
        for (let spark = 0; spark < 15; spark++) {
          context.beginPath();
          context.fillStyle = 'rgba(' + index * 50 + ',' + spark * 17 + ',0,1)';
          context.rect(firework.x + Math.random() * spark - spark / 2, firework.y + spark * 4, 4, 4);
          context.fill();
        }
        if (Math.random() < .001 || firework.y < 200) firework.phase = 'explode';
      }
    });
    window.requestAnimationFrame(explode);
  }
}