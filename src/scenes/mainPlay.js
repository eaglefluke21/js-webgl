// src/scenes/mainPlay.js
import k from "../KaplayCtx.js";
import setupBulldozer from "../utils/bulldozerSetup.js";
import setupPlayer from "../utils/playerSetup.js";
import createParallaxBackground from "../utils/parallaxBackground.js";

export default function mainPlay() {
  
    createParallaxBackground();
  
  // Setup player
  const player = setupPlayer(k.height());

  let counter = 0;
  // place counter at top-left with some padding
  const counterUI = k.add([k.text("0"), k.pos(20, 20), k.z(50)]);

  // spawn bulldozer every 2 seconds
  k.loop(2, () => {
    counter++;
    counterUI.text = counter.toString();

    setupBulldozer(player, k.height());
  });

  // ensure best-score exists
  if (!k.getData("best-score")) {
    k.setData("best-score", 0);
  }
}
