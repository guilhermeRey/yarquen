/*
TODO: Mudar a lógica de sprite animation para a classe Sprite, faz mais sentido.
*/
function Player(options) {
	this.center = {
		x: -1,
		y: -1
	};
	this.idle = options.image;
	this.size = options.size;
	this.currentTile = null;
	this.items = [];
	this.lifes = 3;

	if (options.animations)
		this.animations = options.animations;
	else
		this.animations = resources.sprites.player.animations;

	this.isAnimating = false;
	this.animationDirection = 'down';
	this.animationIndex = 0;
	this.animationIndexFrameRate = 4;
	this.animationIndexFrameRateCounter = 0;
	// TODO: Criar item que diminua o index frame rate e aumente o speed, assim o boneco parece ir mais rápido!
	this.speed = 2.5;

	this.getState = function () {
		return {
			speed: this.speed,
			animationIndexFrameRate: this.animationIndexFrameRate
		};
	};

	this.loadState = function (state) {
		this.speed = state.speed;
		this.animationIndexFrameRate = state.animationIndexFrameRate;
	};

	this.speedUp = function () {
		this.speed += 4.9;
		this.animationIndexFrameRate = 1;
		this.animationIndexFrameRateCounter = 0;
	};

	this.speedDown = function () {
		this.speed -= 4.9;
		this.animationIndexFrameRate = 4;
		this.animationIndexFrameRateCounter = 0;
	};

	this.makeMovement = function (dir) {
		var x = this.center.x, y = this.center.y;
		if (dir == 'down')
			y = this.center.y + this.speed;
		else if (dir == 'up')
			y = this.center.y - this.speed;
		else if (dir == 'right')
			x = this.center.x + this.speed;
		else if (dir == 'left')
			x = this.center.x - this.speed;

		return {
			'x': x,
			'y': y
		};
	};

	this.move = function (dir) {
		this.isAnimating = true;
		this.animationDirection = dir;

		var movement = this.makeMovement(dir);

		this.center.x = movement.x;
		this.center.y = movement.y
	};

	this.got = function (itemName) {
		for (var i = 0; i < this.items.length; i++) {
			if (this.items[i].name() == itemName)
				return true;
		}
		return false;
	}

	this.computeMove = function (map, dir, currentTile) {
		var futurePos = this.makeMovement(dir);
		var move = false;

		if (dir == 'down') {
			if (futurePos.y >= currentTile.center.y)
			{
				if (map.isWalkable(currentTile.i, currentTile.j + 1))
					this.move('down');
			}
			else {
				this.move('down');
			}
		}
		else if (dir == 'up') {
			if (futurePos.y <= currentTile.center.y)
			{
				if (map.isWalkable(currentTile.i, currentTile.j - 1))
					this.move(dir);
			}
			else {
				this.move(dir);
			}
		}
		else if (dir == 'right') {
			if (futurePos.x >= currentTile.center.x)
			{
				if (map.isWalkable(currentTile.i + 1, currentTile.j))
					this.move(dir);
			}
			else {
				this.move(dir);
			}
		}
		else if (dir == 'left') {
			if (futurePos.x <= currentTile.center.x)
			{
				if (map.isWalkable(currentTile.i - 1, currentTile.j))
					this.move(dir);
			}
			else {
				this.move(dir);
			}
		}
	};

	this.update = function (map) {
		var dir = '';
		if(keyIsDown(resources.keys.ARROW_DOWN))
			dir = 'down';
		else if (keyIsDown(resources.keys.ARROW_UP))
			dir = 'up';
		else if (keyIsDown(resources.keys.ARROW_RIGHT))
			dir = 'right';
		else if (keyIsDown(resources.keys.ARROW_LEFT))
			dir = 'left';

		if (dir == '') return;

		var currentTile = map.getTile(this.center.x, this.center.y);
		this.currentTile = currentTile;
		this.computeMove(map, dir, currentTile);

		for (var i = 0; i < this.items.length; i++) {
			if (this.items[i].itsOver()) {
				this.items[i].endEffect(this);

				this.items.splice(this.items.indexOf(this.items[i]), 1);
			}
			else
				this.items[i].using();
		}
	};

	this.preRender = function () {
		tint(255, 255, 255);
	};

	this.renderIdle = function () {
		imageMode(CENTER);
		this.preRender();
		
		image(this.idle, this.center.x, this.center.y, 40, 40);
	};

	this.render = function () {
		imageMode(CENTER);
		this.preRender();

		// DEBUG MODE
		// stroke(0, 0, 0);
		// fill(255, 0, 0);
		// strokeWeight(1);
		// rect(this.center.x, this.center.y, this.size.w, this.size.h);

		// strokeWeight(5);
		// stroke(255, 255, 0);
		// point(this.center.x, this.center.y);

		if (this.isAnimating) {
			var animationSprite = this.animations[this.animationDirection];
			if (this.animationIndexFrameRateCounter == this.animationIndexFrameRate) {
				this.animationIndex = (this.animationIndex + 1) % animationSprite.length;
				this.animationIndexFrameRateCounter = 0;
			}
			else
				this.animationIndexFrameRateCounter++;

			image(animationSprite[this.animationIndex], this.center.x, this.center.y, 40, 40);

			this.isAnimating = false;
		}
		else {
			this.renderIdle();
		}
	};
}
