function History() {
	this.name = 'historyScreen';
	this.startLevel = false;

	this.introduction = [
	 'A bomb exploded after a war between america and north korea,',
	 'and you have discovered how to go back in time to steal all of', 
	 'the data with the technology about it!',
	 'Get the flashdrive with the encription key to proceed, but remember:'
	 ];
	
	this.onStart = function () {
		resources.music.menu.mp3.play();
	};

	this.onLeave = function () {
		resources.music.menu.mp3.stop();
	};

	this.update = function (game) {
		if (this.startLevel)
			game.goTo('levelScreen');
	};

	this.render = function () {
		fill(255, 255, 255);
		textSize(30);
		for (var i = 0; i < this.introduction.length; i++)
			text(this.introduction[i], 40, 220 + (i * 32));

		textSize(35);
		fill(255, 0, 0);
		text('No one can see you, or time will collapse!', 40, 400);

		textSize(25);
		fill(255, 255, 0);
		text('[PRESS SPACE TO START]', 40, 500);
	};

	this.onKeyPress = function (keyCode) {
		switch (keyCode) {
			case resources.keys.SPACE:
				this.startLevel = true;
				break;
		}
	};
}