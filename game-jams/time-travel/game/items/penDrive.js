function PenDrive(options) {
	Item.call(this, options);

	this.duration = 100;
	this.usedFor = 0;
	this.charBefore = null;
	this.durationText = '';

	this.itsOver = function () {
		return false;
	};


	this.renderHud = function (x, y) {
		image(this.image, x, y, 60, 60);
		if (this.usedFor % 10 == 0)
			this.durationText = this.duration - this.usedFor;
		
		textFont('Courier New');
		textSize(12);
		text('Pen Drive!', x - 45, y - 23);
		text('Go to portal!', x - 50, y + 50);
	};

	this.using = function () {
		this.usedFor++;
	};

	this.gotIt = function (player) {
		this.sound.play();
	};

	this.name = function () {
		return 'pendrive';
	}
};