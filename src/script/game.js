var GAME = GAME || {};

// Menu object
// Intention is to have this object hold any utility type menus
GAME.menus = {};

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

// Scenario object
// This will be the collection of entities for now
GAME.scenario = {
    animators: [],
    staticImgs: [],
    collisionEntities: []
};

GAME.scenario.init = function() {
    "use strict";
    this.player = new Player("/src/images/Red_Cube.png", 64, 64);
    this.barrel = new Actor("/src/images/Barrel.png", 64, 64, 100, 100);
    this.crate = new Actor("/src/images/Crate.png", 64, 64, 800, 300);
    this.blueCube = new NPC("/src/images/Blue_Cube.png", 64, 64, 750, 150);
    this.yellowCube = new NPC("/src/images/Yellow_Cube.png", 64, 64, 128, 512);

    this.animators = ["player", "blueCube", "yellowCube"];
    this.staticImgs = ["barrel", "crate"];
    this.collisionEntities = [this.barrel, this.crate, this.blueCube,
                              this.yellowCube];
};

GAME.scenario.update = function(delta) {
    "use strict";
    if (GAME.KEY.ESC in GAME.keysDown) { this.pause = true; }
    if (!this.pause) { this.player.update(delta / 1000); }
};

GAME.scenario.draw = function(ctx) {
    "use strict";
    GAME.clear();
    GAME.fill("#999");

    this.staticImgs.forEach(function(element) {
        GAME.scenario[element].draw(ctx);
    });
    this.animators.forEach(function(element) {
        GAME.scenario[element].draw(ctx);
    });
    if (this.pause) {
        GAME.fill("rgba(0, 0, 0, 0.6)");
        GAME.menusProcess("pause", delta, ctx);
    }
};
