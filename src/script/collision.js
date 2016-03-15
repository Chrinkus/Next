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
    // this method fires after entity movement has been processed
    // new buckets are calculated and old buckets saved
    // entity is then deleted from old hash locations and added to new ones
    // collision detection can then be calculated
    // if collision occurs, don't forget to revert buckets to snapBuc

    var that = this;
    var snapBuc = entity.buckets.slice();
    entity.getbuckets();

    // compare arrays
    // if true, buckets remains unchanged
    if (snapBuc.length === entity.buckets.length && 
        snapBuc.every(function(value, i) { 
            return value === entity.buckets[i];
        })) {
        // something
    } else {
        // if false, delete entity out of old buckets...
        snapBuc.forEach(function(buc) {
            delete that.hash[buc].bucket[entity.id];
        });

        // and add entity to new buckets
        entity.buckets.forEach(function(buc) {
            that.hash[buc].bucket[entity.id] = entity;
        });
    }

    entity.buckets.forEach(function(buc) {
        for (var ele in that.hash[buc].bucket) {
            if (collision(that.hash[buc].bucket[ele])) {
                return true;
            }
        }
    })

};
