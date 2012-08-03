var x = 10;
var y = 200;
var dx = 1.5;
var dy = -4;
var ctx;
var WIDTH;
var HEIGHT;
var paddlex;
var paddleh = 10;
var paddlew = 75;
var rightDown = false;
var leftDown = false;
var canvasMinX = 0;
var canvasMaxX = 0;
var intervalId = 0;
var bricks;
var powerUpActive = false;
var NROWS = 8;
var NCOLS = 10;
var BRICKWIDTH;
var BRICKHEIGHT = 15;
var PADDING = 1;
var blip;
var bgLoop;
var powerUpX = 0;
var powerUpY = 0;
var powerUpColor = "rgba(242, 12, 27, .8)"; //Red base
//var powerUpArray = ['widen', 'xlife', '-xlife', 'thinner'];
var powerUpType = 'widen';


function init() {
    ctx = $('#canvas')[0].getContext("2d");
    blip = document.getElementById("blip");
    bgLoop = document.getElementById("bgLoop");
    bgLoop.volume = .15;
    WIDTH = $("#canvas").width();
    HEIGHT = $("#canvas").height();
    paddlex = WIDTH / 2;
    BRICKWIDTH = (WIDTH / NCOLS) - 1;
    canvasMinX = $("#canvas").offset().left;
    canvasMaxX = canvasMinX + WIDTH;
    if (gameStarted) {
        bgLoop.play();
        intervalId = setInterval(draw, 10);
        return intervalId;
    }
    else {
        initbricks();
        draw();
    }
}

function circle(x, y, r) {
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fill();
}

function rect(x, y, w, h) {
    ctx.beginPath();
    ctx.rect(x, y, w, h);
    ctx.closePath();
    ctx.fill();
}

function clear() {
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
    rect(0, 0, WIDTH, HEIGHT);
}

function onKeyDown(evt) {
    if (evt.keyCode == 39) rightDown = true;
    else if (evt.keyCode == 37) leftDown = true;
    else if (evt.keyCode == 83 && !gameStarted) {
        gameStarted = true; //'S' = Start game.
        lives = 3;
        init();
    }
    else if (evt.keyCode = 67 && lostLife) {
        lostLife = false;
        init();
    }
}

function onKeyUp(evt) {
    if (evt.keyCode == 39) rightDown = false;
    else if (evt.keyCode == 37) leftDown = false;
}

$(document).keydown(onKeyDown);
$(document).keyup(onKeyUp);

function onMouseMove(evt) {
    if (evt.pageX > canvasMinX && evt.pageX < canvasMaxX) {
        paddlex = Math.max(evt.pageX - canvasMinX - (paddlew / 2), 0);
        paddlex = Math.min(WIDTH - paddlew, paddlex);
    }
}

$(document).mousemove(onMouseMove);

function initbricks() {
    bricks = new Array(NROWS);
    for (i = 0; i < NROWS; i++) {
        bricks[i] = new Array(NCOLS);
        for (j = 0; j < NCOLS; j++) {
            bricks[i][j] = 1;
        }
    }
}

function drawbricks() {
    for (i = 0; i < NROWS; i++) {
        ctx.fillStyle = rowcolors[i];
        for (j = 0; j < NCOLS; j++) {
            if (bricks[i][j] == 1) {
                rect((j * (BRICKWIDTH + PADDING)) + PADDING,
             (i * (BRICKHEIGHT + PADDING)) + PADDING,
             BRICKWIDTH, BRICKHEIGHT);
            }
        }
    }
}

function drawlives() {
    $('#lives').html('');
    for (i = 0; i < lives; i++) {
        $('#lives').append('<img src="images/heart.png" />');
    }
}

function checkForPowerUp(x, y) {
    var goWithPowerUp = Math.random();
    if (goWithPowerUp > .40) {  //30% chance for a power up
        powerUpX = x;
        powerUpY = y;
        powerUpActive = true;

        //What TYPE of power up?  We will have GOOD: Widen, Extra life, Shrink, Lose life -- 4 options for now.
        switch (Math.floor(Math.random() * 4)) {
            case 0: //Widen
                powerUpType = 'widen';
                powerUpColor = "rgba(53, 226, 252, .9)";
                break;
            case 1: //Shorten
                powerUpType = 'shorten';
                powerUpColor = "rgba(252, 176, 53, .9)";
                break;
            case 2: //Xtra life
                powerUpType = 'xlife';
                powerUpColor = "rgba(12, 242, 31, .9)";  //Green
                break;
            case 3: //Lose a life
                powerUpType = '-xlife';
                powerUpColor = "rgba(242, 12, 27, .9)";  //Red
                break;
        }
    }
}

CanvasRenderingContext2D.prototype.roundRect = function (x, y, width, height, radius, fill, stroke) {
    if (typeof stroke == "undefined") {
        stroke = true;
    }
    if (typeof radius === "undefined") {
        radius = 5;
    }
    this.beginPath();
    this.moveTo(x + radius, y);
    this.lineTo(x + width - radius, y);
    this.quadraticCurveTo(x + width, y, x + width, y + radius);
    this.lineTo(x + width, y + height - radius);
    this.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    this.lineTo(x + radius, y + height);
    this.quadraticCurveTo(x, y + height, x, y + height - radius);
    this.lineTo(x, y + radius);
    this.quadraticCurveTo(x, y, x + radius, y);
    this.closePath();
    if (stroke) {
        this.stroke(stroke);
    }
    if (fill) {
        this.fill(fill);
    }
};
