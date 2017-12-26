function Item(options) {
	this.tile = options.tile;
	this.image = options.image;
	this.sound = resources.music.hit.mp3;

	this.render = function (map) {
		var center = map.transformCoord(this.tile.i, this.tile.j);
		image(this.image, center.x, center.y);
	};

	this.name = function () {
		return 'item';
	}
}