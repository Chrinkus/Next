function collision(player, entity, direction) {
    switch (direction) {
        case "up":
            return player.y < entity.y + entity.height;
        case "down":
            return player.y + player.height < entity.y;
        case "left":
            return player.x < entity.x + entity.width;
        case "right":
            return player.x + player.width < entity.x;
    }
}
