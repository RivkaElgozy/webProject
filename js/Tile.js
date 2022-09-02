export default class Tile {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.size = 140;
    this.revealed = false;
  }

  drawDown(ctx) {
    ctx.fillStyle = "rgb(22, 11, 107)";
    ctx.fillRect(this.x, this.y, this.size, this.size);
  }

  drawUp(ctx) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.size, this.size);
  }    
  
  is_selected(x, y) {
    return x >= this.x && x <= this.x + this.size && y >= this.y && y <= this.y + this.size;
  }
}
