function initialize() {
  // Note that these are globals
  canvas = document.getElementById('canvasMain');
  universe = new Universe(canvas);
  
  setCanvasSize();
  
  console.log('Canvas width x height = ' + canvas.width + ' x ' + canvas.height);
}

function setCanvasSize() {
  var parent = document.getElementById('divCanvasParent');
  canvas.width = parent.clientWidth;
  canvas.height = parent.clientHeight;
}

function allowDrop(e) {
  e.preventDefault();
}

function dragParticle(e) {
  universe.setGridLines(true);
  universe.draw();
  e.dataTransfer.setData('type', 'Particle');
}

function dragForce(e) {
  e.dataTransfer.setData('type', 'Force');
}

function dropOntoCanvas(e) {
  e.preventDefault();
  var type = e.dataTransfer.getData('type');

  var rect = canvas.getBoundingClientRect();
  var x = e.clientX - rect.left;
  var y = e.clientY - rect.top;

  universe.addParticle(new Particle(canvas, x, y));
  universe.setGridLines(false);
  universe.draw();
}

function createParticle(canvas, x, y) {
  var context = canvas.getContext('2d');
  var centerX = x;
  var centerY = y;
  var radius = 4;

  context.beginPath();
  context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
  context.fillStyle = 'lime';
  context.fill();
  //  context.lineWidth = 5;
  //  context.strokeStyle = '#003300';
  //  context.stroke();
}

