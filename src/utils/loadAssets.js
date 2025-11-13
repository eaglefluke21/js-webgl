// src/utils/loadAssets.js
import k from "../KaplayCtx.js";

/**
 * Robust asset loader:
 * - Preloads images & audio using DOM objects to ensure resources are available.
 * - Loads font using FontFace API if available (fallback to document.fonts).
 * - Once preloaded, calls k.loadSprite / k.loadSound / k.loadFont so engine has the assets registered.
 */
function preloadImage(src) {
  return new Promise((res, rej) => {
    const img = new Image();
    img.src = src;
    img.onload = () => res(img);
    img.onerror = (e) => rej(new Error(`Failed to load image ${src}`));
  });
}

function preloadAudio(src) {
  return new Promise((res, rej) => {
    const audio = new Audio();
    audio.src = src;
    audio.oncanplaythrough = () => res(audio);
    audio.onerror = () => rej(new Error(`Failed to load audio ${src}`));
  });
}

async function loadFont(name, url) {
  if (window.FontFace) {
    try {
      const f = new FontFace(name, `url(${url})`);
      await f.load();
      document.fonts.add(f);
      return;
    } catch (err) {
      // fall through to document.fonts.load fallback
    }
  }
  // fallback: attempt to load via document.fonts
  try {
    await document.fonts.load(`12px "${name}"`);
  } catch (err) {
    console.warn("Font load fallback failed for", name, err);
  }
}

export default async function loadAssets() {
  // list all external paths used
  const fontPath = "/fonts/ShortBaby-Mg2w.ttf";

  const images = [
    "/graphics/bg1_1.png",
    "/graphics/bg1_3.png",
    "/graphics/Mossy-Platform.png",
    "/graphics/Diamond.png",
    "/graphics/player_idle.png",
    "/graphics/bulldozer.png",
  ];

  const sounds = [
    "/sounds/city.mp3",
    "/sounds/Destroy.wav",
    "/sounds/Hurt.wav",
    "/sounds/HyperRing.wav",
    "/sounds/jump.wav",
    "/sounds/Ring.wav",
  ];

  // preload everything (fail fast if any resource fails)
  await Promise.all([
    loadFont("shortBaby", fontPath),
    ...images.map((p) => preloadImage(p)),
    ...sounds.map((p) => preloadAudio(p)),
  ]).catch((err) => {
    console.warn("Some asset(s) failed to preload:", err);
    // don't abort entirely; continue to attempt engine registration
  });

  // Register with engine (call k.load* so engine knows about them)
  k.loadFont("shortBaby", fontPath);

  k.loadSound("city", "/sounds/city.mp3");
  k.loadSound("destroy", "/sounds/Destroy.wav");
  k.loadSound("hurt", "/sounds/Hurt.wav");
  k.loadSound("hyper-ring", "/sounds/HyperRing.wav");
  k.loadSound("jump", "/sounds/jump.wav");
  k.loadSound("ring", "/sounds/Ring.wav");

  k.loadSprite("bg1_1", "/graphics/bg1_1.png");
  k.loadSprite("bg1_3", "/graphics/bg1_3.png");
  k.loadSprite("mossy", "/graphics/Mossy-Platform.png");
  k.loadSprite("diamond", "/graphics/Diamond.png");

  // Animated sprites: pass options after registering sprite
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

  // done
  return;
}
