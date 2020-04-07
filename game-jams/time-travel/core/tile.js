function createTile(_i, _j) {
  return {
    i: _i,
    j: _j
  };
}

function Tile(options) {
  this.walkable = options.walkable;
  this.image = options.image;
  this.color = options.color;

	this.render = function (x, y, size) {
    strokeWeight(1);

    if (this.walkable) {
      stroke(0, 0, 0);
      fill(255, 255, 255);
    }
    else {
      stroke(255, 255, 255);
      fill(0, 0, 0);
    }
    rectMode(CENTER);
    rect(x, y, size.w, size.h);

    /*if (this.image) {
      //noStroke();
  		image(this.image, x, y, size.w, size.h);
    }
    else {

  		//noStroke();

    }*/
	};
}
