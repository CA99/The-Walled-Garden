// startup handler
if (localStorage.data) {
	game.loadData();
	game.settings.mouseSens = data.mouseSens;
	game.settings.gamepadSens = data.gamepadSens;
	game.currentLevel = data.currentLevel;
	game.settings.difficulty = data.difficulty;
}
else {
	game.saveData();
}
overlay.show();
overlay.switchMenu("main-menu");
overlay.updateSettingsMouseSens();
overlay.updateSettingsGamepadSens();
overlay.updateSettingsDifficulty();
game.applyDifficulty();
