function Sprite(options) {
	this.center = {x:-1,y:-1};
	this.spriteImage = options.image;
	this.size = options.size;

	this.isAnimating = false;
	this.animationDirection = 'down';

	this.move = function (dir) {
		this.isAnimating = true;
		
	};

	this.update = function () {

	};

	this.render = function () {
		image(this.spriteImage, this.center.x * this.size.h, this.center.y * this.size.w, 60, 60);
	};
}