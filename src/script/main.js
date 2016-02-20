(function() {
    "use strict";
    var canvas = document.getElementById("viewport"),
        ctx = canvas.getContext("2d"),
        CW = canvas.width,
        CH = canvas.height,
        then = 0,
        stopStart, stopMain, player,
        startMenu, startFields,
        pauseMenu, pauseFields;

    // Input processing
    addEventListener("keydown", function(e) {
        keysDown[e.keyCode] = true;
    }, false);

    addEventListener("keyup", function(e) {
        delete keysDown[e.keyCode];
    }, false);

    // Start menu
    startFields = ["Start", "Options", "Exit"];
    startMenu = new Menu(CW / 2, CH / 2, startFields, 32);

    // Pause menu
    pauseFields = ["Resume", "Options", "Quit"];
    pauseMenu = new Menu(CW / 2, CH / 2, pauseFields, 32);

    Menu.prototype.selections = function(field) {
        switch (field) {
            case "Start":
                player = new Player(CW / 2, CH / 2);
                player.pause = false;
                window.cancelAnimationFrame(stopStart);
                stopMain = window.requestAnimationFrame(main);
                break;
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
            case "Exit":
                // do for exit
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
            player.update(delta / 1000, keysDown);
            player.draw(ctx);
        }

        then = now;
    }
})();
