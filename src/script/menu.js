function Menu(xC, yC, fields, fontSize) {
    // xC + yC define center of first menu item
    this.xC = xC;
    this.yC = yC;
    this.fields = fields;
    this.fontSize = fontSize;
    this.fillStyle = "#FFF";
    this.strokeStyle = "#FFF";

    // Set barriers
    this.itMax = fields.length - 1;
    this.maxWidth = fields.reduce(function(pre, cur) {
        return pre.length > cur.length ? pre : cur;
    }).length;

    // Cursor
    this.w = this.maxWidth * fontSize * 0.8;
    this.h = fontSize * 1.5;
    this.x = xC - this.w / 2;
    this.y = yC - this.h / 2;
    this.r = 10;
    this.i = 0;
    this.cursor = roundedCorners(this.x, this.y + (this.h * this.i),
                                 this.w, this.h, this.r);
}

Menu.prototype.draw = function(ctx) {
    var that = this;
    ctx.save();
    // Text
    ctx.font = this.fontSize + "px monospace";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = this.fillStyle;
    this.fields.forEach(function(option, i) {
        ctx.fillText(option, that.xC, that.yC + (that.h * i));
    });
    // Cursor
    ctx.strokeStyle = this.strokeStyle;
    ctx.lineWidth = Math.floor(this.fontSize / 7);
    ctx.lineCap = "square";
    ctx.stroke(this.cursor);

    ctx.restore();
}
