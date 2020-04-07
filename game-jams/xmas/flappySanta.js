var flappySanta = new Yarquen.Screen({ name: 'Main' });

function Gift(santa) {
	this.santa = santa;
	this.w = santa.w * 0.3;
	this.h = santa.h * 0.3;
	this.x = this.santa.x + this.santa.w / 2 - this.w / 2;
	this.y = this.santa.y + this.santa.h;
	this.color = [random(255), random(255), random(255)];
	this.stripeColor = [random(255), random(255), random(255)];

	this.accepted = false;
	this.fallen = false;

	this.render = function (game) {
		fill(this.color);
		strokeWeight(1);
		stroke(this.stripeColor);
		rect(this.x, this.y, this.w, this.h, 5);

		noStroke();
		fill(this.stripeColor);
		var twentyPercent = 0.2 * this.h;
		rect(this.x, this.y + (this.h / 2) - (twentyPercent / 2), this.w, 0.2 * this.h);
		rect(this.x + (this.w / 2) - (twentyPercent / 2), this.y, this.w * 0.2, this.h);
		
		//image(Yarquen.Resources['gift'], this.x, this.y, this.w, this.h);
	};

	this.update = function (santa) {
		if (!this.accepted) {
			this.x = this.santa.x + this.santa.w / 2 - this.w / 2;
			this.y = this.santa.y + this.santa.h;
		}
	};

	this.fall = function (chimney) {
		if (this.y >= height)
			this.fallen = true;

		this.x = chimney.x + (chimney.w / 2) - (this.w / 2)
		this.y += 4;
	};
}

function Santa() {
	this.y = height / 2;
	this.x = Yarquen.Helpers.widthProportion(10);

	this.w = 0.35 * width;
	this.h = this.w - (0.1 * this.w);

	this.gravity = 0.6;
	this.antiGravity = -20;
	this.velocity = 0;
	this.angle = -radians(7*PI/4);

	this.gift = new Gift(this);
	this.released = {};
	this.giftsReleased = 0;
	this.releaseStatus = {
		'Perfect': 0,
		'Good': 0
	};

	this.up = function () {
		this.velocity += this.antiGravity;
		this.angle -= 0.1;
	};

	this.update = function () {
		this.velocity += this.gravity;
		this.velocity *= 0.97;
		this.y += this.velocity;
		
		if (this.angle <= radians(PI/4))
			this.angle += 0.005;

		if (this.gift) 
			this.gift.update(this);

		for (var chimneyId in this.released) {
			if (!this.released[chimneyId].gift.accepted)
				this.released[chimneyId].gift.accepted = true;

			this.released[chimneyId].gift.fall(this.released[chimneyId].chimney);

			if (this.released[chimneyId].gift.fallen)
				delete this.released[chimneyId];
		}

		this.checkOffCanvas();
	};

	this.releaseQuality = function (gift, chimney) {
		var diff = Math.abs(gift.x - chimney.x);
		if (diff <= 25)
			return 'Perfect';
		else
			return 'Good';
	};

	this.releaseGift = function (chimney) {
		if (this.released[chimney.id])
			return;

		this.released[chimney.id] = {
			chimney: chimney,
			gift: this.gift
		};

		var quality = this.releaseQuality(this.gift, chimney);
		this.releaseStatus[quality]++;
		this.giftsReleased++;
			
		this.gift = new Gift(this);
		if (quality == 'Perfect')
			game.resources.audio['nice'].play();
		else
			game.resources.audio['good'].play();
	};

	this.checkOffCanvas = function () {
		if (this.reachedTop()) {
			this.y = -this.h/2;
			this.velocity = 0;
		}

		if (this.reachedBottom()) {
			this.y = height;
			this.velocity = 0;
		}
	};

	this.reachedTop = function () {
		return this.y < -this.h/2;
	};

	this.reachedBottom = function () {
		return this.y > height;
	};

	this.render = function () {
		// fill(255);
		// rect(this.x, this.y, this.w, this.h);

		push();
		translate(this.x, this.y);
		rotate(this.angle);

		fill(255);
		// rect(0, 0, this.w, this.h);
		image(Yarquen.Resources['santa'], 0, 0, this.w, this.h);
		pop();

		if (this.gift)
			this.gift.render();

		for (var chimneyId in this.released) {
			this.released[chimneyId].gift.render();
		}

	};

	this.reset = function () {
		this.velocity = 0;
		this.y = height;
	};

	this.onKeyPress = function (key) {
		
	};
}

function Chimney(id) {
	this.x = width;
	this.bottom = random(0.10 * height, 0.70 * height);
	this.y = height - this.bottom;
	this.speed = 4;
	this.w = Yarquen.Helpers.widthProportion(30);
	this.h = this.bottom;
	this.santaHit = false;
	this.giftHit = false;
	this.id = id;

	this.giftChimney = {
		x: this.x + 0.20 * this.w,
		y: this.y,
		w: 0.60 * this.w,
		h: this.h,
		id: this.id
	};

	this.render = function () {
		rectMode(CORNER);

		if (this.h < 0.3 * height) {
			image(Yarquen.Resources['chimney'], this.x, this.y, this.w, this.h);	
		}
		else {
			var twentyPercent = 0.2 * this.h;

			image(Yarquen.Resources['chimney'], this.x, this.y, this.w, twentyPercent);
			for (var i = 1; i <= 4; i++)
				image(Yarquen.Resources['chimney_body'], this.x, this.y + (i * twentyPercent), this.w, twentyPercent);
		}

		/*
		fill(255, 255, 255);
		if (this.santaHit)
			fill(255, 0, 0);
		
		/*rect(this.x, this.y, this.w, this.h);

		fill(0, 255, 0);
		rect(this.giftChimney.x, this.giftChimney.y, this.giftChimney.w, this.giftChimney.h);*/
	};

	this.hits = function (santa) {
		return collideRectRect(santa.x, santa.y, santa.w, santa.h, this.x, this.y, this.w, this.h);
	};

	this.giftHits = function (gift, giftChimney) {
		return collideRectRect(gift.x, gift.y, gift.w, gift.h, giftChimney.x, giftChimney.y, giftChimney.w, giftChimney.h);
	}

	this.update = function (santa) {
		this.x -= this.speed;
		this.giftChimney.x = this.x + 0.20 * this.w;

		this.santaHit = this.hits(santa);
		if (santa.gift) {
			this.giftHit = this.giftHits(santa.gift, this.giftChimney);
		}
		else
			this.giftHit = false;

		if (this.giftHit) {
			santa.releaseGift(this.giftChimney);
		}
	}

	this.offscreen = function () {
		return this.x < -this.w;
	};
}

flappySanta.onStart = function () {
	this.santa = new Santa();
	
	this.chimneys = [];
	this.chimneys.push(new Chimney(this.chimneyId++));
	this.chimneyId = 0;

	this.snow = new Snow(100);
	this.bg = new Background();

	this.score = 0;
	this.hiscore = 0;

	game.resources.audio['wintery'].setVolume(0.1);
	game.resources.audio['wintery'].loop();
};

flappySanta.render = function () {
	background(14, 65, 84);
	this.bg.render();
	this.snow.render();

	if (frameCount % 100 == 0)
		this.chimneys.push(new Chimney(this.chimneyId++));

	for (var i = 0; i < this.chimneys.length; i++)
		this.chimneys[i].render();

	this.santa.render();
	this.hud();	

	
};

flappySanta.hud = function () {
	var third = 0.33 * width;
	var y = 50;

	textSize(Yarquen.Helpers.textSize(50));
	textFont("Bungee");
	textAlign('center');

	fill(255);
	//rect(0, 0, third, 0.1 * height);
	text(this.score, third, 0.1 * height, third);

	textSize(Yarquen.Helpers.textSize(20));
	text('Hiscore: ' + this.hiscore, third, 0.05 * height, third);

	if (this.qualityScore) {
		textSize(Yarquen.Helpers.textSize(30));
		
		fill(100, 255, 100);
		text('Perfects', 0, 0.05 * height, third);
		text(this.qualityScore['Perfect'], 0, 0.1 * height, third);

		fill(158, 185, 100);
		text('Goods', third * 2, 0.05 * height, third);
		text(this.qualityScore['Good'], 2 * third, 0.1 * height, third);
	}

	// fill(255, 0, 0);
	// rect(1 * third, 0, third, 0.1 * height);

	// fill(255);
	// rect(2 * third, 0, third, 0.1 * height);
	// fill(255);
	

	// 

	

	// noStroke();
};

flappySanta.update = function (game) {
	this.snow.update();
	this.santa.update();

	for (var i = 0; i < this.chimneys.length; i++) {
		this.chimneys[i].update(this.santa);

		if (this.chimneys[i].offscreen())
			this.chimneys.splice(i, 1);

		if (this.chimneys[i].santaHit) {
			game.scores.push(this.score);
			if (this.score > this.hiscore)
				this.hiscore = this.score;

			this.santa = new Santa();
			this.chimneys = [];
			this.score = 0;
		}
	}

	this.score = this.santa.giftsReleased;
	this.qualityScore = this.santa.releaseStatus;
};

flappySanta.onKeyPress = function (keycode) {
	if (keycode == Yarquen.Keys.SPACE_BAR)
		this.santa.up();
};

flappySanta.onTouchMoved = function () {
	this.santa.up();
};