function Cloud() {
	this.x = width;
	this.y = random(0, 0.5 * height);
	this.w = 0.1 * width;
	this.h = 0.06 * height;

	this.render = function () {
		image(Yarquen.Resources['cloud'], this.x, this.y, this.w, this.h);
	};

	this.update = function () {
		this.x -= 2;
	};

	this.offscreen = function () {
		return this.x <= -this.w;
	};
}

function Background() {

	this.color = [139, 166, 214];
	this.clouds = [new Cloud()];

	this.render = function () {
		for (var i = 0; i < this.clouds.length; i++) {
			this.clouds[i].update();
			this.clouds[i].render();
			if (this.clouds[i].offscreen())
				this.clouds.splice(i, 1);
		}

		if (frameCount % 200 == 0)
			this.clouds.push(new Cloud());

		ellipseMode(CENTER);  // Set ellipseMode to RADIUS
		
		fill(186, 195, 211);
		ellipse(0, height, width, width / 2.0);

		fill(186, 195, 211);
		ellipse(width, height, width, width / 2.0);

		fill(this.color);
		ellipse(width / 2, height + 0.2 * height, 0.9 * height, 0.9 * height);
	};
}

function Snowflake() {
	this.velocity = 0;
	this.gravity = 0.6;
	this.color = [random(125, 255), random(180, 255), random(180, 255)];
	this.w = 0.005 * height;
	this.h = this.w;

	this.x = random(2 * width);
	this.y = -this.h;

	this.factor = random(0.80, 0.97);

	this.render = function () {
		fill(this.color);
		ellipse(this.x, this.y, this.w, this.h);
	};

	this.update = function () {
		this.velocity += this.gravity;
		this.velocity *= this.factor;

		this.y += this.velocity;
		this.x -= this.velocity;
	};

	this.offscreen = function () {
		return (this.y >= height);
	};
}

function Snow(n) {
	this.flakes = [];

	this.addMany = function (n) {
		for (var i = 0; i < n; i++)
			this.flakes.push(new Snowflake());
	};

	this.render = function () {
		if (frameCount % 10 == 0)
			this.addMany(4);

		for (var i = 0; i < this.flakes.length; i++)
			this.flakes[i].render();
	};

	this.update = function () {
		for (var i = 0; i < this.flakes.length; i++) {
			this.flakes[i].update();
			if (this.flakes[i].offscreen())
				this.flakes.splice(i, 1);
		}
	};
}