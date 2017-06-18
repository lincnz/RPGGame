/*global ut */
var term, eng; // Can't be initialized yet because DOM is not ready
var pl = { x: 300, y: 300 }; // Player position
var updateFOV;
var menuNum = 1;

var windowHeight = 30;
var windowWidth = 100;

// Menu main loop
function tickMenu() {
	term.render(); // Render
}

var interactions = {name, fight: false, pickup: false,  stuck: false, talk: false }
var notifications = {thisnot: "none", prevnot: "none"}
var mouseover = {mouse: false}

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

// Initialize stuff
function initSimpleDungeon() {
	window.setInterval(tickMenu, 50); // Animation
	// Initialize Viewport, i.e. the place where the characters are displayed
	term = new ut.Viewport(document.getElementById("game"), windowWidth, windowHeight);
	menu();
}