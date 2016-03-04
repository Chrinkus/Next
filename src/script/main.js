var GAME = GAME || {};

(function() {
    "use strict";
    var canvas = document.getElementById("viewport"),
        ctx = canvas.getContext("2d"),
        then = 0, that = this;

    const CW = canvas.width;
    const CH = canvas.height;

    this.halfW = CW / 2;
    this.halfH = CH / 2;

    function clear() {
        ctx.clearRect(0, 0, CW, CH);
    }

    function fill(style) {
        ctx.fillStyle = style;
        ctx.fillRect(0, 0, CW, CH);
    }

    this.inputInit();
    this.menusInit();

    this.start = function(tStamp) {
        that.stopStart = window.requestAnimationFrame(that.start);
        var now = Math.floor(tStamp);
        var delta = now - then;

        clear();

        // Background
        fill("#000");

        // Menu
        that.menus.start.update(delta);
        that.menus.start.draw(ctx);

        then = now;
    };
    this.stopStart = window.requestAnimationFrame(this.start);

    this.main = function(tStamp) {
        that.stopMain = window.requestAnimationFrame(that.main);
        var now = Math.floor(tStamp);
        var delta = now - then;

        clear();

        //Background
        fill("#999");

        if (that.player.pause) {
            that.player.draw(ctx);
            that.barrel.draw(ctx);
            that.crate.draw(ctx);
            // Transparent backdrop
            fill("rgba(0, 0, 0, 0.6)");
            that.menus.pause.update(delta);
            that.menus.pause.draw(ctx);
        } else {
            that.player.update(delta / 1000);
            that.player.draw(ctx);
            that.barrel.draw(ctx);
            that.crate.draw(ctx);
        }

        then = now;
    };
}).apply(GAME);
