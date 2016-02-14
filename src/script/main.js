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

	var menu = ["Start", "Options", "Quit"];

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
					cursor.y + (fontSize + 16) * cursor.i,
					200, fontSize + 16, 10));
	}
	window.requestAnimationFrame(main);
})();
