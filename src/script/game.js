var GAME = GAME || {};

GAME.menus = {};

GAME.menusInit = function() {
    "use strict";
    this.menus.start = new Menu(this.halfW, this.halfH, ["Start", "Exit"], 32);
    this.menus.pause = new Menu(this.halfW, this.halfH, ["Resume", "Quit"], 32);
};

GAME.gameplayInit = function() {
    "use strict";
    this.player = new Player(this.halfW, this.halfH, 64, 64);
    this.barrel = new Obstacle(100, 100, 64, 64, "/src/images/Barrel.png");
    this.crate = new Obstacle(800, 300, 64, 64, "/src/images/Crate.png");
    this.entities = [this.barrel, this.crate];
};
