function GridMap(options) {
	this.tileSize = options.cellSize;
	this.h = options.height;
	this.w = options.width;

	this.m = [];
	for (var i = 0; i < this.w; i++) {
		this.m[i] = [];
		for (var j = 0; j < this.h; j++) {
			this.m[i][j] = [];
			this.m[i][j].push(new Tile({
				walkable: false,
				color: [255, 0, 0],
				size: this.nodeSize
			}));
		}
	}

	this.load = function (map) {
		for (var i = 0; i < this.w; i++) {
			for (var j = 0; j < this.h; j++) {
				this.m[i][j] = [map[j][i]];
			}
		}
	};

	this.addTile = function (tile, row, col) {
		this.m[row][col].push(tile);
	};

	this.getTile = function (row, col) {
		if (!this.m[x] && !this.m[x][y])
			return false;

		return this.m[x][y];
	};

	this.isWalkable = function (x, y) {
		if (this.m[x] == undefined && !this.m[x][y])
			return false;

		return this.m[x][y][0].walkable;
	};

	this.transformCoord = function (i, j) {
		return {
			x: i * this.tileSize.w + this.tileSize.w / 2,
			y: j * this.tileSize.h + this.tileSize.h / 2
		};
	};

	this.getTile = function (x, y) {
		var aux = {
			i: Math.floor(x / this.tileSize.w),
			j: Math.floor(y / this.tileSize.h),
		};
		aux.center = this.transformCoord(aux.i, aux.j);
		return aux;
	};

	this.render = function () {
		var x, y;
		for (var i = 0; i < this.w; i++) {
			x = i * this.tileSize.w + this.tileSize.w / 2;
			for (var j = 0; j < this.h; j++) {
				y = j * this.tileSize.h + this.tileSize.h / 2;
				this.m[i][j][0].render(x, y, this.tileSize);
				// DEBUG MODE
				// textSize(8);
				// fill(255, 255, 0);
				//text('(' + x + ',' + y + ')', x, y);
				// text('.',x, y);
				// for (var k = 0; k < this.m[i][j].length; k++) {
				//
				// }
			}
		}
	};
}
