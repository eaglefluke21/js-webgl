// src/utils/playerSetup.js
import k from "../KaplayCtx.js";

export default function setupPlayer(groundY) {
  // Use rect(w, h) and area() for a proper collision box. Offset the rect if needed.
  k.setGravity(1000);
  const player = k.add([
    k.sprite("player_idle"),
    k.pos(200, groundY - 135),
    k.area({ shape: new k.Rect(k.vec2(28, 20), 44, 44) }),
    k.body(),
    k.scale(2),
    k.offscreen(),
  ]);

  // play run animation if present
  if (typeof player.play === "function") {
    player.play("run");
  }

k.onButtonPress("jump", () => {
  if (player.isGrounded()) player.jump(600);
});

  player.onExitScreen(() => {
    k.go("gameover");
  });

  return player;
}
