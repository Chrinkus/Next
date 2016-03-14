function collision(entity) {
    "use strict";
    return this.x < entity.x + entity.width &&
        this.x + this.width > entity.x &&
        this.y < entity.y + entity.height &&
        this.y + this.height > entity.y;
}

function outside(npc) {
    "use strict";
    return npc.x > npc.anchor.x + npc.radius ||
        npc.x < npc.anchor.x - npc.radius ||
        npc.y > npc.anchor.y + npc.radius ||
        npc.y < npc.anchor.y - npc.radius;
}

function Hash(cellSize, mapW, mapH) {
    "use strict";
    this.hash = [];
    this.cellSize = cellSize;
    this.cols = Math.ceil(mapW / cellSize);
    this.rows = Math.ceil(mapH / cellSize);

    for (var i = 0; i < this.rows; i++) {
        for (var j = 0; j < this.cols; j++) {
            this.hash[i * this.cols + j] = {
                minX: j * cellSize,
                minY: i * cellSize,
                maxX: j * cellSize + cellSize - 1,
                maxY: i * cellSize + cellSize - 1,
                bucket: []
            };
        }
    }
}

Hash.prototype.populate = function(entities) {
    var that = this;

    entities.forEach(function(entity) {
        var xOrigLoc = Math.floor(entity.x / that.cellSize);
        var yOrigLoc = Math.floor(entity.y / that.cellSize);
        var xMaxLoc = Math.floor((entity.x + entity.width) / that.cellSize);
        var yMaxLoc = Math.floor((entity.y + entity.height) / that.cellSize);

        var locations = [
            yOrigLoc * that.cols + xOrigLoc,    // top left corner
            yOrigLoc * that.cols + xMaxLoc,     // top right corner
            yMaxLoc * that.cols + xOrigLoc,     // bottom left corner
            yMaxLoc * that.cols + xMaxLoc       // bottom right corner
        ];

        // assumes array is sequential
        entity.locations = locations.filter(function(ele, i, arr) {
            return ele !== arr[i - 1];
        });

        entity.locations.forEach(function(loc) {
            hash[loc].bucket.push(entity);
        });
    });
};

Hash.prototype.move = function(entity) {
    var oldLocations = entity.locations;        // need
    var newLocations = entity.getLocations();   // need

    // compare arrays
    // if true, location remains unchanged
    // if false, recalculate new location
};
