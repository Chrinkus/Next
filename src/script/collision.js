function collision(entity) {
    /*
    switch (direction) {
        case "up":
            return player.y < entity.y + entity.height;
        case "down":
            return player.y + player.height < entity.y;
        case "left":
            return player.x < entity.x + entity.width;
        case "right":
            return player.x + player.width < entity.x;
    }*/
    /*
    return player.x > entity.x && player.x < entity.x + entity.width &&
        player.y > entity.y && player.y < entity.y + entity.height;
        */
    return this.x < entity.x + entity.width &&
        this.x + this.width > entity.x &&
        this.y < entity.y + entity.height &&
        this.y + this.height > entity.y;
}
