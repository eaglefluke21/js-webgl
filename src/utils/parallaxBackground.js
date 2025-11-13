import k from "../KaplayCtx";

export default function createParallaxBackground() {
  const bgPieceWidth = 1920;
  const bgPieces = [
    k.add([k.sprite("bg1_1"), k.pos(0, 0), k.scale(2.5), k.z(-10)]),
    k.add([k.sprite("bg1_1"), k.pos(bgPieceWidth, 0), k.scale(2.5), k.z(-10)]),
  ];

  k.onUpdate(() => {
    bgPieces.forEach((bg) => {
      bg.move(-100, 0); // Move background to the left
      if (bg.pos.x + bgPieceWidth * 2 < 0) {
        bg.pos.x += bgPieceWidth * 2; // Reset position to create a loop
      }
    });
  });
}