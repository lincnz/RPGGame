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
var OCEAN = {name: "seawater", tile: new ut.Tile(".", 0, 0, 255, 0, 0, 35), walkable: false};

//NPC tiles
var SERPENT = {name: "serpent", tile: new ut.Tile("ζ", 80, 150, 80), fightable: true};

//Item tiles
var AXE = {name: "axe", tile: new ut.Tile("Ͳ", 100, 100, 20), obtainable: true};
var SWORD = {name: "sword", tile: new ut.Tile("†", 100, 100, 20), obtainable: true};

//Map tile
var MAPOCEAN = new ut.Tile("≈", 0, 0, 255, 0, 0, 35);
var MAPDEEPOCEAN = new ut.Tile("≈", 0, 0, 155, 0, 0, 45);
var MAPFOREST = new ut.Tile("♠", 80, 150, 80, 20, 35, 20);
var MAPHILL = new ut.Tile("☁", 100, 100, 100);
var MAPDESERT = new ut.Tile("˷", 200, 200, 0, 35, 35, 0);
var MAPMOUNTAIN = new ut.Tile("◭", 255, 255, 255, 0, 0, 0);