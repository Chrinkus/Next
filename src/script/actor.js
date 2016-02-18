function Actor(x, y) {
    "use strict";
	this.x = x || 0;
	this.y = y || 0;
}
/*
Actor.prototype.moveUp = function() {
	this.y -= 1;
}

Actor.prototype.moveDown = function() {
	this.y += 1;
}

Actor.prototype.moveLeft = function() {
	this.x -= 1;
}

Actor.prototype.moveRight = function() {
	this.x += 1;
}*/

Actor.prototype.update = function(delta, keysDown) {
    if (KEY.W in keysDown) { this.y -= 1; }
    if (KEY.S in keysDown) { this.y += 1; }
    if (KEY.A in keysDown) { this.x -= 1; }
    if (KEY.D in keysDown) { this.x += 1; }
}

Actor.prototype.draw = function(ctx) {
    ctx.save();
    ctx.fillStyle = "#F00";
    ctx.fillRect(this.x, this.y, 32, 32);
    ctx.restore();
}

