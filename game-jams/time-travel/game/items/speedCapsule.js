function SpeedCapsule(options) {
	Item.call(this, options);

	this.duration = 100;
	this.usedFor = 0;
	this.charBefore = null;
	this.durationText = '';

	this.itsOver = function () {
		return this.usedFor == this.duration;
	};

	this.endEffect = function (player) {
		player.loadState(this.charBefore);
		this.charBefore = null;
	}

	this.renderHud = function (x, y) {
		image(this.image, x, y, 60, 60);
		if (this.usedFor % 10 == 0)
			this.durationText = this.duration - this.usedFor;
		
		textFont('Courier New');
		textSize(12);
		text('speed capsule', x - 45, y - 23);
		textSize(35);
		text(this.durationText, x - 20, y + 50);
	};

	this.using = function () {
		this.usedFor++;
	};

	this.gotIt = function (player) {
		this.charBefore = player.getState();
		this.sound.play();
		player.speedUp();
	};

	this.name = function () {
		return 'Speed Capsule';
	}
};