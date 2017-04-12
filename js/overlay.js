var overlay = {}
overlay.dom = document.getElementById("overlay");
overlay.menuState = "";
overlay.show = function() {
	this.dom.style.display = "block";
}
overlay.hide = function() {
	this.dom.style.display = "none";
}
overlay.switchMenu = function(menu) {
	this.menuState = menu;
	for (i = 0; i < document.getElementsByClassName("menu-block").length; i++) { // hide all menu sections
		document.getElementsByClassName("menu-block")[i].style.display = "none";
	}
	document.getElementById(menu).style.display = "block"; // show specific menu passed to function
}

overlay.updateSettingsMouseSens = function() {
	switch (game.settings.mouseSens) {
		case  game.preset.mouseSens[0]:
			document.getElementById("mouse-sens").innerHTML = "Low";
		break;
		case  game.preset.mouseSens[1]:
			document.getElementById("mouse-sens").innerHTML = "Medium";
		break;
		case  game.preset.mouseSens[2]:
			document.getElementById("mouse-sens").innerHTML = "High";
		break;
	}
}

overlay.updateSettingsGamepadSens = function() {
	switch (game.settings.gamepadSens) {
		case game.preset.gamepadSens[0]:
			document.getElementById("gamepad-sens").innerHTML = "Low";
		break;
		case game.preset.gamepadSens[1]:
			document.getElementById("gamepad-sens").innerHTML = "Medium";
		break;
		case game.preset.gamepadSens[2]:
			document.getElementById("gamepad-sens").innerHTML = "High";
		break;
	}
}

overlay.updateSettingsDifficulty = function() {
	switch (game.settings.difficulty) {
		case 1:
			document.getElementById("difficulty").innerHTML = "Easy";
		break;
		case 2:
			document.getElementById("difficulty").innerHTML = "Medium";
		break;
		case 3:
			document.getElementById("difficulty").innerHTML = "Hard";
		break;
	}
}

// clickers

document.getElementById("btn-new").onclick = function() {
	game.load("level-1");
	game.currentLevel = 1;
}

document.getElementById("btn-continue").onclick = function() {
	game.load("level-" + game.currentLevel);
}

document.getElementById("btn-select").onclick = function() {
	overlay.switchMenu("select");
}

document.getElementById("btn-settings").onclick = function() {
	overlay.switchMenu("settings");
}

document.getElementById("btn-quit").onclick = function() {
	window.close();
	history.back();
	console.log("quit");
}


document.getElementById("btn-resume").onclick = function() {
	game.togglePause();
}

document.getElementById("btn-settings-ingame").onclick = function() {
	overlay.switchMenu("settings");
}

for (i = 0; i < document.getElementsByClassName("btn-restart").length; i++) {
	document.getElementsByClassName("btn-restart")[i].onclick = function() {
		game.ingame.restart();
	}
}

for (i = 0; i < document.getElementsByClassName("btn-exit").length; i++) {
	document.getElementsByClassName("btn-exit")[i].onclick = function() {
		if (game.state != "completeScreen" && game.state != "nextScreen") { game.unload(); }
		overlay.switchMenu("main-menu");
	}
}

for (i = 0; i < document.getElementsByClassName("btn-back").length; i++) {
	document.getElementsByClassName("btn-back")[i].onclick = function() {
		if (game.state == "paused") {
			overlay.switchMenu("pause");
		} else if (game.state == "menu") {
			overlay.switchMenu("main-menu");
		}
	}
}

document.getElementById("btn-next").onclick = function() {
	game.load("level-" + game.currentLevel);
}


document.getElementById("btn-setting-mouse-look-sens").onclick = function() {
	game.changeMouseSens();
}

document.getElementById("btn-setting-gamepad-look-sens").onclick = function() {
	game.changeGamepadSens();
}

document.getElementById("btn-setting-difficulty").onclick = function() {
	game.changeDifficulty();
}
