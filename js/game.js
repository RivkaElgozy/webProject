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
let colors = ["red", "yellow", "violet", "green", "pink", "orange", "purple", "brown", "magenta", "cyan", "red", "yellow", "violet", "green", "pink", "orange", "purple", "brown", "magenta", "cyan"];
let shuffledColors = shuffle(colors);
let flippedTiles = [];
let clickedTile = 0;

// create tiles
for (let i = 0; i < 5; i++) {
  for(let j = 0; j < 4; j++) {
    tiles.push(new Tile(i * 150, j * 150, shuffledColors.pop()));
  }
}

function draw() {
  for (let i = 0; i < tiles.length; i++) {
    if (tiles[i].revealed === false) {
      tiles[i].drawDown(ctx);
    } else {
      tiles[i].drawUp(ctx);
    }
  }
}

function update() {
  console.log(clickedTile);
  if (flippedTiles.length === 2) {
    let first = flippedTiles[0];
    let second = flippedTiles[1];

    if (tiles[first].color === tiles[second].color) {
      flippedTiles = [];
      clickedTile = 0;
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
  // show tiles
  // for (let i = 0; i < tiles.length; i++){
  //   tiles[i].drawUp(ctx);
  // }
  // sleep(3000)

  // //hide tiles
  // for (let i = 0; i < tiles.length; i++){
  //   tiles[i].drawDown(ctx);
  // }
  update();
  requestAnimationFrame(gameLoop);
}

function sleep(milliseconds) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
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

// draw();
// console.log(tiles.length)
//    for (let i = 0; i < tiles.length; i++){
//     console.log("up");
//      tiles[i].drawUp(ctx);
//    }
// console.log("hello")
// sleep(4000)
// for (let i = 0; i < tiles.length; i++){
//   tiles[i].drawDown(ctx);
// }
// console.log("bye")
draw()
for (let i = 0; i < tiles.length; i++){
  tiles[i].revealed = true;
  flippedTiles.push(i);
}
update()
sleep(3000)
for (let i = 0; i < tiles.length; i++){
  tiles[i].revealed = false;
}
flippedTiles=[]
update()
gameLoop();

