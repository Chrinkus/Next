function Actor() {
	this.x = 0;
	this.y = 0;
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
