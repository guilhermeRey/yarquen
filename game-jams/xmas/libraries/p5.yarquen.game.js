var Yarquen = {
	p5_states: [],
	Game: function (states) {
		this.screens = {};
		this.activeScreen = null;
		this.scores = [];
		this.resources = {
			audio: {},
			image: {}
		};

		this.addScreen = function (stateName, screen) {
			this.screens[stateName] = screen;
		};

		this.loadStates = function (states) {
			for (var i = 0; i < states.length; i++) {
				this.addScreen(states[i]);
			}
		};

		this.goTo = function (state) {
			if (!this.screens[state])
				return;

			if (this.activeScreen && this.activeScreen.onLeave)
				this.activeScreen.onLeave(this);

			this.activeScreen = this.screens[state];
			if (this.activeScreen.onStart)
				this.activeScreen.onStart(this);
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

		this.onTouchMoved = function () {
			this.activeScreen.onTouchMoved();
		};

		this.addAudio = function (name) {
			this.resources.audio[name] = Yarquen.Resources[name];
		};

		this.addImage = function (name) {
			this.resources.image[name] = Yarquen.Resources[name];
		}

		if (states) {
			for (var stateName in states)
				this.addScreen(stateName, states[stateName]);
		}
	},
	Screen: function (options) {
		this.name = options.name;
		this.onStart = options.onStart;
		this.onLeave = options.onLeave;
		this.render = options.render;
		this.update = options.update;
		this.onKeyPress = options.onKeyPress;
	},
	Keys: {
		ARROW_UP: 38,
		ARROW_RIGHT: 39,
		ARROW_DOWN: 40,
		ARROW_LEFT: 37,
		ENTER: 13,
		SPACE_BAR: 32,
		CTRL: 17,
		ESC: 27
	},
	Helpers: {
		widthProportion: function (n) {
			return width * n / 100;
		},
		textSize: function (n) {
			return width * n / 743;
		}
	},
	Resources: {}
};