(function() {
	var canvas = document.getElementById("viewport");
	var ctx = canvas.getContext("2d");
	var CW = canvas.width;
	var CH = canvas.height;
    
    // Input processing
    var keysDown = {};
    var then = 0;

    addEventListener("keydown", function(e) {
        keysDown[e.keyCode] = true;
    }, false);

    addEventListener("keyup", function(e) {
        delete keysDown[e.keyCode];
    }, false);

    // Test content
    var fields = ["Start", "Multiplayer", "Store", "Options", "Quit"];
    var startMenu = new Menu(CW / 2, CH / 2, fields, 32);

	function main(tStamp) {
		window.requestAnimationFrame(main);
        var now = Math.floor(tStamp);
        var delta = now - then;

		ctx.clearRect(0, 0, CW, CH);

		// Background
		ctx.fillStyle = "#000";
		ctx.fillRect(0, 0, CW, CH);

        // Menu
        startMenu.update(delta, keysDown);
        startMenu.draw(ctx);

        then = now;
	}
	window.requestAnimationFrame(main);
})();
