var game = {};
game.levelCount = 1;
game.settings = {};
game.preset = {};
game.preset.gravity = -0.1962 //-0.4905; //-0.0981; //-0.981;
game.preset.mouseSens = [500,300,100];
game.preset.gamepadSens = [25,15,5];
game.preset.speed = 2;
game.preset.impededSpeed = 0.7;
game.preset.gamepadMoveSens = 40;
// Savables ___
var data = {};
game.settings.mouseSens = game.preset.mouseSens[1];
game.settings.gamepadSens = game.preset.gamepadSens[1];
game.currentLevel = 0; // 0: no game started
game.settings.difficulty = 2;
// Savables ___
game.saveData = function() {
	data.mouseSens = game.settings.mouseSens;
	data.gamepadSens = game.settings.gamepadSens;
	data.currentLevel = game.currentLevel;
	data.difficulty = game.settings.difficulty;
	//if (Object.keys(data).length > 0) {
		localStorage.data = JSON.stringify(data);
	/*}
	else {
		localStorage.clear();
	}*/
}
game.loadData = function() {
	if (localStorage.data) {
		data = JSON.parse(localStorage.data);
	}
}
game.state = "menu"; //menu, running, paused
game.pointerLocked = false;
game.pause = function() {
	game.state = "paused";
	currentScene.activeCamera.angularSensibility = 65534;
	currentScene.activeCamera.gamepadAngularSensibility = 65534;
	currentScene.activeCamera.speed = 0;
	overlay.show();
}
game.resume = function() {
	game.state = "running";
	currentScene.activeCamera.angularSensibility = game.settings.mouseSens;
	currentScene.activeCamera.gamepadAngularSensibility = game.settings.gamepadSens;
	currentScene.activeCamera.speed = game.preset.speed;
	overlay.hide();
}
game.togglePause = function() {
	switch (game.state) {
		case "paused":
			console.log("paused, resuming");
			game.resume();
		break;
		case "running":
			console.log("running, pausing");
			game.pause();
		break;
	}
}
game.changeMouseSens = function() {
	switch (game.settings.mouseSens) {
		case  game.preset.mouseSens[0]:
			game.settings.mouseSens =  game.preset.mouseSens[1];
		break;
		case  game.preset.mouseSens[1]:
			game.settings.mouseSens =  game.preset.mouseSens[2];
		break;
		case  game.preset.mouseSens[2]:
			game.settings.mouseSens =  game.preset.mouseSens[0];
		break;
	}
	overlay.updateSettingsMouseSens();
	if (currentScene) { currentScene.activeCamera.angularSensibility = game.settings.mouseSens; }
	game.saveData();
}
game.changeGamepadSens = function() {
	switch (game.settings.gamepadSens) {
		case game.preset.gamepadSens[0]:
			game.settings.gamepadSens = game.preset.gamepadSens[1];
		break;
		case game.preset.gamepadSens[1]:
			game.settings.gamepadSens = game.preset.gamepadSens[2];
		break;
		case game.preset.gamepadSens[2]:
			game.settings.gamepadSens = game.preset.gamepadSens[0];
		break;
	}
	overlay.updateSettingsGamepadSens();
	if (currentScene) { currentScene.activeCamera.gamepadAngularSensibility = game.settings.gamepadSens; }
	game.saveData();
}
game.changeDifficulty = function() {
	switch (game.settings.difficulty) {
		case 1:
			game.settings.difficulty = 2;
		break;
		case 2:
			game.settings.difficulty = 3;
		break;
		case 3:
			game.settings.difficulty = 1;
		break;
	}
	game.applyDifficulty();
	overlay.updateSettingsDifficulty();
	game.saveData();
}
game.applyDifficulty = function() {
	switch (game.settings.difficulty) {
		case 1:
			game.jumpHeight = 2;
		break;
		case 2:
			game.jumpHeight = 1;
		break;
		case 3:
			game.jumpHeight = 0.2;
		break;
	}
}
game.ingame = {};
game.ingame.isJumping = false;
game.ingame.cameraJump = function(jumpHeight) {
	if (game.state == "running" || game.state == "paused") {
		{
			//camera.position.y += 4;
			game.ingame.isJumping = true;
			var cam = currentScene.activeCamera;
			cam.animations = [];
			var animation = new BABYLON.Animation(
				"a",
				"position.y", 20,
				BABYLON.Animation.ANIMATIONTYPE_FLOAT,
				BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE
			);
			// Animation keys
			var keys = [];
			keys.push({ frame: 0, value: cam.position.y });
			keys.push({ frame: 3, value: cam.position.y + jumpHeight });
			keys.push({ frame: 4, value: cam.position.y + jumpHeight });
			//keys.push({ frame: 10, value: cam.position.y });
			animation.setKeys(keys);
			var easingFunction = new BABYLON.CircleEase();
			easingFunction.setEasingMode(BABYLON.EasingFunction.EASINGMODE_EASEINOUT);
			animation.setEasingFunction(easingFunction);
			cam.animations.push(animation);
			currentScene.beginAnimation(cam, 0, 20, false, 1, function() {
				setTimeout(function() { game.ingame.isJumping = false; }, 400);
			});
		}
	}
}
game.ingame.restart = function() {
	currentScene.activeCamera.position.x = currentScene.getMeshByName("ref-startpoint").absolutePosition.x;
	currentScene.activeCamera.position.y = currentScene.getMeshByName("ref-startpoint").absolutePosition.y;
	currentScene.activeCamera.position.z = currentScene.getMeshByName("ref-startpoint").absolutePosition.z;
	currentScene.activeCamera.rotation.x = 0;
	currentScene.activeCamera.rotation.y = 0;
	currentScene.activeCamera.rotation.z = 0;
	game.togglePause();
}
game.nextLevelScreen = function() {
	game.unload();
	overlay.show();
	if (game.currentLevel < game.levelCount) {
		game.currentLevel++;
		game.saveData();
		overlay.switchMenu("game-next");
		game.state = "nextScreen";
	} else {
		overlay.switchMenu("game-complete");
		game.state = "completeScreen";
	}
	// load next level, hide overlay
}

game.viewCollision = function() {
	currentScene.getMaterialByName("collider").alpha = 0.5;
	currentScene.getMaterialByName("impeder").alpha = 0.5;
}
