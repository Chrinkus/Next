const KEY = {
    W: 87,
    A: 65,
    S: 83,
    D: 68,
    UP: 38,
    LEFT: 37,
    DOWN: 40,
    RIGHT: 39,
    ESC: 27
};

var input = {
    up: false,
    left: false,
    down: false,
    right: false,
    menu: false
};

function press(event) {
    var code = event.keyCode;
    switch (code) {
        case KEY.UP:
        case KEY.W: input.up = true;
        break;

        case KEY.LEFT:
        case KEY.A: input.left = true;
        break;

        case KEY.DOWN:
        case KEY.S: input.down = true;
        break;

        case KEY.RIGHT:
        case KEY.D: input.right = true;
        break;

        case KEY.ESC: input.menu = true;
    }
}

function release(event) {
    var code = event.keyCode;
    switch (code) {
        case KEY.UP:
        case KEY.W: input.up = false;
        break;

        case KEY.LEFT:
        case KEY.A: input.left = false;
        break;

        case KEY.DOWN:
        case KEY.S: input.down = false;
        break;

        case KEY.RIGHT:
        case KEY.D: input.right = false;
        break;

        case KEY.ESC: input.menu = false;
    }
}
