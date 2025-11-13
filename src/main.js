import k from "./KaplayCtx.js";
import loadAssets from "./utils/loadAssets.js";
import mainMenu from "./scenes/MainMenu.js";

// Load assets
loadAssets();

// Define scenes
k.scene("main-menu", mainMenu);

k.scene("gameover", () => {
  k.add([k.text("Game Over"), k.pos(k.center())]);
  k.add([k.sprite("bg1_1"), k.pos(0, 0), k.scale(2.5), k.fixed(), k.z(-10)]);
  k.add([k.sprite("bg1_3"), k.pos(0, 0), k.scale(1.3), k.fixed(), k.z(-5)]);
});

// Start the game
k.go("main-menu");



