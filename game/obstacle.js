import { mat4Translate } from '../engine/math.js';

export class Obstacle {
  constructor(x, z) {
    this.x = x;
    this.y = -0.5;
    this.z = z;
    this.size = 0.2;
  }

  update(speed) {
    this.z += speed; // move toward camera
  }

  getModelMatrix() {
    return mat4Translate(this.x, this.y, this.z);
  }

  isBehindCamera() {
    return this.z > 1.5; // if past camera, remove
  }
}
