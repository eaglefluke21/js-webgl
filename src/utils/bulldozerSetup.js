// src/utils/bulldozerSetup.js
import k from "../KaplayCtx.js";

export default function setupBulldozer(player, groundY) {
  const speeds = [200, 250, 300, 350];
  const currentSpeed = speeds[Math.floor(Math.random() * speeds.length)];

  const bulldozer = k.add([
    k.sprite("bulldozer_idle"),
    k.pos(1180, groundY - 135),
    k.area({ shape: new k.Rect(k.vec2(35, 20), 40, 42) }),
    k.body(), // if you want physics
    k.move(k.vec2(-1, 0), currentSpeed),
    k.scale(2),
  ]);

  if (typeof bulldozer.play === "function") {
    bulldozer.play("run");
  }

  bulldozer.onUpdate(() => {
    if (bulldozer.pos.x < -200) bulldozer.destroy();

    // use the engine-provided collision test if available; else fallback to bounding-box check
    let collided = false;
    if (typeof player.isColliding === "function") {
      collided = player.isColliding(bulldozer);
    } else if (player.area && bulldozer.area) {
      // fallback bounding check (AABB)
      const px1 = player.pos.x, py1 = player.pos.y;
      const bw1 = bulldozer.pos.x, bh1 = bulldozer.pos.y;
      if (
        Math.abs(px1 - bw1) < 80 && // approximate threshold
        Math.abs(py1 - bh1) < 80
      ) {
        collided = true;
      }
    }

    if (collided) {
      k.go("gameover");
    }
  });
}
