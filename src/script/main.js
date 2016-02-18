(function() {
    "use strict";
    var canvas = document.getElementById("viewport");
    var ctx = canvas.getContext("2d");
    var CW = canvas.width;
    var CH = canvas.height;
    var stopStart, stopMain;
    
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
    var player = new Actor(CW / 2, CH / 2);
    var fields = ["Start", "Options", "Quit"];
    var startMenu = new Menu(CW / 2, CH / 2, fields, 32);
    startMenu.selections = function(field) {
        switch (field) {
            case "Start":
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

        //Actor
        player.update(delta, keysDown);
        player.draw(ctx);

        then = now;
    }
})();
