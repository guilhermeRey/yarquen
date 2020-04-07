var resources = {};
resources.defaultCellSize = { w: 40, h: 40 };

resources.colors = {
	WHITE: [255, 255, 255],
	BLACK: [0, 0, 0],
	YELLOW: [255, 255, 0]
};

resources.keys = {
	ARROW_UP: 38,
	ARROW_RIGHT: 39,
	ARROW_DOWN: 40,
	ARROW_LEFT: 37,
	ENTER: 13,
	SPACE: 32,
	CTRL: 17,
	ESC: 27
};

resources.images = {
	menu: {
		path: 'resources/menu.png',
		img: null
	},
	level1: {
		path: 'resources/Level1.png',
		img: null
	},
	player: {
		path: 'resources/idle.png',
		img: null
	},
	portal: {
		path: 'resources/portal.png',
		img: null
	},
	battery: {
		path: 'resources/battery.png',
		img: null
	},
	pendrive: {
		path: 'resources/pendrive.png',
		img: null
	},
	speedCapsule: {
		path: 'resources/speed_capsule.png',
		img: null
	}
};

resources.sprites = {
	player: {
		load: function () {
			var directions = ['down', 'up', 'right', 'left'];
			for (var i  = 0; i < directions.length; i++) {
				resources.sprites.player.animations[directions[i]] = [];
				for (var j = 0; j < 4; j++)
					resources.sprites.player.animations[directions[i]].push(loadImage("resources/" + directions[i] + '_' + j + ".png"));
			}
		},
		animations: {}
	}
};

resources.music = {
	level1: {
		path: 'resources/10_Final_Breath.mp3',
		mp3: null
	},
	menu: {
		path: 'resources/09_Indiscriminate.mp3',
		mp3: null
	},
	hit: {
		path: 'resources/hit.wav',
		mp3: null	
	}
};

resources.loadImages = function () {
	console.log('Loading images and sprites');

	for (var key in resources.images)
		resources.images[key].img = loadImage(resources.images[key].path);

	for (var key in resources.sprites)
		resources.sprites[key].load();

	for (var key in resources.music)
		resources.music[key].mp3 = loadSound(resources.music[key].path);
};
