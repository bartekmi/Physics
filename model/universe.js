const MIN_SNAP_DISTANCE = 7;

class Universe {
  constructor() {
    this.particles = [];
  }

  width() {
    return drawArea.clientWidth;
  }

  height() {
    return drawArea.clientHeight;
  }

  addParticle(particle) {
    var snapToParticleVertical = this.findSnapToParticle('x', particle.x);
    if (snapToParticleVertical != null) {
      particle.x = null;
      particle.xAnchorParticle = snapToParticleVertical;
    }
    
    var snapToParticleHorizontal = this.findSnapToParticle('y', particle.y);
    if (snapToParticleHorizontal != null) {
      particle.y = null;
      particle.yAnchorParticle = snapToParticleHorizontal;
    }
    
    this.particles.push(particle);
    
    particle.move();
  }

  deleteParticle(particle) {
    // TODO
  }

  setGridLines(isOn) {
    this.showGridLines = isOn;
    this.draw();
  }

  // --------------------- GRID LINES ----------------------

  dragging(dragPoint) {
    this.draggingHilightGridLine('x', (p,s) => p.gridLineVerticalSelect(s), dragPoint.x);
    this.draggingHilightGridLine('y', (p,s) => p.gridLineHorizontalSelect(s), dragPoint.y);
  }

  draggingHilightGridLine(xy, selectLine, mouseXY) {
    // First, un-select all lines
    this.particles.forEach(p => selectLine(p, false));

    var snapToParticle = this.findSnapToParticle(xy, mouseXY);
    
    if (snapToParticle != null)
      selectLine(snapToParticle, true);
  }
  
  findSnapToParticle(xy, mouseXY) {
    var ordered = _.sortBy(this.particles, p => Math.abs(p[xy] - mouseXY));
    var closest = _.first(ordered);

    if (closest != undefined && Math.abs(closest[xy] - mouseXY) <= MIN_SNAP_DISTANCE)
      return closest;
    
    return null;
  }

  showGridLines() {
    this.particles.forEach(p => p.showGridLines());
  }

  hideGridLines() {
    this.particles.forEach(p => p.hideGridLines());
  }
}