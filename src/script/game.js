var GAME = {
    canvas: document.getElementById("viewport"),
    get halfW() { return this.canvas.width / 2; },
    get halfH() { return this.canvas.height / 2; },
    then: 0,
    menus: {},

    KEY: {
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
    },
    keysDown: {},

    menusInit: function() {
        this.menus.start = new Menu(this.halfW, this.halfH, ["Start", "Exit"], 32);
        this.menus.pause = new Menu(this.halfW, this.halfH, ["Resume", "Quit"], 32);
    },

    gameplayInit: function() {
        this.player = new Player(this.halfW, this.halfH, 64, 64);
        this.barrel = new Obstacle(100, 100, 64, 64, "/src/images/Barrel.png");
        this.crate = new Obstacle(800, 300, 64, 64, "/src/images/Crate.png");
        this.entities = [this.barrel, this.crate];
    }
}
