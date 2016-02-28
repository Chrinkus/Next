function SpriteSheet(path, frameWidth, frameHeight) {
    "use strict";
    this.image = new Image();
    this.frameWidth = frameWidth;
    this.frameHeight = frameHeight;

    // Calculate # of frames/row after image loads
    var self = this;
    this.image.onload = function() {
        self.framesPerRow = Math.floor(self.image.width / self.frameWidth);
    };

    this.image.src = path;
}

function Animation(spritesheet, frameSpeed, startFrame, endFrame, flip) {
    "use strict";
    this.sprSheet = spritesheet;
    this.halfW = spritesheet.frameWidth / 2;
    this.halfH = spritesheet.frameHeight / 2;
    this.frameSpeed = frameSpeed;
    this.flip = flip;
    this.animaSeq = []; // array holding the order of the animation
    this.curFrame = 0;       // the current frame to draw
    this.counter = 0;            // keep track of frame rate

    // create the sequence of frame numbers for the animation
    for (var frameNum = startFrame; frameNum <= endFrame; frameNum++) {
        this.animaSeq.push(frameNum);
    }
}

    // update the animation
Animation.prototype.update = function() {

    // update the next frame if it is time
    if (this.counter == (this.frameSpeed - 1)) {
        this.curFrame = (this.curFrame + 1) % this.animaSeq.length;
    }

    //update the counter
    this.counter = (this.counter + 1) % this.frameSpeed;
}

    // draw the current frame
Animation.prototype.draw = function(ctx, x, y) {
    // get the row and col of the frame
    var row = Math.floor(this.animaSeq[this.curFrame] / this.sprSheet.framesPerRow);
    var col = Math.floor(this.animaSeq[this.curFrame] % this.sprSheet.framesPerRow);
    var newX = this.flip ? -x - this.sprSheet.frameWidth : x;

    ctx.save();
    if (this.flip) { ctx.scale(-1, 1); }
    
    ctx.drawImage(
            this.sprSheet.image,                // image
            col * this.sprSheet.frameWidth,     // source x
            row * this.sprSheet.frameHeight,    // source y
            this.sprSheet.frameWidth,           // source width
            this.sprSheet.frameHeight,          // source height
            newX, y,                         // destination x, y
            this.sprSheet.frameWidth,           // destination width
            this.sprSheet.frameHeight);         // destination height

    ctx.restore();
}

function Termination(spritesheet, frameSpeed, startFrame, endFrame, flip) {
    "use strict";
    Animation.call(this, spritesheet, frameSpeed, startFrame, endFrame, flip);
}

Termination.prototype = Object.create(Animation.prototype);

Termination.prototype.update = function() {
    if (this.counter == (this.frameSpeed - 1)) {
        this.curFrame = (this.curFrame + 1) % this.animaSeq.length;
    }
    this.counter = (this.counter + 1) % this.frameSpeed;

    // this is difference, returns "done" instead of undefined when complete
    if (this.counter === 0 && this.curFrame === 0) { return "done"; }
}

Animation.prototype.orient = function(ctx, x, y, facing) {
    // Move origin to middle of sprite
    ctx.translate(x + this.halfW, y + this.halfH);

    // Rotate sprite accordingly
    switch(facing) {
        case "down":    ctx.rotate(Math.PI / 2);    break;
        case "left":    ctx.rotate(Math.PI);        break;
        case "up":      ctx.rotate(Math.PI * 1.5);  break;
    }
}
