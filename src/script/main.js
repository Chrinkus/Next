(function() {
	var canvas = document.getElementById("viewport");
	var ctx = canvas.getContext("2d");
	var CW = canvas.width;
	var CH = canvas.height;

	//window.addEventListener("keydown", press, false);
	//window.addEventListener("keyup", release, false);

    //var startMenu = new Menu(CW / 2, CH / 2, ["Start", "Options", "Quit"], 32);
    var smallMenu = new Menu(CW / 2, 100,
            ["Lightning", "Mater", "Fillmore", "Sarge", "Red"], 32);

	function main(tStamp) {
		window.requestAnimationFrame(main);

		ctx.clearRect(0, 0, CW, CH);

		// Background
		ctx.fillStyle = "#000";
		ctx.fillRect(0, 0, CW, CH);

        // Menu
        smallMenu.draw(ctx);

	}
	window.requestAnimationFrame(main);
})();
