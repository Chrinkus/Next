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

    this.clear = function() {
        ctx.clearRect(0, 0, CW, CH);
    }

    this.fill = function(style) {
        ctx.fillStyle = style;
        ctx.fillRect(0, 0, CW, CH);
    }

    this.inputInit();
    this.menusInit();

    this.start = function(tStamp) {
        that.stopStart = window.requestAnimationFrame(that.start);
        var now = Math.floor(tStamp);
        var delta = now - then;

        that.clear();
        that.fill("#000");

        // Menu
        that.menusProcess("start", delta, ctx);

        then = now;
    };
    this.stopStart = window.requestAnimationFrame(this.start);

    this.main = function(tStamp) {
        that.stopMain = window.requestAnimationFrame(that.main);
        var now = Math.floor(tStamp);
        var delta = now - then;

        that.scenario.update(delta);
        that.scenario.draw(ctx);

        then = now;
    };
}).apply(GAME);
