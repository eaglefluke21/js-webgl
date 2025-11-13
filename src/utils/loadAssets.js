import k from "../KaplayCtx";

export default function loadAssets() {
  // Load fonts
  k.loadFont("shortBaby", "fonts/ShortBaby-Mg2w.ttf");

  // Load sounds
  k.loadSound("city", "/sounds/city.mp3");
  k.loadSound("destroy", "/sounds/Destroy.wav");
  k.loadSound("hurt", "/sounds/Hurt.wav");
  k.loadSound("hyper-ring", "/sounds/HyperRing.wav");
  k.loadSound("jump", "/sounds/jump.wav");
  k.loadSound("ring", "/sounds/Ring.wav");

  // Load sprites
  k.loadSprite("bg1_1", "/graphics/bg1_1.png");
  k.loadSprite("bg1_3", "/graphics/bg1_3.png");
  k.loadSprite("mossy", "/graphics/Mossy-Platform.png");
  k.loadSprite("diamond", "/graphics/Diamond.png");
  k.loadSprite("player_idle", "/graphics/player_idle.png", {
    sliceX: 4,
    sliceY: 1,
    anims: {
      run: { from: 0, to: 3, speed: 10, loop: true },
    },
  });

  k.loadSprite("bulldozer_idle", "/graphics/bulldozer.png", {
    sliceX: 6,
    sliceY: 1,
    anims: {
      run: { from: 0, to: 5, speed: 10, loop: true },
    },
  });
}