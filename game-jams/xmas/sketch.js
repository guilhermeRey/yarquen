var states = {
	'menu': menu,
	'main': flappySanta
};

function preload() {
	Yarquen.Resources['jingleBells'] = loadSound('resources/audio/8BitJingleBells.mp3');
	Yarquen.Resources['wintery'] = loadSound('resources/audio/wintery_loop_lower.mp3');
	Yarquen.Resources['weWishYou'] = loadSound('resources/audio/bg_wewishyou.wav');
	Yarquen.Resources['nice'] = loadSound('resources/audio/nice.wav');
	Yarquen.Resources['good'] = loadSound('resources/audio/good.mp3');

	Yarquen.Resources['gift'] = loadImage('resources/image/gift2.png');
	Yarquen.Resources['santa'] = loadImage('resources/image/santa2.png');
	Yarquen.Resources['chimney'] = loadImage('resources/image/chimney.png');
	Yarquen.Resources['chimney_body'] = loadImage('resources/image/chimney_body.png');
	Yarquen.Resources['cloud'] = loadImage('resources/image/cloud.png');
}

function setup() {
	createCanvas(windowWidth, windowHeight);
	rectMode(CENTER);

	game = new Yarquen.Game(states);
	
	game.addAudio('jingleBells');
	game.addAudio('wintery');
	game.addAudio('weWishYou');
	game.addAudio('nice');
	game.addAudio('good');

	game.goTo('menu');
}

function draw() {
	game.render();
	game.update();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function keyPressed() {
	game.onKeyPress(keyCode);
}

var touched = false;
var touchDelay = 0;

function touchEnded() {
	touchDelay++;

	if (!touched) {
		game.onTouchMoved();
		touched = true;
	}

	if (touchDelay == 2) {
		touched = false;
		touchDelay = 0;
	}
}