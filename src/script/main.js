(function() {
	var canvas = document.getElementById("viewport");
	var ctx = canvas.getContext("2d");
	var CW = canvas.width;
	var CH = canvas.height;
	var fontSize = 32;
	ctx.font = fontSize + "px monospace";
	var cursor = new Cursor(CW / 2 - 100, CH / 2 - (fontSize / 2 + 8));

	window.addEventListener("keydown", press, false);
	window.addEventListener("keyup", release, false);

    function Cursor(x, y) {
        this.x = x;
        this.y = y;
        this.i = 0;
        this.path2D = roundedCorners(this.x, this.y, w)
    }

    function Menu(xC, yC, fields, fontSize) {
        // xC + yC define center of first menu item
        this.fields = fields;
        this.itMax = fields.length;
        this.maxWidth = fields.reduce(function(pre, cur) {
            return pre.length > cur.length ? pre : cur;
        });

        // Cursor
        this.w = maxWidth + fontSize * 2;
        this.h = fontSize * 1.5;
        this.x = xC - this.w / 2;
        this.y = yC - this.h / 2;
        this.cursor = roundedCorners(this.x, this.y, this.w, this.h, 10);
    }

	function main(tStamp) {
		window.requestAnimationFrame(main);

		ctx.clearRect(0, 0, CW, CH);

		// Background
		ctx.fillStyle = "#000";
		ctx.fillRect(0, 0, CW, CH);

		// Text
		ctx.textAlign = "center";
		ctx.textBaseline = "middle";
		ctx.fillStyle = "#FFF";
		//ctx.fillText("Start", CW / 2, CH / 2);
		menu.forEach(function(option, i) {
			ctx.fillText(option, CW / 2, CH / 2 + fontSize * 1.5 * i);
		});

		// Path2D
		cursor.update();
		ctx.strokeStyle = "#FFF";
		ctx.lineWidth = 4;
		ctx.lineCap = "square";
		ctx.stroke(roundedCorners(
					cursor.x,
					(cursor.y + ((fontSize + 16) * cursor.i)),
					200, fontSize + 16, 10));
	}
	window.requestAnimationFrame(main);
})();
