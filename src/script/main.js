(function() {
    "use strict";
	var canvas = document.getElementById("viewport");
	var ctx = canvas.getContext("2d");
	var CW = canvas.width;
	var CH = canvas.height;
    var stopStart, stopMain, player;
    
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
    // Start menu
    var startFields = ["Start", "Options", "Quit"];
    var startMenu = new Menu(CW / 2, CH / 2, startFields, 32);
    startMenu.selections = function(field) {
        switch (field) {
            case "Start":
                player = new Actor(CW / 2, CH / 2);
                player.pause = false;
                window.cancelAnimationFrame(stopStart);
                stopMain = window.requestAnimationFrame(main);
                break;
            case "Options":
                // do for options
                break;
            case "Quit":
                // do for quit
                break;
        }
    }

    // Pause menu
    var pauseFields = ["Resume", "Options", "Quit"];
    var pauseMenu = new Menu(CW / 2, CH / 2, pauseFields, 32);
    pauseMenu.selections = function(field) {
        switch (field) {
            case "Resume":
                player.pause = false;
                break;
            case "Options":
                // do for options
                break;
            case "Quit":
                pauseMenu.delay = 0;
                pauseMenu.i = 0;
                startMenu.delay = 0;
                startMenu.i = 0;
                window.cancelAnimationFrame(stopMain);
                stopStart = window.requestAnimationFrame(start);
                break;
        }
    }

	function start(tStamp) {
		stopStart = window.requestAnimationFrame(start);
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
    stopStart = window.requestAnimationFrame(start);

    function main(tStamp) {
        stopMain = window.requestAnimationFrame(main);
        var now = Math.floor(tStamp);
        var delta = now - then;

        ctx.clearRect(0, 0, CW, CH);

        //Background
        ctx.fillStyle = "#999";
        ctx.fillRect(0, 0, CW, CH); 

        if (player.pause) {
            player.draw(ctx);
            // Transparent backdrop
            ctx.fillStyle = "rgba(0, 0, 0, 0.6)";
            ctx.fillRect(0, 0, CW, CH);
            pauseMenu.update(delta, keysDown);
            pauseMenu.draw(ctx);
        } else {
            player.update(delta, keysDown);
            player.draw(ctx);
        }

        then = now;
    }
})();
