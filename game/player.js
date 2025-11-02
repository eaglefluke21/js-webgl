import { mat4Translate } from '../engine/math.js';

export class Player {
  constructor() {
    this.x = 0;
    this.y = -0.5;
    this.z = 0;
    this.speed = 0.1;
    this.size = 0.2;
  }

  update(input) {
    if (input.left) this.x -= this.speed;
    if (input.right) this.x += this.speed;
    if (input.up) this.y += this.speed;
    if (input.down) this.y -= this.speed;

    // limit side movement
    if (this.x < -1.7) this.x = -1.7;
    if (this.x >  1.7) this.x =  1.7;

    if(this.y < -1.7) this.y = -1.7;
    if(this.y > 1.7) this.y = 1.7;
  }

  getModelMatrix() {
    return mat4Translate(this.x, this.y, this.z);
  }
}
