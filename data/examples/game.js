

/* var updateFOV; */ // For some of the examples

// Poor pseudo random number generator
var A = 2971215073, B = 479001599, M = 1048573;
		function rand(x, y) {	
			var num = ((A*x)^(B*y)) % M;
			return (num / M);
}


//Game loop
function tick2(oldx, oldy) {
	/* if (updateFOV) updateFOV(pl.x, pl.y);  */// Update field of view (used in some examples)
	//if (updateFOV) updateFOV(pl.x, pl.y);

	eng.update(pl.x, pl.y); // Update tiles
	term.put(AT.tile, term.cx, term.cy); // Player character
	
	updateEntityLoc(); //entities
	//updateMouse(); //mouseover
	
	gameUI(); //UI

	gameInteractions(); //interactions
}

//Mouse detection - not yet used
function updateMouse(event) {
	if (mouseover.mouse === true) {
		term.putString(event.clientX, 1, 3, 100, 100, 100);
	}
}

//Mouse detection
function mousein(event) {
	var x = event.clientX;
    var y = event.clientY;
}

//Mouse detection
function mouseout() {
	//mouseover.mouse = false;
}

// Key press handler - movement & collision handling
function onKeyDown(k) {
	if (k === ut.KEY_I && ui.inventory === false){ui.inventory = true} else if (k === ut.KEY_I){ui.inventory = false}
	arrowkeys(k);
	tick2();
	updateEntityLoc();
}

function arrowkeys(k) {
	var movedir = { x: 0, y: 0 }; // Movement vector
	if (k === ut.KEY_LEFT || k === ut.KEY_H) movedir.x = -1;
	else if (k === ut.KEY_RIGHT || k === ut.KEY_L) movedir.x = 1;
	else if (k === ut.KEY_UP || k === ut.KEY_K) movedir.y = -1;
	else if (k === ut.KEY_DOWN || k === ut.KEY_J) movedir.y = 1;
	if (movedir.x === 0 && movedir.y === 0) return;
	var oldx = pl.x, oldy = pl.y;
	pl.x += movedir.x;
	pl.y += movedir.y;
	
	//possible interaction checkers
	if (getChunk(pl.x, pl.y).obtainable === true) { interactions.pickup = true; interactions.name = getChunk(pl.x, pl.y).name} else { interactions.pickup = false; }
	if (getChunk(pl.x, pl.y).talkable === true) { interactions.talk = true; interactions.name = getChunk(pl.x, pl.y).name; pl.x = oldx; pl.y = oldy;	} else { interactions.talk = false; }
	if (getChunk(pl.x, pl.y).fightable === true) { interactions.fight = true; interactions.name = getChunk(pl.x, pl.y).name; pl.x = oldx; pl.y = oldy;	} else { interactions.fight = false; }
	if (getChunk(pl.x, pl.y).walkable === false) { interactions.stuck = true; interactions.name = getChunk(pl.x, pl.y).name; pl.x = oldx; pl.y = oldy;  } else { interactions.stuck = false;}
}

//Wipes screen
function wipeScreen() {
	for (i = 0; i <= windowWidth; i++) {
		for (j = 0; j <= windowHeight; j++){term.put(ut.NULLTILE, i, j);}
	}	
	term.render();
}


function startGame() {
	var cursor = false;
	wipeScreen();
	window.setInterval(tick2, 50);
	eng = new ut.Engine(term, getTile, undefined, undefined);
	ut.initInput(onKeyDown);	
}


