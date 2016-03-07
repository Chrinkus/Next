var GAME = GAME || {};

// Menu object
// Intention is to have this object hold any utility type menus
GAME.menus = {};

// Scenario object
// This will be the collection of entities for now
GAME.scenario = {};

GAME.menusInit = function() {
    "use strict";
    this.menus.start = new Menu(this.halfW, this.halfH, ["Start", "Exit"], 32);
    this.menus.pause = new Menu(this.halfW, this.halfH, ["Resume", "Quit"], 32);
};

GAME.menusProcess = function(menu, delta, ctx) {
    "use strict";
    this.menus[menu].update(delta);
    this.menus[menu].draw(ctx);
};

GAME.scenarioInit = function() {
    "use strict";
    this.player = new Player(this.halfW, this.halfH, 64, 64);
    this.barrel = new Obstacle(100, 100, 64, 64, "/src/images/Barrel.png");
    this.crate = new Obstacle(800, 300, 64, 64, "/src/images/Crate.png");
    this.blueCube = new NPC(750, 150, 64, 64, "/src/images/Blue_Cube.png");
    this.entities = [this.barrel, this.crate, this.blueCube];
};
