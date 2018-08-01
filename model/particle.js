const RADIUS = 7;
const MAX_SCREEN = 10000;
const COLOR_PARTICLE = 'lime';
const COLOR_LINE_UNSELECTED = 'lime';
const COLOR_LINE_SELECTED = 'orange';

class Particle {

  constructor(point) {
    this.x = point.x;
    this.y = point.y;
    this.xAnchorParticle = null;
    this.yAnchorParticle = null;

    this.createSvg();
    this.move();
  }

  createSvg() {
    this.svg = svg.circle(RADIUS * 2).fill(COLOR_PARTICLE);
    this.svg.draggable();
    this.svg.on('dragmove.namespace', event => this.dragged(event));

    var stroke = {
      color: COLOR_LINE_UNSELECTED,
      width: 2,
      dasharray: [6, 4]
    };

    this.gridLineHorizontal = svg.line().stroke(stroke).hide();
    this.gridLineVertical = svg.line().stroke(stroke).hide();
  }

  effectiveX() {
    return this.xAnchorParticle == null ? this : this.xAnchorParticle;
  }

  effectiveY() {
    return this.yAnchorParticle == null ? this : this.yAnchorParticle;
  }

  move() {
    var x = this.effectiveX().x;
    var y = this.effectiveY().y;

    this.svg.center(x, y);
    this.gridLineHorizontal.plot(0, y, MAX_SCREEN, y);
    this.gridLineVertical.plot(x, 0, x, MAX_SCREEN);
  }

  showGridLines() {
    if (this.yAnchorParticle === null)
      this.gridLineHorizontal.show();
    if (this.xAnchorParticle === null)
      this.gridLineVertical.show();
  }

  hideGridLines() {
    this.gridLineHorizontal.hide();
    this.gridLineVertical.hide();
  }

  gridLineHorizontalSelect(isSelected) {
    if (isSelected)
      this.gridLineHorizontal.stroke(COLOR_LINE_SELECTED);
    else
      this.gridLineHorizontal.stroke(COLOR_LINE_UNSELECTED);
  }

  gridLineVerticalSelect(isSelected) {
    if (isSelected)
      this.gridLineVertical.stroke(COLOR_LINE_SELECTED);
    else
      this.gridLineVertical.stroke(COLOR_LINE_UNSELECTED);
  }

  //--------------------------------- DRAGGING ------------------------------------
  dragged(event) {
    var point = event.detail.p;

    this.effectiveX().x = point.x;
    this.effectiveY().y = point.y;

    _.filter(universe.particles, p => p.effectiveX === this.effectiveX).forEach(p => p.move());
    _.filter(universe.particles, p => p.effectiveY === this.effectiveY).forEach(p => p.move());
  }
}