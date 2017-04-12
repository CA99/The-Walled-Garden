var canvas = document.getElementById('renderCanvas');
var engine;
var currentScene;

game.unload = function() {
	game.state = "menu";
	currentScene.dispose();
	engine = "";
	currentScene = "";
}
var sunlightShadows;
game.load = function(filename) {
	console.log("loading map: " + filename);
	engine = new BABYLON.Engine(canvas, true);
	overlay.switchMenu("pause");
	overlay.hide();
	game.state = "running";
	//var sunlightShadows;
	BABYLON.SceneLoader.Load("assets/", filename + ".babylon", engine, function(importedScene) {
		currentScene = importedScene;
		currentScene.executeWhenReady(function() {
			currentScene.clearColor = new BABYLON.Color4(0,0,0,1);
			currentScene.gravity = new BABYLON.Vector3(0, game.preset.gravity, 0);
			currentScene.collisionsEnabled = true;

			var goal = new BABYLON.Mesh.CreateBox("crate", 3, currentScene); // test object for collision, remove later
			goal.position = currentScene.getMeshByName("ref-endpoint").absolutePosition;
			goal.checkCollisions = true;
			goal.material = currentScene.getMaterialByName("collider");

			currentScene.lights[0]._isEnabled = false;
			currentScene.lights[1]._isEnabled = false;
			currentScene.lights[2]._isEnabled = false;
			var ambientLight = new BABYLON.HemisphericLight("ambient-light", new BABYLON.Vector3(0,1,0), currentScene);
			ambientLight.diffuse = new BABYLON.Color3(1,1,1);
			ambientLight.specular = new BABYLON.Color3(0,0,0);
			ambientLight.intensity = 0.5;
			var sunLight = new BABYLON.DirectionalLight("sun-light", new BABYLON.Vector3(-0.7001, -0.714, 0), currentScene);
			sunLight.diffuse = new BABYLON.Color3(1, 1, 1);
			sunLight.specular = new BABYLON.Color3(1, 1, 1);
			sunLight.intensity = 2;

			currentScene.getMeshByName("sky").receiveShadows = false;
			currentScene.getMeshByName("clouds").receiveShadows = false;
			currentScene.getMeshByName("sun").receiveShadows = false;

			sunlightShadows = new BABYLON.ShadowGenerator(512, sunLight, currentScene);
			sunlightShadows.useVarianceShadowMap = true;
			//sunlightShadows.usePoissonSampling = false;
			//sunlightShadows.getShadowMap().renderList.push(currentScene.getMeshByName("lamp"));
			//sunlightShadows.getShadowMap().renderList.push(currentScene.getMeshByName("rock1"));
			//sunlightShadows.getShadowMap().renderList.push(currentScene.getMeshByName("bench"));
			currentScene.getMeshByName("local-terrain").receiveShadows = true;
			sunlightShadows.bias = 0.01;

			var cam = new BABYLON.UniversalCamera(
				"PlayerCamera",
				new BABYLON.Vector3(
					currentScene.getMeshByName("ref-startpoint").absolutePosition.x,
					currentScene.getMeshByName("ref-startpoint").absolutePosition.y,
					currentScene.getMeshByName("ref-startpoint").absolutePosition.z
				),
				currentScene
			);
			currentScene.activeCamera = cam;
			cam.attachControl(canvas, true);
			cam.rotation = {"x":0,"y":0,"z":0};
			cam.fov = 77;
			cam.minZ = 0;
			cam.maxZ = 50000;
			cam.attachControl(canvas);
			cam.checkCollisions = true;
			cam.applyGravity = true;
			currentScene.activeCamera._needMoveForGravity = true;
			cam.ellipsoid = new BABYLON.Vector3(0.25, 0.8, 0.25);
			cam.speed = game.preset.speed;
			cam.gamepadMoveSensibility = game.preset.gamepadMoveSens;
			cam.inertia = 0;
			cam.angularSensibility = game.settings.mouseSens;
			cam.gamepadAngularSensibility = game.settings.gamepadSens;
			cam.keysUp.push(87); // W
			cam.keysLeft.push(65); // A
			cam.keysDown.push(83); // S
			cam.keysRight.push(68); // D

			//collisions
			currentScene.staticColliderObjects = [
				"local-terrain",
				"rock1",
				"rock2",
				"rock3",
				"rock4",
				"rock5",
				"rock6",
				"rock7",
				"rock8",
				"rock9",
				"rock10",
				"rock11",
				"rock12",
				"rock13",
				"rock14",
				"rock15",
				"rock16",
				"rock17",
				"rock18",
				"collider-000",
				"collider-001",
				"collider-002",
				"collider-003",
				"collider-004",
				"collider-005",
				"collider-015",
				"collider-016",
				"collider-023",
				"collider-024",
				"collider-025",
				"collider-026",
				"collider-028",
				"collider-029",
				"collider-030",
				"collider-031",
				"collider-032",
				"collider-033",
				"collider-034",
				"collider-035",
				"collider-036",
				"collider-037",
				"collider-038",
				"collider-039",
				"collider-040",
				"collider-041",
				"collider-042",
				"collider-043",
				"collider-044",
				"collider-045",
				"collider-046",
				"collider-047",
				"collider-048",
				"collider-049",
				"collider-053",
				"collider-054",
				"collider-055",
				"collider-056",
				"collider-057",
				"collider-058",
				"collider-059",
				"collider-060",
				"collider-061",
				"collider-062",
				"collider-063",
				"collider-064",
				"collider-065",
				"collider-066",
				"collider-068",
				"collider-069",
				"collider-070",
				"collider-071",
				"collider-072",
				"collider-073",
				"collider-074",
				"collider-075",
				"collider-076",
				"collider-077",
				"collider-078",
				"collider-079",
				"collider-080",
				"collider-081",
				"collider-082",
				"collider-083",
				"collider-084",
				"collider-085",
				"collider-086",
				"collider-087",
				"collider-088",
				"collider-089",
				"collider-090",
				"collider-091",
				"collider-092",
				"collider-093",
				"collider-094",
				"collider-095",
				"collider-096",
				"collider-097",
				"collider-098",
				"collider-099",
				"collider-100",
				"collider-101",
				"collider-102",
				"collider-103",
				"collider-104",
				"collider-105",
				"collider-106",
				"collider-107",
				"collider-108",
				"collider-109",
				"collider-110",
				"collider-111",
				"collider-112",
				"collider-113",
				"collider-114",
				"collider-115",
				"collider-116",
				"collider-117",
				"collider-118",
				"collider-119",
				"collider-120",
				"collider-121",
				"collider-122",
				"collider-123",
				"collider-124",
				"collider-125",
				"collider-126",
				"collider-127",
				"collider-128",
				"collider-129",
				"collider-130",
				"collider-131",
				"collider-132",
				"collider-133",
				"collider-134",
				"collider-135",
				"collider-136",
				"collider-137",
				"collider-138",
				"collider-139",
				"collider-140",
				"collider-141",
				"collider-142",
				"collider-143",
				"collider-144",
				"collider-145",
				"collider-146",
				"collider-147",
				"collider-148",
				"collider-149",
				"collider-150",
				"collider-151",
				"collider-152",
				"collider-153",
				"collider-154",
				"collider-155",
				"collider-156",
				"collider-157",
				"collider-158",
				"collider-159",
				"collider-160",
				"collider-161",
				"collider-162",
				"collider-163",
				"collider-164",
				"collider-165",
				"collider-166",
				"collider-167",
				"collider-168",
				"collider-169",
				"collider-170",
				"collider-171",
				"collider-172",
				"collider-173",
				"collider-174",
				"collider-175",
				"collider-188",
				"collider-189",
				"collider-190",
				"collider-191",
				"collider-192",
				"collider-193",
				"collider-194",
				"collider-195",
				"collider-196",
				"collider-197",
				"impeder-002",
				"impeder-008",
				"impeder-009",
				"impeder-011",
				"impeder-013",
				"impeder-014",
				"impeder-014",
				"impeder-015",
				"impeder-019",
				"impeder-022",
				"impeder-024",
				"impeder-025",
				"impeder-026",
				"impeder-027",
				"impeder-028",
				"impeder-029",
				"impeder-031",
				"impeder-033",
				"impeder-034",
				"impeder-035",
				"impeder-036",
				"impeder-039",
				"impeder-040",
				"impeder-041",
				"impeder-042",
				"impeder-043",
				"impeder-044",
				"impeder-045",
				"impeder-046",
				"impeder-047",
				"impeder-048",
				"impeder-049",
				"impeder-050",
			];
			for (i = 0; i < currentScene.staticColliderObjects.length; i++) {
				var mesh = currentScene.getMeshByName(currentScene.staticColliderObjects[i]);
				if (mesh) {
					mesh.checkCollisions = true;
				}
				else { console.error("error with staticColliderObject: " + currentScene.staticColliderObjects[i]); }
			}

			currentScene.getMaterialByName("collider").alpha = 0;
			currentScene.getMaterialByName("impeder").alpha = 0;

			game.pause();
			game.resume();
			var itest = currentScene.getMeshByName("impeder-002");
			cam.onCollide = function(checkMesh) {
				if (checkMesh.uniqueId == goal.uniqueId) {
					document.exitPointerLock();
					game.nextLevelScreen();
				}
				if (checkMesh.name.substring(0,7) == "impeder") {
					currentScene.activeCamera.speed = game.preset.impededSpeed;// - 0.7;
				}
				else {
					currentScene.activeCamera.speed = game.preset.speed;
				}
			}

			currentScene.registerBeforeRender(function() {
				/*if (cam.ellipsoid.intersectsMesh("itest", true)) {
					console.log("impeder intersection");
				}
				else { console.log("false"); }*/
				if (game.state == "running") {
					currentScene.getMeshByName("clouds").rotation.y += 0.0005;
				}
			});

			engine.runRenderLoop(function () {
				currentScene.render();
			});

		});
		return currentScene;
	});
}

window.addEventListener("keyup", onKeyUp, false);
window.addEventListener("keydown", onKeyDown, false);

function onKeyDown(event) {
	if (game.state == "running" || game.state == "paused") {
		switch (event.keyCode) {
			case 32:
				if (!game.ingame.isJumping) {
					//console.log("spaceDown");
					game.ingame.cameraJump(game.jumpHeight);
				}
			break;
			case 16:
				//console.log("shiftDown");
			break;
		}
	}
}
function onKeyUp(event) {
	if (game.state == "running" || game.state == "paused") {
		switch (event.keyCode) {
			case 32:
				//console.log("spaceUp");
			break;
			case 16: console.log("shiftUp");
			break;
			case 27:
				//console.log("escUp");
				game.togglePause();
			break;
		}
	}
}
var pointerlockchange = function (event) {
	if (game.state == "running" || game.state == "paused") {
		currentScene.controlEnabled = (document.pointerLockElement === canvas);
		// If the user is already locked
		if (!currentScene.controlEnabled) {
			currentScene.activeCamera.detachControl(canvas);
			game.pointerLocked = false;
		} else {
			currentScene.activeCamera.attachControl(canvas);
			game.pointerLocked = true;
		}
	}
}
canvas.addEventListener("click", function(evt) {
	if (game.state == "running" || game.state == "paused") {
		if (canvas.requestPointerLock) {
			canvas.requestPointerLock();
		}
	}
}, false);
document.addEventListener("pointerlockchange", pointerlockchange, false);

window.addEventListener("resize", function () {
	if (game.state != "menu") {
		engine.resize();
	}
});
