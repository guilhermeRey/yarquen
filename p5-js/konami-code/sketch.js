var konamiCode = [38,38,40,40,37,39,37,39,66,65];
var k_i = 0;
var konamiActivated = false;

function setup() {
  createCanvas(400,400);
}

function draw() {
  background(0);

  if (konamiActivated)
    secretArea();
}

function secretArea() {
  fill(random(0, 255), random(0, 255), random(0, 255));
  ellipse(0, 0, 200);
  fill(random(0, 255), random(0, 255), random(0, 255));
  ellipse(400, 0, 200);
  fill(random(0, 255), random(0, 255), random(0, 255));
  ellipse(0, 400, 200);
  fill(random(0, 255), random(0, 255), random(0, 255));
  ellipse(400, 400, 200);
}

function keyPressed() {
  if (konamiCode[k_i] == keyCode) {
    k_i++;
    if (k_i == konamiCode.length) {
      konamiActivated = true;
      k_i = 0;
    }
  }
  else {
    k_i = konamiCode[0] == keyCode ? 1 : 0;
  }
}
