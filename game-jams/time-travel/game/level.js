function Level(options) {
	var _options = options || {
		height: 15,
		width: 25,
		portal: new Portal({
			tile: createTile(1, 1),
			image: resources.images.portal.img
		}),
		player: new Player({
			image: resources.images.player.img,
			size: {
				w: 40,
				h: 40
			}
		})
	};

	this.backgroundImage = resources.images.level1;
	this.backgroundMusic = resources.music.level1.mp3;

	this.name = 'levelScreen';
	this.isPaused = false;
	this.map = new GridMap({
		cellSize: resources.defaultCellSize,
		height: _options.height,
		width: _options.width
	});
	this.player = _options.player;
	this.portal = _options.portal;
	this.npcs = {};
	this.items = [];
	this.status = 'PLAYING';

	this.onStart = function () {
		this.backgroundMusic.play();
	};

	this.addNpc = function (npc) {
		this.npcs[npc.id] = npc;
	};

	this.setPlayerPos = function (i, j) {
		var coord = this.map.transformCoord(i, j);
		this.player.tile = { i: i, j: j };

		this.player.center.x = coord.x;
		this.player.center.y = coord.y;
	};

	this.setNpcPos = function (npc, i, j) {
		var coord = this.map.transformCoord(i, j);

		this.npcs[npc.id].center.x = coord.x;
		this.npcs[npc.id].center.y = coord.y;
	};

	this.setNpcPath = function (npc, path) {
		for (var i = 0; i < path.length; i++) {
			this.npcs[npc.id].tilePath.push(path[i]);
		}

		this.setNpcPos(npc, path[0][0], path[0][1]);
    this.npcs[npc.id].targetPoint = this.npcs[npc.id].tilePath[1];
	};

	this.addItem = function (item) {
		this.items.push(item);
	}

	this.ended = function () {
		if (this.status == 'LOST') {
			return {
				message: 'You Lost!',
				color: [200, 10, 10]
			};
		}
		else if (this.status == 'WON') {
			return {
				message: 'You Win!',
				color: [10, 200, 10]
			};
		}
	};

	this.hud = function () {
		var xStart = 630;
		for (var i = 0; i < this.player.items.length; i++)
		{
			var item = this.player.items[i];
			item.renderHud(xStart + (120 * i), 640);
		}
	};

	this.render = function () {
		imageMode(CORNER);
		image(this.backgroundImage.img, 0, 0);

		// DEBUG_MODE
		//this.map.render();

		if (this.status != 'PLAYING') {
			for (var id in this.npcs)
				this.npcs[id].renderIdle();
			this.player.renderIdle();

			var theEnd = this.ended();

			rectMode(CORNER);
			fill(0, 0, 0, 120);
			rect(0, 0, displayWidth, displayHeight);
			stroke(255, 255, 255);
			strokeWeight(15);

			var offsetY = displayHeight * 0.35;
			var offsetX = displayWidth * 0.21;

			textSize(75);
			fill(theEnd.color);
			textFont('Courier New');
			text(theEnd.message, offsetX, offsetY);
			noStroke();
		}
		else {
			imageMode(CENTER);
			this.portal.render(this.map);

			for (var i = 0; i < this.items.length; i++)
			{
				var item = this.items[i];
				var pos = this.map.transformCoord(item.tile.i, item.tile.j);
				image(item.image, pos.x, pos.y, 30, 30);
			}

			for (var id in this.npcs)
				this.npcs[id].render();

			this.player.render();

			this.hud();
		}
	};

	this.update = function () {
		if (this.pause())
			return;

		if (this.status == 'PLAYING') {
			this.player.update(this.map);

			for (var id in this.npcs) {
				this.npcs[id].update(this.map, this.player);
				if (this.npcs[id].sawPlayer)
					this.status = 'LOST';
			}

			if (this.player.currentTile) {
				for (var i = 0; i < this.items.length; i++)
				{
					var item = this.items[i];
					if (this.player.currentTile.i == item.tile.i && this.player.currentTile.j == item.tile.j)
					{
						item.gotIt(this.player);
						this.items.splice(this.items.indexOf(item), 1);
						this.player.items.push(item);

						// console.log('GOT ITEMMMMM');
						// console.log(this.player);
					}
				}

				if (this.player.currentTile.i == this.portal.tile.i && this.player.currentTile.j == this.portal.tile.j)
					if (this.player.got('pendrive'))
						this.status = 'WON';
			}
		}
	};

	this.pause = function () {
		if (!this.isPaused)
			return false;

		var offsetY = displayHeight * 0.25;
		var offsetX = displayWidth * 0.21;

		background(resources.colors.BLACK);
		textSize(68);
		fill(resources.colors.WHITE);
		textFont('Georgia');

		text("paused", offsetX, offsetY);

		return true;
	};

	this.onKeyPress = function (keyCode) {
		switch(keyCode) {
			case resources.keys.ESC:
				this.isPaused = !this.isPaused;
				return;
		}
	};
}
