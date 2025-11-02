import { mat4LookAt, mat4Perspective } from './math.js';

export function createCamera(canvas) {
  const aspect = canvas.width / canvas.height;
  const projection = mat4Perspective(Math.PI /3,aspect, 0.1, 100);
  const view = mat4LookAt([0, 0, 4.5], [0, 0, 4.4], [0, 1, 0]);
  return { view, projection };
}
