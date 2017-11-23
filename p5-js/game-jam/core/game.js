function Game(options) {
	this.screens = {};
	this.activeScreen = null;

	if (options && options.screens) {
		for (var i = 0; i < options.screens.length; i++) {
			this.addScreen(options.screens[i]);
		}
		this.goTo(options.screens[0]);
	}

	this.addScreen = function (screen) {
		this.screens[screen.name] = screen;
	};

	this.goTo = function (screenName) {
		if (!this.screens[screenName])
			return;

		if (this.activeScreen && this.activeScreen.onLeave)
			this.activeScreen.onLeave();

		this.activeScreen = this.screens[screenName];
		if (this.activeScreen.onStart)
			this.activeScreen.onStart();
	};

	this.render = function () {
		this.activeScreen.render(this);
	};

	this.update = function () {
		this.activeScreen.update(this);
	};

	this.onKeyPress = function (keyCode) {
		this.activeScreen.onKeyPress(keyCode);
	};
};