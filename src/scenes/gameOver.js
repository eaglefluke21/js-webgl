// src/scenes/gameOver.js
import k from "../KaplayCtx.js";

export default function gameOver() {
  // Draw background as fixed layers so they don't scroll
  k.add([k.sprite("bg1_1"), k.pos(0, 0), k.scale(2.5), k.fixed(), k.z(-10)]);
  k.add([k.sprite("bg1_3"), k.pos(0, 0), k.scale(1.3), k.fixed(), k.z(-5)]);

  // Centered game over text
  const center = k.center();
  k.add([k.text("Game Over\nPress SPACE to retry", { size: 48 }), k.pos(center.x, center.y - 20)]);

  k.onKeyPress("space", () => {
    k.go("game");
  });
}
