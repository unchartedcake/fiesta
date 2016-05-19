// global settings
var settings = {
	canvas: {
		width: 980,
		height: 560
	},
	player: {
		boxSize: 50,
	},
	movement: {
		deceleration: 0.2
	}
}


// initialize properties related to canvas
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
canvas.width = settings.canvas.width;
canvas.height = settings.canvas.height;


// declare and initialize player
var player = {
	direction: "down",
	pos: {
		x: 50,
		y: 50
	},
	vel: {	// velocity
		x: 0,
		y: 0,
	},
	acceleration: 10
}


// player controlling
var keyStatus = [];	// records the status of each key

document.body.addEventListener("keydown", function(event) {
	keyStatus[event.keyCode] = true;
});
document.body.addEventListener("keyup", function(event) {
	keyStatus[event.keyCode] = false;
});

function handleKeyEvent() {
	// player movement
	if(keyStatus[38]) {
		player.direction = "up";
		player.vel.x = 0;
		player.vel.y -= player.acceleration;
	}
	if(keyStatus[39]) {
		player.direction = "right";
		player.vel.x += player.acceleration;
		player.vel.y = 0;
	}
	if(keyStatus[40]) {
		player.direction = "down";
		player.vel.x = 0;
		player.vel.y += player.acceleration;
	}
	if(keyStatus[37]) {
		player.direction = "left";
		player.vel.x -= player.acceleration;
		player.vel.y = 0;
	}
	player.pos.x += player.vel.x;
	player.pos.y += player.vel.y;
	player.vel.x *= settings.movement.deceleration;
	player.vel.y *= settings.movement.deceleration;
}


// render canvas
function renderCanvas() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	drawPlayer();
	handleKeyEvent();
	showDevInfo();
	FPSCounter++;
	window.requestAnimationFrame(renderCanvas);
}

function drawPlayer() {
	var x = player.pos.x;
	var y = player.pos.y;
	var boxSize = settings.player.boxSize;
	var img = new Image();
	img.src = "img/player/player.png";

	ctx.drawImage(img, x - img.width / 2, y + boxSize / 2 - img.height);
	ctx.beginPath();
	// center spot of the player
	ctx.arc(x, y, 1, 0, 2 * Math.PI);
	// box model of the player
	ctx.rect(x - boxSize / 2, y - boxSize / 2, boxSize, boxSize);
	// outer border of the player
	ctx.rect(x - img.width / 2, y + boxSize / 2 - img.height, img.width, img.height);
	ctx.stroke();
}


// development information
var FPSCounter = 0;
setInterval(function() {
	document.getElementById("FPS").innerHTML = FPSCounter;
	FPSCounter = 0;
}, 1000);

function showDevInfo() {
	document.getElementById("direction").innerHTML = player.direction;
	document.getElementById("playerPosX").innerHTML = player.pos.x.toFixed(2);
	document.getElementById("playerPosY").innerHTML = player.pos.y.toFixed(2);
	document.getElementById("playerVelX").innerHTML = player.vel.x.toFixed(2);
	document.getElementById("playerVelY").innerHTML = player.vel.y.toFixed(2);
}


// execution
renderCanvas();