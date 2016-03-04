var GAME = GAME || {};

GAME.inputInit = function() {
    const KEY = {
        W: 87,
        A: 65,
        S: 83,
        D: 68,
        UP: 38,
        LEFT: 37,
        DOWN: 40,
        RIGHT: 39,
        ESC: 27,
        ENTER: 13,
        SPACE: 32,
        SHIFT: 16
    };
    this.KEY = KEY;
    this.keysDown = {};

    addEventListener("keydown", function(e) {
        GAME.keysDown[e.keyCode] = true;
    }, false);

    addEventListener("keyup", function(e) {
        delete GAME.keysDown[e.keyCode];
    }, false);
};
