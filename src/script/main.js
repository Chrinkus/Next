(function() {
	var canvas = document.getElementById("viewport");
	var ctx = canvas.getContext("2d");

	function roundedRect(x, y, w, h, r) {
		// draw rect
		var rr = new Path2D();
		rr.beginPath();
		rr.moveTo(x + r, y);
		rr.arcTo(x + w, y, x + w, y + r, r);
		rr.arcTo(x + w, y + h, x + w - r, y + h, r);
		rr.arcTo(x, y + h, x, y + h - r, r);
		rr.arcTo(x, y, x + r, y, r);
		return rr;
	}

	function main(tStamp) {
		window.requestAnimationFrame(main);

		ctx.clearRect(0, 0, canvas.width, canvas.height);
		ctx.fill(roundedRect(50, 50, 100, 50, 5));

	}
	window.requestAnimationFrame(main);
})();
