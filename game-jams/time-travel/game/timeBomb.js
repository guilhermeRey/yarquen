function TimeBombGame() {
	Game.call(this);

	this.addScreen(new Menu());
	this.addScreen(new History());

	this.addScreen(level1());

	this.goTo('menu');

	function level1() {
		var
		wall = new Tile({
			walkable: false,
			size: resources.defaultCellSize
		}),
		hwall = new Tile({
			walkable: false,
			size: resources.defaultCellSize
		}),
		floor = new Tile({
			walkable: true,
			size: resources.defaultCellSize
		});

		var level1 = new Level();
		level1.map.load([
			[wall,hwall,hwall,hwall,hwall,hwall,hwall,hwall,hwall,hwall,hwall,hwall,hwall,hwall,hwall,hwall,hwall,hwall,hwall,hwall,hwall,hwall,hwall,hwall,wall],
			[wall,floor,floor,floor,wall,floor,floor,floor,wall,floor,floor,floor,floor,floor,floor,floor,wall,floor,floor,floor,floor,floor,floor,floor,wall],
			[wall,floor,floor,floor,wall,floor,floor,floor,wall,floor,floor,floor,floor,floor,floor,floor,wall,floor,floor,floor,floor,floor,floor,floor,wall],
			[wall,floor,floor,floor,wall,floor,floor,floor,wall,floor,floor,floor,floor,floor,floor,floor,wall,floor,floor,floor,floor,floor,floor,floor,wall],
			[wall,floor,floor,floor,wall,floor,floor,floor,wall,floor,floor,floor,floor,floor,floor,floor,wall,floor,floor,floor,floor,floor,floor,floor,wall],
			[wall,hwall,hwall,floor,wall,floor,floor,floor,wall,floor,floor,wall,floor,wall,floor,floor,floor,floor,floor,floor,floor,floor,floor,floor,wall],
			[wall,floor,floor,floor,wall,floor,floor,floor,wall,floor,floor,wall,floor,wall,floor,floor,floor,floor,floor,floor,floor,floor,floor,floor,floor],
			[wall,floor,floor,floor,wall,floor,floor,floor,wall,floor,floor,wall,floor,wall,floor,floor,floor,floor,floor,floor,floor,floor,floor,floor,floor],
			[wall,floor,floor,floor,floor,floor,floor,floor,floor,floor,floor,wall,floor,wall,floor,floor,wall,floor,floor,floor,floor,floor,floor,floor,floor],
			[wall,floor,floor,floor,floor,floor,floor,floor,floor,floor,floor,wall,floor,wall,floor,floor,wall,floor,floor,floor,floor,floor,floor,floor,wall],
			[wall,floor,floor,floor,floor,floor,floor,floor,floor,floor,floor,floor,floor,floor,floor,floor,wall,floor,floor,floor,floor,floor,floor,floor,wall],
			[wall,floor,floor,floor,wall,floor,floor,floor,wall,floor,floor,floor,floor,floor,floor,floor,wall,floor,floor,floor,floor,floor,floor,floor,wall],
			[wall,floor,floor,floor,wall,floor,floor,floor,wall,floor,floor,floor,floor,floor,floor,floor,wall,floor,floor,floor,floor,floor,floor,floor,wall],
			[wall,floor,floor,floor,wall,floor,floor,floor,wall,floor,floor,floor,floor,floor,floor,floor,wall,floor,floor,floor,floor,floor,floor,floor,wall],
			[wall,hwall,hwall,hwall,hwall,hwall,hwall,hwall,hwall,hwall,hwall,hwall,hwall,hwall,hwall,hwall,hwall,hwall,hwall,hwall,hwall,hwall,hwall,hwall,wall]
		]);
		level1.setPlayerPos(1, 1);

		var npc1 = new NPC();
		var npc2 = new NPC();
		var npc3 = new NPC();
		var npc4 = new NPC();

		npc1.tintColor = [150,150,255];
		npc2.tintColor = [150,255,150];
		npc3.tintColor = [255,150, 150];
		npc4.tintColor = [120,120,15];

		level1.addNpc(npc1);
		level1.addNpc(npc2);
		level1.addNpc(npc3);
		level1.addNpc(npc4);

		level1.setNpcPath(npc1, [[6, 2], [6, 12]]);
		level1.setNpcPath(npc2, [[15, 12], [15, 2], [10, 2]]);
		level1.setNpcPath(npc3, [[20, 2], [20, 12]]);
		level1.setNpcPath(npc4, [[10, 2], [9, 12], [15, 12]]);

		level1.addItem(new SpeedCapsule({
			tile: {
				i: 12,
				j: 7
			},
			image: resources.images.speedCapsule.img
		}));
		level1.addItem(new SpeedCapsule({
			tile: {
				i: 1,
				j: 3
			},
			image: resources.images.speedCapsule.img
		}));

		level1.addItem(new PenDrive({
			tile: {
				i: 23,
				j: 7
			},
			image: resources.images.pendrive.img
		}));

		return level1;
	}

}
