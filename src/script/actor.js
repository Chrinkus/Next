// Actor class => good for static images
function Actor(ident, imgSrc, w, h, x, y) {
    "use strict";
    this.ident = ident;
    if (imgSrc) {
        this.img = new Image();
        this.img.src = imgSrc;
    }
    this.width = w;
    this.height = h;
    this.x = x || 0;
    this.y = y || 0;
    this.buckets = [];
}

Actor.prototype.draw = function(ctx) {
    ctx.drawImage(this.img, this.x, this.y);
};

Actor.prototype.getBuckets = function(cellSize, cols) {
    // origins protected against possible negative values
    var xOrigLoc = this.x < 0 ? 0 : Math.floor(this.x / cellSize);
    var yOrigLoc = this.y < 0 ? 0 : Math.floor(this.y / cellSize);
    var xMaxLoc = Math.floor((this.x + this.width) / cellSize);
    var yMaxLoc = Math.floor((this.y + this.height) / cellSize);
    
    // All possible buckets - may contain duplicates
    var buckets = [
        yOrigLoc * cols + xOrigLoc,    // top left corner
        yOrigLoc * cols + xMaxLoc,     // top right corner
        yMaxLoc * cols + xOrigLoc,     // bottom left corner
        yMaxLoc * cols + xMaxLoc       // bottom right corner
    ];

    // Remove duplicates - assumes array is sorted
    this.buckets = buckets.filter(function(ele, i, arr) {
        return ele !== arr[i - 1];
    });
};

// StaticNPC class => non-moving NPCs
function NPC(ident, imgSrc, w, h, x, y, anchor, radius) {
    "use strict";
    Actor.call(this, ident, null, w, h, x, y);
    if (anchor) { this.anchor = anchor; }
    if (radius) { this.radius = radius; }
    this.delay = 0;
    this.speed = 128;
    this.facing = "";

    // Animations
    this.sheet = new SpriteSheet(imgSrc, w, h);
    this.idle = new Animation(this.sheet, 15, 0, 1, false);
    this.down = new Animation(this.sheet, 15, 2, 3, false);
    this.up = new Animation(this.sheet, 15, 4, 5, false);
    this.left = new Animation(this.sheet, 15, 6, 7, false);
    this.right = new Animation(this.sheet, 15, 6, 7, true);
    this.anima = this.idle;
}

NPC.prototype = Object.create(Actor.prototype);

NPC.prototype.draw = function(ctx) {
    this.anima.update();
    this.anima.draw(ctx, this.x, this.y);
};

NPC.prototype.wander = function(delta) {
    var snapLoc = { x: this.x, y: this.y };
    this.delay += delta;
    if (!this.facing && this.delay > 2000) {
        this.facing = GAME.directions[Math.floor(Math.random() * 4)];
        this.anima = this[this.facing];
    } else if (this.delay > 2500) {
        this.facing = "";
        this.delay = 0;
    } else {
        Projectile.prototype.update.call(this, delta / 1000);
        if (outside(this) || GAME.scenario.hash.testCollision(this)) {
            this.x = snapLoc.x;
            this.y = snapLoc.y;
        }
    }
};

function Player(ident, imgSrc, w, h, x, y) {
    "use strict";
    NPC.call(this, ident, imgSrc, w, h, x, y);
    this.pause = false;
    this.facing = "left";           // Default facing
    this.projectiles = [];
}

Player.prototype = Object.create(NPC.prototype);

Player.prototype.update = function(deltaS) {
    var keysDown = GAME.keysDown;
    var KEY = GAME.KEY;
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
    
    if (GAME.scenario.hash.testCollision(this)) {
        this.x = snapLoc.x;
        this.y = snapLoc.y;
    }

    /* Projectiles
    if (this.delay > 0.15 &&
            KEY.SPACE in keysDown &&
            this.projectiles.length < 3) {

        this.projectiles.unshift(new Projectile(
                    "pj", "/src/images/Red_Projectile.png",
                    16, 16, this.x, this.y, this.facing));
        this.delay = 0;
    }

    if (this.projectiles.length) {
        this.projectiles.forEach(function(proj, i, arr) {
            proj.getBuckets(GAME.scenario.hash.cellSize, GAME.scenario.hash.cols);
            if (GAME.scenario.testCollision(proj)) {
                proj.anima = proj.impact;
            } else {
                proj.update(deltaS);
            }

            if (proj.x > 1000 || proj.x < 0 || proj.y > 600 || proj.y < 0) {
                arr.splice(i, i + 1);
            }
        });
    }*/
}

Player.prototype.draw = function(ctx) {
    ctx.save();

    this.anima.update();
    this.anima.draw(ctx, this.x, this.y);

    ctx.restore();

    /*
    if (this.projectiles.length) {
        this.projectiles.forEach(function(proj, i, arr) {
            // remove if termination finished
            if (proj.anima.update()) { arr.splice(i, i + 1); }

            if (proj.anima === proj.impact) {
                ctx.save();
                proj.anima.orient(ctx, proj.x, proj.y, proj.facing);
                proj.anima.draw(ctx, -proj.anima.halfW, -proj.anima.halfH);
                ctx.restore();
            } else {
                proj.anima.draw(ctx, proj.x, proj.y);
            }
        });
    }*/
}

function Projectile(ident, imgSrc, w, h, x, y, facing) {
    "use strict";
    this.ident = ident;
    this.x = x + 24;               // half of player frame width (not really?)
    this.y = y + 32;               // half of player frame height
    this.width = w;
    this.height = h;
    this.facing = facing;
    this.speed = 512;
    this.buckets = [];

    this.sheet = new SpriteSheet(imgSrc, this.width, this.height);
    this.fire = new Animation(this.sheet, 15, 0, 1);
    this.impact = new Termination(this.sheet, 8, 2, 3);
    this.anima = this.fire;
}

Projectile.prototype = Object.create(Actor.prototype);

Projectile.prototype.update = function(delta) {
    switch (this.facing) {
        case "up":      this.y -= this.speed * delta; break;
        case "down":    this.y += this.speed * delta; break;
        case "left":    this.x -= this.speed * delta; break;
        case "right":   this.x += this.speed * delta; break;
    }
}

