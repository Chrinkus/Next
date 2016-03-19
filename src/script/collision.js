function collision(entity, against) {
    "use strict";
    return entity.x < against.x + against.width &&
        entity.x + entity.width > against.x &&
        entity.y < against.y + against.height &&
        entity.y + entity.height > against.y;
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
    this.table = [];
    this.cellSize = cellSize;
    this.cols = Math.ceil(mapW / cellSize);
    this.rows = Math.ceil(mapH / cellSize);

    for (var i = 0; i < this.rows; i++) {
        for (var j = 0; j < this.cols; j++) {
            this.table[i * this.cols + j] = {
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
            that.table[loc].bucket[entity] = entity;
        });
    });
};

Hash.prototype.testCollision = function(entity) {
    // this method fires after entity movement has been processed
    // new buckets are calculated and old buckets saved
    // collision detection can then be calculated
    // if collision occurs, don't forget to revert buckets to snapBuc

    var that = this;
    // create omit list adding entity ident
    var omitted = [entity.ident];
    var snapBuc = entity.buckets.slice();
    entity.getBuckets(this.cellSize, this.cols);

    if (entity.buckets.some(function(buc) {
        for (var ele in that.table[buc].bucket) {
            var against = that.table[buc].bucket[ele];
            // test if ident already tested
            if (omitted.some(function(ident) {
                return ident === against.ident;
            })) {
                // if true skip this ele
                return;
            } else {
                // if not yet tested add to tested list
                omitted.push(against.ident);
                // then test for collision
                return collision(entity, against);
            }
        }
    })) {
        entity.buckets = snapBuc;
        return true; // use this to trigger entity location reset
    } else {
        this.setNewBuckets(entity, snapBuc);
        return false; // use this to keep new location
    }
};

Hash.prototype.setNewBuckets = function(entity, snapBuc) {
    var that = this;
    // first test to see if buckets need to change
    if (snapBuc.length === entity.buckets.length &&
        snapBuc.every(function(value, i) {
            return value === entity.buckets[i]; })) {
        // if new buckets === old buckets no need to change
        return;
    } else {
        // delete entity from old buckets
        snapBuc.forEach(function(buc) {
            delete that.table[buc].bucket[entity.ident];
        });
        // add entity to new buckets
        entity.buckets.forEach(function(buc) {
            that.table[buc].bucket[entity.ident] = entity;
        });
    }
};

Hash.prototype.testDraw = function(ctx) {
    var omitted = [];
    var ele = {};
    ctx.fillStyle = "rgba(50, 0, 0, 0.5)";

    this.table.forEach(function(buc) {
        for (var entity in buc.bucket) {
            ele = buc.bucket[entity];
            if (omitted.some(function(ident) {
                return ident === ele.ident;
            })) {
                return;
            } else {
                omitted.push(ele.ident);
                ctx.fillRect(ele.x, ele.y, ele.width, ele.height);
            }
        }
    });
};
