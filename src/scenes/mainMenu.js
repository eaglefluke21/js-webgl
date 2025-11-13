import k from "../KaplayCtx";
import createParallaxBackground from "../utils/parallaxBackground.js";
import setupPlayer from "../utils/playerSetup.js";

export default function mainMenu() {
  const groundY = 720;

  // Add mossy platform
  k.add([
    k.sprite("mossy"),
    k.pos(0, k.height() - 15),
    k.scale(0.3),
    k.fixed(),
    k.z(-3),
  ]);

  // Create parallax background
  createParallaxBackground();

  // Setup player
  const player = setupPlayer(groundY);

  let counter = 0;
  const counterUI = k.add([k.text("0")]);

  k.loop(2, () => {
    counter++;
    counterUI.text = counter.toString();
    const speeds = [200, 250, 300, 350];
    const currentSpeed = speeds[Math.floor(Math.random() * speeds.length)];
    const bulldozer = k.add([
      k.sprite("bulldozer_idle"),
      k.pos(1180, groundY - 200),
      k.area({ shape: new k.Rect(k.vec2(35, 20), 40, 42) }),
      k.body(),
      k.move(k.vec2(-1, 0), currentSpeed),
      k.scale(2),
    ]);

    bulldozer.play("run");

    bulldozer.onUpdate(() => {
      if (bulldozer.pos.x < -200) bulldozer.destroy();

      // Check collision with player
      if (player.isColliding(bulldozer)) {
        k.go("gameover");
      }
    });
  });

  console.log("Main Menu Scene");
  if (!k.getData("best-score")) {
    k.setData("best-score", 0);
  }
  k.onButtonPress("jump", () => {
    k.go("game");
  });
}


