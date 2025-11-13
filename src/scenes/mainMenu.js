// src/scenes/MainMenu.js
import createParallaxBackground from "../utils/parallaxBackground.js";
import k from "../KaplayCtx.js";

export default function mainMenu() {
  // Create parallax background (assets are awaited in main.js)
  createParallaxBackground();

  // Add any menu UI here (e.g. title, press key to start, etc.)
  // Example:
  k.add([k.text("Press SPACE to Play"), k.pos(k.center().x, 200)]);

  // Listen for start
  k.onKeyPress("space", () => {
    k.go("game");
  });
}
