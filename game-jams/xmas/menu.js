var menu = new Yarquen.Screen({ name: 'Menu' });

menu.onStart = function (game) {
	this.start = false;
	game.resources.audio['weWishYou'].loop();

	this.bg = new Background();
	this.snow = new Snow();
};

menu.onLeave = function (game) {
	game.resources.audio['weWishYou'].stop();
};

menu.render = function () {	
	background(14, 65, 84);
	noStroke();
	this.bg.render();
	this.snow.render();

	textSize(Yarquen.Helpers.textSize(50));
	textFont("Bungee");
	textAlign('center');

	text('Mission: Gift', width / 2, 0.5 * height);

	fill(255);	
	textSize(Yarquen.Helpers.textSize(30));
	text('TAP TO PLAY', width / 2, (0.5 * height) + 0.05 * height);


	fill(255);
	textSize(Yarquen.Helpers.textSize(20));
	text('made by @GuilhermeRey', width / 2, (0.5 * height) + 3 * 0.05 * height);
	fill(24, 255, 60);
	text('youtube.com/yarquen', width / 2, (0.5 * height) + 4 * 0.05 * height);
};

menu.update = function (game) {
	this.snow.update();
	if (this.start)
		game.goTo('main');
};

menu.onKeyPress = function (keycode) {
	if (keycode == Yarquen.Keys.SPACE_BAR)
		this.start = true;
};

menu.onTouchMoved = function () {
	this.start = true;
}