var timeBomb;

function preload() {
	resources.loadImages();
}

function setup() {
	createCanvas(1000, 700);
	timeBomb = new TimeBombGame();
}

function draw() {
	background(0);

	timeBomb.render();
	timeBomb.update();
}

function keyPressed() {
	timeBomb.onKeyPress(keyCode);
}
