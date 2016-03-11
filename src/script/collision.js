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
