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
    this.player = new Player("p1", "/src/images/Simple_Red.png",
            64, 64, 10, 10);
    this.barrel = new Actor("a1", "/src/images/Barrel.png", 64, 64, 448, 320);
    this.crate = new Actor("a2", "/src/images/Crate.png", 64, 64, 576, 320);
    this.blueCube = new NPC("n1", "/src/images/Simple_Blue.png",
            64, 64, 750, 150);
    this.yellowCube = new NPC("n2", "/src/images/Simple_Yellow.png",
            64, 64, 512, 320, { x: 512, y: 320 }, 128);

    this.animators = ["player", "blueCube", "yellowCube"];
    this.staticImgs = ["barrel", "crate"];
    this.collisionEntities = [this.player, this.barrel, this.crate,
                              this.blueCube, this.yellowCube];
    this.hash = new Hash(128, 1024, 640);
    this.hash.populate(this.collisionEntities);
};

GAME.scenario.update = function(delta) {
    "use strict";
    if (GAME.KEY.ESC in GAME.keysDown) { this.pause = true; }
    if (!this.pause) {
        this.player.update(delta / 1000);
        this.yellowCube.wander(delta);
    }
};

GAME.scenario.draw = function(ctx, delta) {
    "use strict";
    GAME.clear();
    GAME.fillHash();

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
