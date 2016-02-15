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

function Cursor(x, y) {
	this.x = x;
	this.y = y;
	this.i = 0;
}

Cursor.prototype.moveUp = function() {
	this.i -= 1;
}

Cursor.prototype.moveDown = function() {
	this.i += 1;
}

Cursor.prototype.update = function() {
	if (input.up && this.i > 0) { this.moveUp(); }
	if (input.down) { this.down(); }
}
