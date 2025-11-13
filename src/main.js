import k from "./KaplayCtx.js";
import loadAssets from "./utils/loadAssets.js";
import mainMenu from "./scenes/MainMenu.js";
import mainPlay from "./scenes/mainPlay.js";
import gameOver from "./scenes/gameOver.js";

(async () => {

await loadAssets();
// Define scenes
k.scene("main-menu", mainMenu);
k.scene("game", mainPlay);
k.scene("gameover", gameOver);

// Start the game
k.go("main-menu");

k.onButtonPress("jump", () => {
  k.go("game");
});

})();
