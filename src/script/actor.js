function Actor(x, y, w, h) {
    "use strict";
    this.x = x || 0;
    this.y = y || 0;
    this.width = w;
    this.height = h;
}

function Obstacle(x, y, w, h, imgSrc) {
    "use strict";
    Actor.call(this, x, y, w, h);
    this.img = new Image();
    this.img.src = imgSrc;
}

Obstacle.prototype = Object.create(Actor.prototype);

Obstacle.prototype.draw = function(ctx) {
    ctx.drawImage(this.img, this.x, this.y);
}

function Projectile(x, y, w, h, facing) {
    "use strict";
    this.px = x + 24;               // half of player frame width (not really?)
    this.py = y + 32;               // half of player frame height
    this.width = w;
    this.height = h;
    this.snapFace = facing;
    this.speed = 512;

    this.sheet = new SpriteSheet("/src/images/Red_Projectile.png",
            this.width, this.height);
    this.fire = new Animation(this.sheet, 15, 0, 1);
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

function Player(x, y, w, h) {
    "use strict";
    Actor.call(this, x, y, w, h);
    this.speed = 128;
    this.pause = false;
    this.facing = "left";           // Default facing
    this.projectiles = [];
    this.delay = 0;

    this.sheet = new SpriteSheet("/src/images/Red_Cube.png",
            this.width, this.height);
    this.idle = new Animation(this.sheet, 15, 0, 1, false);
    this.down = new Animation(this.sheet, 15, 2, 3, false);
    this.up = new Animation(this.sheet, 15, 4, 5, false);
    this.left = new Animation(this.sheet, 15, 6, 7, false);
    this.right = new Animation(this.sheet, 15, 6, 7, true);
    this.anima = this.idle;
}

Player.prototype = Object.create(Actor.prototype);

Player.prototype.update = function(deltaS, keysDown, entities) {
    var snapLoc = { x: this.x, y: this.y };
    this.delay += deltaS;
    this.speed = KEY.SHIFT in keysDown ? 256 : 128;
    if (KEY.W in keysDown) { 

        this.anima = this.up;
        this.facing = "up";
        this.y -= deltaS * this.speed;
    }
    if (KEY.S in keysDown) { 
        this.anima = this.down;
        this.facing = "down";
        this.y += deltaS * this.speed;
    }
    if (KEY.A in keysDown) {
        this.anima = this.left;
        this.facing = "left";
        this.x -= deltaS * this.speed;
    }
    if (KEY.D in keysDown) {
        this.anima = this.right;
        this.facing = "right";
        this.x += deltaS * this.speed;
    }
    
    // Collision Detect
    if (entities.some(collision, this)) {
        this.x = snapLoc.x;
        this.y = snapLoc.y;
    }

    // Pause menu
    if (KEY.ESC in keysDown) { this.pause = true; }

    // Projectiles
    if (this.delay > 0.15 && KEY.SPACE in keysDown && this.projectiles.length < 3) {
        this.projectiles.unshift(new Projectile(this.x, this.y, 16, 16, this.facing));
        this.delay = 0;
    }

    if (this.projectiles.length) {
        this.projectiles.forEach(function(proj, i, arr) {
            proj.update(deltaS);

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
    this.anima.draw(ctx, this.x, this.y);

    ctx.restore();

    if (this.projectiles.length) {
        this.projectiles.forEach(function(proj) {
            proj.fire.update();
            proj.fire.draw(ctx, proj.px, proj.py);
        });
    }
}
