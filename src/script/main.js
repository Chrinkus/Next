var GAME = GAME || {};

GAME.ctx = GAME.canvas.getContext("2d");
GAME.CW = GAME.canvas.width;
GAME.CH = GAME.canvas.height;

GAME.clear = function() {
    "use strict";
    GAME.ctx.clearRect(0, 0, GAME.CW, GAME.CH);
};

GAME.fill = function(style) {
    "use strict";
    GAME.ctx.fillStyle = style;
    GAME.ctx.fillRect(0, 0, GAME.CW, GAME.CH);
};

addEventListener("keydown", function(e) {
    "use strict";
    GAME.keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function(e) {
    "use strict";
    delete GAME.keysDown[e.keyCode];
}, false);

GAME.menusInit();

function start(tStamp) {
    "use strict";
    GAME.stopStart = window.requestAnimationFrame(start);
    var ctx = GAME.ctx;
    var now = Math.floor(tStamp);
    var delta = now - GAME.then;

    GAME.clear();

    // Background
    GAME.fill("#000");

    // Menu
    GAME.menus.start.update(delta);
    GAME.menus.start.draw(ctx);

    GAME.then = now;
}
GAME.stopStart = window.requestAnimationFrame(start);

function main(tStamp) {
    "use strict";
    GAME.stopMain = window.requestAnimationFrame(main);
    var ctx = GAME.ctx;
    var now = Math.floor(tStamp);
    var delta = now - GAME.then;

    GAME.clear();

    //Background
    GAME.fill("#999");

    if (GAME.player.pause) {
        GAME.player.draw(ctx);
        GAME.barrel.draw(ctx);
        GAME.crate.draw(ctx);
        // Transparent backdrop
        GAME.fill("rgba(0, 0, 0, 0.6)");
        GAME.menus.pause.update(delta);
        GAME.menus.pause.draw(ctx);
    } else {
        GAME.player.update(delta / 1000);
        GAME.player.draw(ctx);
        GAME.barrel.draw(ctx);
        GAME.crate.draw(ctx);
    }

    GAME.then = now;
}
