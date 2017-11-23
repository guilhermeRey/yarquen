var points = [],
    r = 500,
    N_in = 0,
    N_max = 50000,
    step = 50;

function setup() {
  createCanvas(500, 500);
}

function isIn(p) {
  return Math.sqrt(Math.pow(p.x, 2) + Math.pow(p.y, 2)) <= r;
};

function getRandomPoint() {
  var _x = random(0, r),
      _y = random(0, r);
  return {
    x: _x,
    y: _y
  };
}

function addPoint() {
  var p = getRandomPoint();
  var isPointIn = isIn(p);
  N_in += isPointIn ? 1 : 0;
  points.push({
    x: p.x,
    y: p.y,
    isIn: isPointIn
  });
}

function addPoints(n) {
  for (var i = 0; i < n; i++)
    addPoint();
}

function drawEllipse() {
  fill(0, 255, 0);
  noStroke();
  ellipse(0, 0, r * 2);
}

function draw() {
  background(0);
  drawEllipse();

  if (points.length < N_max) {
    addPoints(step);
  }

  strokeWeight(3);
  for (var i = 0; i < points.length; i++) {
    if (points[i].isIn)
      stroke(0, 120, 0);
    else
      stroke(255, 0, 0);

    point(points[i].x, points[i].y);
  }

  var pi = (4 * N_in) / points.length;
  textSize(40);
  textFont('Courier');
  strokeWeight(10);
  stroke(255,255,255);
  fill(0);
  text('pi: ' + pi.toFixed(4), 125, 50);

}
