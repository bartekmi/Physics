function initialize() {
  // Note that these are globals

  drawArea = document.getElementById('divDrawingArea');
  svg = SVG('divDrawingArea');
  universe = new Universe();
  setDrawingAreaSize();
}

function setDrawingAreaSize() {
  svg.size(drawArea.clientWidth, drawArea.clientHeight);
}

function dragging(e) {
  e.preventDefault();
  universe.dragging(getMousePos(e));
}

function dragParticle(e) {
  universe.showGridLines();
  e.dataTransfer.setData('type', 'Particle');
}

function dragForce(e) {
  e.dataTransfer.setData('type', 'Force');
}

function dropOntoCanvas(e) {
  e.preventDefault();
  var type = e.dataTransfer.getData('type');

  if (type === 'Particle') {
    universe.addParticle(new Particle(getMousePos(e)));
    universe.hideGridLines();
  }
}

// ==========================================================
//                          UTILITIES
// ==========================================================

function getMousePos(evt) {
    var rect = drawArea.getBoundingClientRect();
    return {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top
    };
}
