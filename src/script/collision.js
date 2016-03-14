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
                bucket: {}
            };
        }
    }
}

Hash.prototype.populate = function(entities) {
    var that = this;

    entities.forEach(function(entity) {
        // fetch all buckets that entity currently occupies
        entity.getBuckets(that.cellSize, that.cols);

        entity.buckets.forEach(function(loc) {
            that.hash[loc].bucket[entity] = entity;
        });
    });
};

Hash.prototype.move = function(entity) {
    var oldBuckets = entity.buckets.slice();
    entity.getbuckets();

    // compare arrays
    // if true, buckets remains unchanged
    if (oldBuckets.length === entity.buckets.length &&
        oldBuckets.every(function(value, i) {
            return value === entity.buckets[i];
        });
    ) { return; }

    // if false, delete entity out of old buckets...
    oldBuckets.forEach(function(buc) {
        delete that.hash[buc].bucket[entity.id];
    });

    // and add entity to new buckets
    entity.buckets.forEach(function(buc) {
        that.hash[buc].bucket[entity.id] = entity;
    });
};
