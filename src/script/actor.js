function Actor(x, y) {
    "use strict";
    this.x = x || 0;
    this.y = y || 0;
    this.pause = false;
}

function Player(x, y) {
    "use strict";
    Actor.call(this, x, y);
}

Player.prototype = Object.create(Actor.prototype);

Player.prototype.update = function(delta, keysDown) {
    if (KEY.W in keysDown) { this.y -= 1; }
    if (KEY.S in keysDown) { this.y += 1; }
    if (KEY.A in keysDown) { this.x -= 1; }
    if (KEY.D in keysDown) { this.x += 1; }
    if (KEY.ESC in keysDown) { this.pause = true; }
}

Player.prototype.draw = function(ctx) {
    ctx.save();
    ctx.fillStyle = "#F00";
    ctx.fillRect(this.x, this.y, 32, 32);
    ctx.restore();
}

