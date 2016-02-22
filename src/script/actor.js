function Actor(x, y) {
    "use strict";
    this.x = x || 0;
    this.y = y || 0;
}

function Projectile(x, y, facing) {
    "use strict";
    this.px = x + 32;               // half of player frame width
    this.py = y + 32;               // half of player frame height
    this.snapFace = facing;
    this.speed = 512;

    this.sheet = new SpriteSheet("/src/images/Red_Projectile.png", 64, 16);
    this.fire = new Animation(this.sheet, 8, 0, 1);
}

Projectile.prototype = Object.create(Actor.prototype);

Projectile.prototype.update = function(delta) {
    switch (this.snapFace) {
        case "up":      this.py -= this.speed * delta; break;
        case "down":    this.py += this.speed * delta; break;
        case "left":    this.px -= this.speed * delta; break;
        case "right":   this.px += this.speed * delta; break;
    }
}

Projectile.prototype.draw = function(ctx) {
    ctx.save();
    ctx.translate(this.px + this.sheet.frameWidth / 2,
                  this.py + this.sheet.frameHeight / 2);
    switch (this.snapFace) {
        case "down": ctx.rotate(Math.PI / 2);   break;
        case "left": ctx.rotate(Math.PI);       break;
        case "up":   ctx.rotate(Math.PI * 1.5); break;
    }
    this.fire.draw(ctx, -this.sheet.frameWidth / 2,
                        -this.sheet.frameHeight / 2);
    ctx.restore();
}

function Player(x, y) {
    "use strict";
    Actor.call(this, x, y);
    this.speed = 128;
    this.pause = false;
    this.facing = "left";           // Default facing
    this.projectiles = [];
    this.delay = 0;

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
    // Character
    this.delay += delta;
    this.speed = KEY.SHIFT in keysDown ? 256 : 128;
    if (KEY.W in keysDown) {
        this.anima = this.up;
        this.facing = "up";
        this.y -= delta * this.speed;
    }
    if (KEY.S in keysDown) {
        this.anima = this.down;
        this.facing = "down";
        this.y += delta * this.speed;
    }
    if (KEY.A in keysDown) {
        this.anima = this.left;
        this.facing = "left";
        this.x -= delta * this.speed;
    }
    if (KEY.D in keysDown) {
        this.anima = this.right;
        this.facing = "right";
        this.x += delta * this.speed;
    }
    if (KEY.ESC in keysDown) { this.pause = true; }

    // Projectiles
    if (KEY.SPACE in keysDown) {
        this.projectiles.unshift(new Projectile(this.x, this.y, this.facing));
        console.log("FIRE!!");
    }

    if (this.projectiles.length) {
        this.projectiles.forEach(function(proj, i, arr) {
            proj.update(delta);

            if (proj.px > 1000 || proj.px < 0 ||
                proj.py > 600 || proj.py < 0) {
                    arr.splice(i, i + 1);
                }
        });
    }
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

    if (this.projectiles.length) {
        this.projectiles.forEach(function(proj) {
            proj.draw(ctx);
        });
    }
}
