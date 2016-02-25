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
    var animationSequence = []; // array holding the order of the animation
    var currentFrame = 0;       // the current frame to draw
    var counter = 0;            // keep track of frame rate

    // create the sequence of frame numbers for the animation
    for (var frameNumber = startFrame; frameNumber <= endFrame; frameNumber++) {
        animationSequence.push(frameNumber);
    }

    // update the animation
    this.update = function() {

        // update the next frame if it is time
        if (counter == (frameSpeed - 1)) {
            currentFrame = (currentFrame + 1) % animationSequence.length;
        }

        //update the counter
        counter = (counter + 1) % frameSpeed;
    };

    // draw the current frame
    this.draw = function(ctx, x, y) {
        // get the row and col of the frame
        var row = Math.floor(animationSequence[currentFrame] / spritesheet.framesPerRow);
        var col = Math.floor(animationSequence[currentFrame] % spritesheet.framesPerRow);
        var newX = flip ? -x - spritesheet.frameWidth : x;

        ctx.save();
        if (flip) { ctx.scale(-1, 1); }

        ctx.drawImage(
                spritesheet.image,              // image
                col * spritesheet.frameWidth,   // source x
                row * spritesheet.frameHeight,  // source y
                spritesheet.frameWidth,         // source width
                spritesheet.frameHeight,        // source height
                newX, y,                        // destination x, y
                spritesheet.frameWidth,         // destination width
                spritesheet.frameHeight);       // destination height

        ctx.restore();
    };
}
