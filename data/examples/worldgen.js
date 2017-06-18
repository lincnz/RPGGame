//height and width of map
var mapWidth = 71;
var mapHeight = 24;
var worldMap = [];

// The tile palette is precomputed in order to not have to create
// thousands of Tiles on the fly.	

//Terrain tiles
var AT = {name: "player", tile: new ut.Tile("@", 255, 255, 255)}
var GRASS = {name: "grass", tile: new ut.Tile(".", 80, 150, 80), walkable: true};
var GRASS2 = {name: "grass", tile: new ut.Tile(".", 90, 250, 90), walkable: true};
var GRASS3 = {name: "grass", tile: new ut.Tile(',', 0, 102, 0), walkable: true};
var TREE = {name: "tree", tile: new ut.Tile("☘", 20, 100, 20), walkable: false, obtainable: false, talkable: true};
var ROCK = {name: "rock", tile: new ut.Tile("☁", 100, 100, 100), walkable: false, obtainable: false};
var SAND = {name: "sand", tile: new ut.Tile(".", 255, 255, 0), walkable: true};
var BROWNTREE = {name: "tree", tile: new ut.Tile("☘", 102, 51, 0), walkable: false};
var OCEAN = {name: "seawater", tile: new ut.Tile(".", 0, 0, 255, 0, 0, 35), walkable: true};

//NPC tiles
var SERPENT = {name: "serpent", tile: new ut.Tile("ζ", 80, 150, 80), fightable: true};

//Item tiles
var AXE = {name: "axe", tile: new ut.Tile("Ͳ", 100, 100, 20), obtainable: true};

//Map tile
var MAPOCEAN = new ut.Tile("≈", 0, 0, 255, 0, 0, 35);
var MAPDEEPOCEAN = new ut.Tile("≈", 0, 0, 155, 0, 0, 45);
var MAPFOREST = new ut.Tile("♠", 80, 150, 80, 20, 35, 20);
var MAPHILL = new ut.Tile("☁", 100, 100, 100);
var MAPDESERT = new ut.Tile("˷", 200, 200, 0, 35, 35, 0);
var MAPMOUNTAIN = new ut.Tile("◭", 255, 255, 255, 0, 0, 0);



//adds mapHeight number of arrays to worldMap array (y-axis)
function worldMap2d(){
	for(y = 0; y <= mapHeight; y++){
		worldMap[y] = new Array();
	}
}

//continent shape
function landDecide() {
	if (Math.random() > 0.8) {
		if (Math.random() > 0.5) 
			{term.put(MAPDESERT, x, y);}
		else if (Math.random() > 0.8)

			{term.put(MAPMOUNTAIN, x, y);}
		else	
			{term.put(MAPHILL, x, y);}
	}
	else {
		term.put(MAPFOREST, x, y);
	}
}

function generateOcean(){
	for (x = 6; x <= 5+mapWidth; x++) {
		for (y = 3; y <= 2+mapHeight; y++) {
			if(Math.random() > 0.8){term.put(MAPDEEPOCEAN, x, y);}
			else {term.put(MAPOCEAN, x, y);}
		}
	}
}

function checkAdjacent(x, y, tile) {
	if ((term.get(x-1, y) === tile) || (term.get(x+1, y) === tile) || (term.get(x, y-1) === tile) || (term.get(x, y+1) === tile)) {
		return true;
	}
	else {
		return false;
	}
}


//checks if a tile has ocean adjacent
function checkAdjacentOcean(x, y){
	if ((term.get(x-1, y) === MAPOCEAN) || (term.get(x+1, y) === MAPOCEAN) || (term.get(x, y-1) === MAPOCEAN) || (term.get(x, y+1) === MAPOCEAN)) {
		return true;
	}
	else {
		return false;
	}
}

function generateContinents(){
	var continent = 0;

	for(i = 0; i <= 2; i++){
		for (x = (9 + 24*continent); x <= (25 + 24*continent); x++) {
			for (y = 6; y <= 23; y++) 
				//PUT A FUNCTION
				landDecide(x, y);

		}
		continent++;	
	}
	

	//checks for edge of map
	function checkEdge(x, y){
		if ((term.get(x-1, y) === ut.NULLTILE) || (term.get(x+1, y) === ut.NULLTILE) || (term.get(x, y-1) === ut.NULLTILE) || (term.get(x, y+1) === ut.NULLTILE)) {
			return true;
		}
		else {
			return false;
		}
	}
	
	//removes land randomly
	function removeLand(x, y){
		if (checkAdjacentOcean(x, y) === true && checkEdge(x, y) === false) {
			if (Math.random() > 0.8){
				term.put(MAPOCEAN, x, y);
			}
		}
	}
	
	
	//runs removeland
	/*
	for(i = 0; i < 6; i++){
		for(x = 0; x < windowWidth; x++){
			for(y = 0; y < windowHeight; y++){
				removeLand(x, y);
			}
		}
	}
	*/
	
	
}

//possible border code
function generateRegions() {
	var bor1y = 12;

	var bor2y = 17;

	for(i = 0; i <= 16; i++){
		if (term.get(9+i, bor1y) != MAPOCEAN && term.get(9+i, bor1y) != MAPDEEPOCEAN){
		if(Math.random() > 0.9) {term.put(MAPBORDER2, 9+i, bor1y); term.put(MAPBORDER3, 9+i, bor1y-1); bor1y--}
		else if(Math.random() > 0.8) {term.put(MAPBORDER4, 9+i, bor1y); term.put(MAPBORDER5, 9+i, bor1y+1); bor1y++}
		else {term.put(MAPBORDER1, 9+i, bor1y);}
		}
	}
	for(i = 0; i <= 16; i++){

		if(Math.random() > 0.9) {term.put(MAPBORDER2, 9+i, bor2y); term.put(MAPBORDER3, 9+i, bor2y-1); bor2y--}
		else if(Math.random() > 0.8) {term.put(MAPBORDER4, 9+i, bor2y); term.put(MAPBORDER5, 9+i, bor2y+1); bor2y++}
		else {term.put(MAPBORDER1, 9+i, bor2y);}
	}
	
}

function mapGen(k) {
	wipeScreen();
	
	//ocean generation
	generateOcean();
	
	//land generation
	generateContinents();

	//islands
	//height
	//mountains
	//rivers
	//lakes
	
	//regions (deactivated)
	//generateRegions();
	
	//towns
	//cities
	//roads
	//lairs
	//story NPCs
	//random NPCs
	//animals
	//magical
	//mainquest
	//sidequests
	//procquests
	
	//SAVES PART OF MAP
	//playerStart = term.get(9, 6);
	
	//SAVES MAP TO ARRAY
	worldMap2d();
	for(i = 0; i <=(mapWidth); i++){
		for(j = 0; j <=mapHeight; j++){
			worldMap[j][i] = term.get(6+i, 3+j)
		}
	}
	
		
	term.putString("Begin game: Y", 30, 29, 100, 100, 100);
	term.render();
	
	
	//map storage test using store.js
	store.set('user', { name: 'Lincoln', likes: 'javascript' });

	alert("Test successful, " + store.get('user').name + "!");
	
}

var serplocx = 301;
var serplocy = 301;

//runs chunkMaker to get tiles (unescessary?)


function updateEntityLoc(){
	/*
	if(oldx < pl.x){serplocx--}
	if(oldy < pl.y){serplocy--}
	if(oldx > pl.x){serplocx++}
	if(oldy > pl.y){serplocy++}
	*/
	
	/*
	if(Math.random() > 0.995){serplocx--}
	if(Math.random() > 0.99){serplocy--}
	if(Math.random() > 0.985){serplocx++}
	if(Math.random() > 0.98){serplocy++}
	*/

}

	
//makes the chunks
function getTile (x, y) {
		if (x >= 0 && y <= (mapHeight*100) && x <= (mapWidth*100) && y >= 0) {
			return getChunk(x, y).tile;
		}	
		
		//edge of map
		else {
			return ut.NULLTILE;
		}
	
}



//LIMIT ON X,Y
function getChunk(x, y) {
		for (j = 0; j <= mapHeight; j++){
		for (i = 0; i <= mapWidth; i++){
				var worldtile = worldMap[j][i];
					
					//place serpent
					if (x === serplocx && y === serplocy) {
						return SERPENT;
					}
					
					if (x === 302 && y === 302) {
						return AXE;
					}
					
					else if (x <= (99+100*i) && y <= (99+100*j) && x >= (100*i) && y >= (100*j)) {
					if (worldtile === MAPDESERT) {return getDesert(x, y);}
					else if (worldtile === MAPHILL) {return getHill(x, y);}
					else if (worldtile === MAPOCEAN) {return getOcean(x, y);}
					else if (worldtile === MAPDEEPOCEAN) {return getOcean(x, y);}
					else {return getForest(x, y);}
					
			}
		}
		}	
}

//basic forest tile
function getForest (x, y) {
	var r = rand(Math.round(x), Math.round(y));

		if (r > 0.80) {return TREE;}
		if (r > 0.75) {return ROCK;}
		if (r > 0.50) {return GRASS2;}
		if (r > 0.45) {return GRASS3;}
		return GRASS;
}

//Basic desert tile
function getDesert (x, y) {
	var r = rand(Math.round(x), Math.round(y));
		if (r > 0.95) {return BROWNTREE;}
		if (r > 0.75) {return ROCK;}
		return SAND;
}

//hill tile
function getHill (x, y) {
	var r = rand(Math.round(x), Math.round(y));
		if (r > 0.95) {return BROWNTREE;}
		if (r > 0.5) {return ROCK;}
		return GRASS;
}

//ocean tile
function getOcean (x, y) {
		return OCEAN;
}

//globals
var mapcursorx = 5;
var mapcursory = 2;
var old = {};
var cursor = false;

function mapGenKeys() {
	old.location = term.get(mapcursorx, mapcursory);
	term.putString("x", 6, 3, 100, 100, 100);
	var cursor = true;
	window.setTimeout(flashCursorOff, 500);
	ut.initInput(mapKeyDown);
}

function flashCursorOff() {
	if (cursor === true){
		term.put(old.location, mapcursorx, mapcursory);
		window.setTimeout(flashCursorOn, 500);
	}
}


function flashCursorOn() {
	if (cursor === true){
		term.putString("x", mapcursorx, mapcursory, 100, 100, 100);
		window.setTimeout(flashCursorOff, 500);
	}
}

function mapKeyDown(k) { 
	
	term.put(old.location, mapcursorx, mapcursory);
	
	if (k === ut.KEY_Y) {
		startGame();
	}
	
	if (k === ut.KEY_LEFT) {
		old.location = term.get(mapcursorx-1, mapcursory);
		mapcursorx--;
		term.putString("x", mapcursorx, mapcursory, 100, 100, 100);
		ut.initInput(mapKeyDown);
	}
	else if (k === ut.KEY_RIGHT) {
		old.location = term.get(mapcursorx+1, mapcursory);
		mapcursorx++;
		term.putString("x", mapcursorx, mapcursory, 100, 100, 100);
		ut.initInput(mapKeyDown);
	}
	else if (k === ut.KEY_UP) {
		old.location = term.get(mapcursorx, mapcursory-1);
		mapcursory--;
		term.putString("x", mapcursorx, mapcursory, 100, 100, 100);
		ut.initInput(mapKeyDown);
	}
	else if (k === ut.KEY_DOWN) {
		old.location = term.get(mapcursorx, mapcursory+1);
		mapcursory++;
		term.putString("x", mapcursorx, mapcursory, 100, 100, 100);
		ut.initInput(mapKeyDown);
	}
	
}


