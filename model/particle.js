class Particle {
  constructor(canvas, x,y) {
    this.x = x;
    this.y = y;
    this.context = canvas.getContext('2d');
  }

  draw() {
    var radius = 4;

    this.context.beginPath();
    this.context.arc(this.x, this.y, radius, 0, 2 * Math.PI, false);
    this.context.fillStyle = 'lime';
    this.context.fill();
  }
}