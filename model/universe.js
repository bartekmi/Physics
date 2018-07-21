class Universe {
  constructor(canvas) {
    this.canvas = canvas;
    this.context = canvas.getContext('2d');
    this.particles = [];
    this.showGridLines = false;
  }

  addParticle(particle) {
    this.particles.push(particle);
  }

  deleteParticle(particle) {
    // TODO
  }
  
  setGridLines(isOn) {
    this.showGridLines = isOn;
    this.draw();
  }
  
  draw() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    this.particles.forEach(x => x.draw());
    
    if (this.showGridLines)
      this.drawGridLines();
  }

  drawGridLines() {
    this.context.strokeStyle = 'lime';
    this.context.setLineDash([3, 2]);

    this.particles.forEach(x => {
      this.drawVerticalGridLine(x);
      this.drawHorizontalGridLine(x);
    });
  }

  drawVerticalGridLine(particle) {
    this.context.beginPath();
    this.context.moveTo(particle.x, 0);
    this.context.lineTo(particle.x, this.canvas.height);
    this.context.stroke();
  }

  drawHorizontalGridLine(particle) {
    this.context.beginPath();
    this.context.moveTo(0, particle.y);
    this.context.lineTo(this.canvas.width, particle.y);
    this.context.stroke();
  }
}