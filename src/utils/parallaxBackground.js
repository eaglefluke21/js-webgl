// src/utils/parallaxBackground.js
import k from "../KaplayCtx.js";

/**
 * Helper: returns the visual width of an entity (taking scale into account)
 * Some engines expose .width or .size, but to be robust we check multiple props.
 */
function getEntityWidth(ent) {
  // entity.width may be width in pixels; if it's a function call, try ent.width()
  const rawW =
    typeof ent.width === "function" ? ent.width() : (ent.width ?? ent.size?.x ?? 0);
  // scale may be scalar or vector; attempt to extract
  let scaleX = 1;
  if (ent.scale == null) {
    scaleX = 1;
  } else if (typeof ent.scale === "number") {
    scaleX = ent.scale;
  } else if (ent.scale.x != null) {
    scaleX = ent.scale.x;
  } else {
    scaleX = 1;
  }
  return rawW * scaleX || rawW || 0;
}

export default function createParallaxBackground() {
  // add base background layers as entities
  const bgPieces = [
    k.add([k.sprite("bg1_1"), k.pos(0, 0), k.scale(2.5), k.z(-10)]),
    // second copy; we'll position it next to first using computed width
    k.add([k.sprite("bg1_1"), k.pos(0, 0), k.scale(2.5), k.z(-10)]),
    // mid layer (different sprite)
    k.add([k.sprite("bg1_3"), k.pos(0, 0), k.scale(1.3), k.z(-5)]),
  ];

  // Position them in a tiled fashion across the screen width
  // Compute widths after a short tick so engine has assigned sizes (defensive)
  k.wait(0, () => {
    // position bgPieces[1] immediately after bgPieces[0]
    const w0 = getEntityWidth(bgPieces[0]) || k.width();
    bgPieces[0].pos.x = 0;
    bgPieces[1].pos.x = w0;
    // position mid layer at 0 for parallax
    bgPieces[2].pos.x = 0;
  });

  // Mossy ground pieces: tile to fill twice the viewport width (safe for looping)
  const mossyPieces = [];
  const mossyProto = { scale: 0.3, z: -3 };

  // Temporarily add one mossy to get width
  const temp = k.add([k.sprite("mossy"), k.pos(0, 0), k.scale(mossyProto.scale), k.opacity(0)]);
  k.wait(0, () => {
    const mossyWidth = getEntityWidth(temp) || 640;
    temp.destroy();

    // compute count to tile across extra width
    const needed = Math.ceil((k.width() * 2) / mossyWidth) + 1;
    for (let i = 0; i < needed; i++) {
      mossyPieces.push(
        k.add([
          k.sprite("mossy"),
          k.pos(i * mossyWidth, k.height() - 15),
          k.scale(mossyProto.scale),
          k.z(-3),
        ])
      );
    }
  });

  // parallax movement speeds (can tweak)
  const bgSpeed = 1920;
  const mossySpeed = 1200;

  k.onUpdate(() => {
    // Move base backgrounds
    bgPieces.forEach((bg, idx) => {
      bg.move(-bgSpeed * k.dt(), 0);
      const w = getEntityWidth(bg) || k.width();
      if (bg.pos.x + w < 0) {
        // put it after the rightmost bg piece
        let rightmost = bgPieces.reduce((m, b) => Math.max(m, b.pos.x + getEntityWidth(b)), -Infinity);
        bg.pos.x = rightmost;
      }
    });

    // Move mossy pieces and wrap
    const totalMossyWidth = mossyPieces.reduce((acc, m) => acc + (getEntityWidth(m) || 0), 0);
    mossyPieces.forEach((mossy) => {
      mossy.move(-mossySpeed * k.dt(), 0);
      const mw = getEntityWidth(mossy) || 0;
      if (mossy.pos.x + mw < 0) {
        // move this piece to the right of the rightmost mossy
        const rightmost = mossyPieces.reduce((r, p) => Math.max(r, p.pos.x + (getEntityWidth(p) || 0)), -Infinity);
        mossy.pos.x = rightmost;
      }
    });
  });
}
