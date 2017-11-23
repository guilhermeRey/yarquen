/*
* A screen that represents the entrance menu
*/
function Menu() {
	this.name = 'menu';

	this.options = [];
	this.options.push({
		display: 'Play',
		goTo: 'historyScreen'
	});
	this.options.push({
		display: 'About',
		goTo: 'aboutScreen'
	});

	this.changeOption = 0;
	this.selectedOptionIndex = 0;
	this.enterOption = false;

	this.offsetY = displayHeight * 0.25;
	this.offsetX = displayWidth * 0.176;
	this.changeOptionSound = resources.music.hit.mp3;

	this.drawTitle = function () {
		textSize(64);
		fill(resources.colors.WHITE);
		textFont('Georgia');
		text("Time Bomb", this.offsetX, this.offsetY);
	};

	this.render = function (game) {
		imageMode(CORNER);
		image(resources.images.menu.img, 0, 0);

		textSize(50);
		fill(resources.colors.WHITE);
		strokeWeight(2);
		for (var i = 0; i < this.options.length; i++) {
			if (this.selectedOptionIndex == i)
				fill(resources.colors.YELLOW);
			else
				fill(resources.colors.WHITE);

			text(this.options[i].display, this.offsetX, this.offsetY + 140 + (i * 60));
		}
	};

	this.update = function (game) {
		for (var i = 0; i < this.options.length; i++) {
			if (this.changeOption != 0) {
				this.selectedOptionIndex = this.selectedOptionIndex + this.changeOption < 0 ? 
					 this.options.length - 1 : 
					(this.selectedOptionIndex + (this.changeOption)) % this.options.length;

				this.changeOption = 0;
			}
		}

		if (this.enterOption) {
			game.goTo(this.options[this.selectedOptionIndex].goTo);
			this.enterOption = !this.enterOption;
		}
	};

	this.onKeyPress = function (keyCode) {
		switch (keyCode) {
			case resources.keys.ARROW_DOWN:
				this.changeOptionSound.play();
				this.changeOption = 1;
				break;
			case resources.keys.ARROW_UP:
				this.changeOptionSound.play();
				this.changeOption = -1;
				break;
			case resources.keys.ENTER:
				this.enterOption = true;
				break;
		}
	};
}