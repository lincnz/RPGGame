// game ui box 
function gameUI() {
	term.putString("┎━━━━━━━━━━━━━━━┒",0 ,0 , 255, 255, 255); 
	for (i = 1; i < (windowHeight-1); i++){
		term.putString("|               |",0 ,i , 255, 255, 255);
	}
	term.putString("┖━━━━━━━━━━━━━━━┚",0 ,29 , 255, 255, 255);
	
	if (ui.inventory === true){
		term.putString("┎━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┒",41 ,10 , 255, 255, 255); 
		for (i = 0; i < 10; i++){
			term.putString("|                                |",41 ,11+i , 255, 255, 255);
		}
		term.putString("┖━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┚",41 ,21 , 255, 255, 255);
	}
}

//prints notifications on left
function gameNotifications() {
	term.putString(notifications.thisnot, 1 ,1 , 255, 255, 255)
	term.putString(notifications.prevnot, 1 ,2 , 255, 255, 255);
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