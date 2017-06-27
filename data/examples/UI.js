var ui = {inventory: false, quests: false, politicalmap: true}

// game ui box 
function gameUI() {
	term.putString("┌───────────────┐",0 ,0 , 255, 255, 255); 
	for (i = 1; i < (windowHeight-1); i++){
		term.putString("|               |",0 ,i , 255, 255, 255);
	}
	term.putString("└───────────────┘",0 ,29 , 255, 255, 255);
	term.putString("───────────────",1 ,3 , 255, 255, 255);
	
	displayInventory();
	gameNotifications(); //notifications
	gameHotkeys();//hotkeys - join under "UI" 
	gameShowLoc();
}

//displayInventory
function displayInventory() {
	
	if (ui.inventory === true){
		//box
		term.putString("┌────────────────────────────────┐",18 ,0 , 255, 255, 255); 
		for (i = 0; i < 10; i++){
			term.putString("|                                |",18 ,1+i , 255, 255, 255);
		}
		term.putString("└────────────────────────────────┘",18 ,10 , 255, 255, 255);
		term.putString("INVENTORY",19 ,0 , 255, 255, 255);
		
		drawBox(34, 11, 18, 11);
		
		//items
		term.put(inventory[0].tile, 19, 1);
		term.putString("----", 20, 1, 255, 255, 255);
		term.putString(inventory[0].name, 25, 1, 255, 255, 255)
		term.put(inventory[01].tile, 19, 2);
		term.putString("----", 20, 2, 255, 255, 255);
		term.putString(inventory[1].name, 25, 2, 255, 255, 255)
	}
	
	
	
}

//drawBox
function drawBox (width, height, locx, locy) {
	var topString = ["┌"]
	var midString = ["|"]
	var bottomString = ["└"]
	
	for (i = 0; i < (width-2); i++){
		topString.push("─");
		midString.push(" ");
		bottomString.push("─");
	}
	
	topString.push("┐");
	midString.push("|");
	bottomString.push("┘");
	
	term.putString(topString.join(''), locx, locy, 255, 255, 255);
	for (i = 0; i < (height-1); i++){
		term.putString(midString.join(''), locx, locy+1+i, 255, 255, 255);
	}
	term.putString(bottomString.join(''), locx, locy+(height-1), 255, 255, 255);
}

//prints notifications on left
function gameNotifications() {
	term.putString(notifications.thisnot, 1 ,1 , 255, 255, 255)
	term.putString(notifications.prevnot, 1 ,2 , 255, 255, 255);
}

//prints hotkeys
function gameHotkeys() {
	term.putString("I", 1 ,4 , 255, 255, 255)
	term.putString("nventory", 2 ,4 , 100, 100, 100);
}

function gameShowLoc() {
	//term.putString("X - ", 1 ,5 , 255, 255, 255)
	term.putString(pl.x, 6 ,5 , 100, 100, 100);
	//term.putString("Y - ", 1 ,6 , 255, 255, 255)
	term.putString(pl.y, 6 ,6 , 100, 100, 100);
}

//notifies and logs interactions
function gameInteractions() {
	if (interactions.stuck === true){
		notifications.thisnot = ("There is a " + interactions.name + " in the way.");  
	}
	if (interactions.talk === true){
		notifications.thisnot = ("Hello, " + interactions.name); 
	}
	if (interactions.fight === true){
		//term.putString("You hit the " + interactions.name ,1 ,1 , 255, 255, 255);
		notifications.thisnot = ("You hit the " + interactions.name); 
		//notifications.prevnot = ("You hit the " + interactions.name); 
	}
	if (interactions.pickup === true){
		term.putString("You pick up the " + interactions.name,1 ,1 , 255, 255, 255);
		notifications.thisnot = ("You pick up the " + interactions.name); 
		//notifications.prevnot = ("You pick up the " + interactions.name); 
	}
}

/* function highlight(string) {
	term.putString(string, 0, 2, 255, 255, 255);
} */

