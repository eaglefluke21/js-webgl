import k from "../KaplayCtx";

export default function setupPlayer(groundY) {
  const player = k.add([
    k.sprite("player_idle"),
    k.pos(200, groundY - 100),
    k.area({ shape: new k.Rect(k.vec2(28, 20), 44, 44) }),
    k.body(),
    k.scale(2),
    k.offscreen(),
  ]);

  player.play("run");

  k.onKeyPress("space", () => {
    if (player.isGrounded()) {
      player.jump(600); // Increased jump height
      k.play("jump"); // Play jump sound
    }
  });

  player.onExitScreen(() => {
    k.go("gameover");
  });

  return player;
}