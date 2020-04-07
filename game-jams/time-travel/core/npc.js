function NPC(options) {
  Player.call(this, {
    image: loadImage("resources/idle.png"),
    size: {
      w: 40,
      h: 40
    }
  });

  this.id = guid();
  this.tintColor = [255, 122, 0];
  this.tilePath = [];
  this.position = null;
  this.targetPoint = null;
  this.currentTarget = 1;
  this.speed = 2.5;
  this.goingBack = false;
  this.vision = null;

  function guid() {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
  };

  this.preRender = function () {
    tint(this.tintColor);

    // DEBUGMODE
  //   rectMode(CENTER);
  //   stroke(0, 0, 0);
		// fill(255, 0, 0);
		// strokeWeight(1);
		// rect(this.center.x, this.center.y, this.size.w, this.size.h);
    
  //   if (this.vision) {
  //     for (var i = 0; i < this.vision.length; i++) {
  //       fill(255, 255, 0);
  //       rect(this.vision[i].center.x, this.vision[i].center.y, this.size.w, this.size.h);
  //     }
  //   }
  };

  this.pathDirection = function (currentTile, map) {

    if (currentTile.i < this.targetPoint[0])
      return 'right';
    else if (currentTile.i > this.targetPoint[0])
      return 'left';
    else if (currentTile.j < this.targetPoint[1])
      return 'down';
    else if (currentTile.j > this.targetPoint[1])
      return 'up';
  };

  this.isSeeingPlayer = function (currentTile, dir, player, map) {
    if (!player.currentTile) return false;
    this.vision = [];
    var visionAux = [];

    switch (dir) {
      case 'down':
        visionAux = [
          [currentTile.i - 1, currentTile.j + 1],
          [currentTile.i - 1, currentTile.j + 2],
          [currentTile.i + 1, currentTile.j + 1],
          [currentTile.i + 1, currentTile.j + 2],
          [currentTile.i, currentTile.j + 2],
          [currentTile.i, currentTile.j + 1],
          [currentTile.i - 1, currentTile.j],
          [currentTile.i + 1, currentTile.j]
        ];

        break;
      case 'up':
        visionAux = [
          [currentTile.i - 1, currentTile.j - 1],
          [currentTile.i - 1, currentTile.j - 2],
          [currentTile.i + 1, currentTile.j - 1],
          [currentTile.i + 1, currentTile.j - 2],
          [currentTile.i, currentTile.j - 2],
          [currentTile.i, currentTile.j - 1],
          [currentTile.i - 1, currentTile.j],
          [currentTile.i + 1, currentTile.j]
        ];

        break;
      case 'left':
        visionAux = [
          [currentTile.i - 1, currentTile.j],
          [currentTile.i - 1, currentTile.j + 1],
          [currentTile.i - 2, currentTile.j],
          [currentTile.i - 2, currentTile.j + 1],
          [currentTile.i, currentTile.j - 1],
          [currentTile.i, currentTile.j + 1],
          [currentTile.i - 1, currentTile.j - 1],
          [currentTile.i - 2, currentTile.j - 1]
        ];

        break;
      case 'right':
        visionAux = [
          [currentTile.i + 1, currentTile.j],
          [currentTile.i + 1, currentTile.j + 1],
          [currentTile.i + 2, currentTile.j],
          [currentTile.i + 2, currentTile.j + 1],
          [currentTile.i, currentTile.j - 1],
          [currentTile.i, currentTile.j + 1],
          [currentTile.i + 1, currentTile.j - 1],
          [currentTile.i + 2, currentTile.j - 1]
        ];

        break;
    }

    for (var i = 0; i < visionAux.length; i++) {
      var toPush = {
        tile: {
          i: visionAux[i][0],
          j: visionAux[i][1],
        },
        center: map.transformCoord(visionAux[i][0], visionAux[i][1])
      };
      this.vision.push(toPush);

      if (toPush.tile.i == player.currentTile.i && toPush.tile.j == player.currentTile.j)
        return true;
    }

    return false;
  };

  this.update = function (map, player) {
    imageMode(CENTER);
    var currentTile = map.getTile(this.center.x, this.center.y);

    if (currentTile.i == this.targetPoint[0] && currentTile.j == this.targetPoint[1]) {
      this.isAnimating = false;
      if (this.goingBack) {
        if (this.currentTarget == 0) {
          this.goingBack = false;
          this.currentTarget = 1;
        }
        else {
          this.currentTarget--;
        }
      }
      else {
        var isLastTarget = this.currentTarget == this.tilePath.length - 1;
        if (isLastTarget) {
          this.currentTarget = this.tilePath.length - 2;
          this.goingBack = true;
        }
        else {
          this.currentTarget++;
        }
      }

      this.targetPoint = this.tilePath[this.currentTarget];
    }
    else {
      var dir = this.pathDirection(currentTile, map);
      this.animationDirection = dir;
      this.isAnimating = true;

      this.move(dir);
      this.sawPlayer = this.isSeeingPlayer(currentTile, dir, player, map);
    }
  };
}
