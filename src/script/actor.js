function Actor(x, y) {
    "use strict";
    this.x = x || 0;
    this.y = y || 0;
    this.pause = false;
}

function Player(x, y) {
    "use strict";
    Actor.call(this, x, y);
    this.sheet = new SpriteSheet("/src/images/Red_Cube.png", 64, 64);
    this.idle = new Animation(this.sheet, 15, 0, 1);
    this.down = new Animation(this.sheet, 15, 2, 3);
    this.up = new Animation(this.sheet, 15, 4, 5);
    this.left = new Animation(this.sheet, 15, 6, 7);
    this.right = new Animation(this.sheet, 15, 6, 7); // flip @ draw
    this.anima = this.idle;
}

Player.prototype = Object.create(Actor.prototype);

Player.prototype.update = function(delta, keysDown) {
    this.anima = this.idle;
    if (KEY.W in keysDown) { this.anima = this.up; this.y -= 1; }
    if (KEY.S in keysDown) { this.anima = this.down; this.y += 1; }
    if (KEY.A in keysDown) { this.anima = this.left; this.x -= 1; }
    if (KEY.D in keysDown) { this.anima = this.right; this.x += 1; }
    if (KEY.ESC in keysDown) { this.pause = true; }
}

Player.prototype.draw = function(ctx) {
    ctx.save();
    this.anima.update();
    if (this.anima === this.right) {
        ctx.scale(-1, 1);
        this.anima.draw(ctx, -this.x - this.sheet.frameWidth, this.y);
    } else {
        this.anima.draw(ctx, this.x, this.y);
    }
    ctx.restore();
}

