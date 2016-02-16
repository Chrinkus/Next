function Actor(x, y) {
	this.x = x || 0;
	this.y = y || 0;
}

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
}

