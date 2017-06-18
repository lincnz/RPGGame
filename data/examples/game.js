/*global ut */
var term, eng; // Can't be initialized yet because DOM is not ready
var pl = { x: 300, y: 300 }; // Player position
var updateFOV;
var menuNum = 1;

var windowHeight = 30;
var windowWidth = 100;

/* var updateFOV; */ // For some of the examples

// Poor pseudo random number generator
var A = 2971215073, B = 479001599, M = 1048573;
		function rand(x, y) {	
			var num = ((A*x)^(B*y)) % M;
			return (num / M);
}


// "Main loop" one (Menu)
function tick1() {
	term.render(); // Render
}

var interactions = {name, fight: false, pickup: false,  stuck: false, talk: false }
var notifications = {thisnot: "none", prevnot: "none"}
var mouseover = {mouse: false}
var ui = {inventory: false, quests: false, politicalmap: true}

//Game loop
function tick2(oldx, oldy) {
	/* if (updateFOV) updateFOV(pl.x, pl.y);  */// Update field of view (used in some examples)
	//if (updateFOV) updateFOV(pl.x, pl.y);

	eng.update(pl.x, pl.y); // Update tiles
	term.put(AT.tile, term.cx, term.cy); // Player character
	
	updateEntityLoc(); //entities
	//updateMouse(); //mouseover
	
	gameUI(); //UI
	gameNotifications(); //notifications
	gameInteractions(); //interactions
	
}

function updateMouse(event) {
	if (mouseover.mouse === true) {
		term.putString(event.clientX, 1, 3, 100, 100, 100);
	}
}


function mousein(event) {
	var x = event.clientX;
    var y = event.clientY;
}

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

//main menu key handler
function menu() {
	term.putString("New Game", 0, 0, 255, 255, 255);
	term.putString("Load Game", 0, 1, 100, 100, 100);
	term.putString("Options", 0, 2, 100, 100, 100);
	ut.initInput(menuKeyDown);
}



function menuKeyDown(k) { 
		//move down
		if (k === ut.KEY_DOWN) {

			if (menuNum === 1) {
				term.putString("New Game", 0, 0, 100, 100, 100);
				term.putString("Load Game", 0, 1, 255, 255, 255);
				term.putString("Options", 0, 2, 100, 100, 100);	
			}
			if (menuNum === 2) {
				term.putString("New Game", 0, 0, 100, 100, 100);
				term.putString("Load Game", 0, 1, 100, 100, 100);
				term.putString("Options", 0, 2, 255, 255, 255);
			}
			if (menuNum === 3) {
				term.putString("New Game", 0, 0, 255, 255, 255);
				term.putString("Load Game", 0, 1, 100, 100, 100);
				term.putString("Options", 0, 2, 100, 100, 100);
				menuNum = 0;
			}
			menuNum++;
		}
		
		//move up
		if (k === ut.KEY_UP) {	

			if (menuNum === 1) {
				term.putString("New Game", 0, 0, 100, 100, 100);
				term.putString("Load Game", 0, 1, 255, 255, 255);
				term.putString("Options", 0, 2, 100, 100, 100);
				menuNum = 4;
			}
			if (menuNum === 2) {
				term.putString("New Game", 0, 0, 100, 100, 100);
				term.putString("Load Game", 0, 1, 100, 100, 100);
				term.putString("Options", 0, 2, 255, 255, 255);
			}
			if (menuNum === 3) {
				term.putString("New Game", 0, 0, 255, 255, 255);
				term.putString("Load Game", 0, 1, 100, 100, 100);
				term.putString("Options", 0, 2, 100, 100, 100);
			}
			menuNum--;
		}
		
	if (k === ut.KEY_ENTER) {
		if (menuNum === 1) {
			mapGen();
			mapGenKeys();
			
			//ut.initInput(mapKeyDown);
		}
		else if (menuNum === 2) {
			wipeScreen();
		}
		else if (menuNum === 3) {
			wipeScreen();
		}
		
	} 
	term.render();
}

//Wipes screen
function wipeScreen() {
	for (i = 0; i <= windowWidth; i++) {
		for (j = 0; j <= windowHeight; j++){term.put(ut.NULLTILE, i, j);}
	}	
	term.render();
}

// Initialize stuff
function initSimpleDungeon() {
	window.setInterval(tick1, 50); // Animation
	// Initialize Viewport, i.e. the place where the characters are displayed
	term = new ut.Viewport(document.getElementById("game"), windowWidth, windowHeight);
	menu();
}

function startGame() {
	var cursor = false;
	wipeScreen();
	window.setInterval(tick2, 50);
	eng = new ut.Engine(term, getTile, undefined, undefined);
	ut.initInput(onKeyDown);	
}


