import { Obstacle } from './obstacle.js';
import { mat4Translate } from '../engine/math.js';

export class World {
  constructor() {
    this.obstacles = [];
    this.spawnTimer = 0;
    this.spawnRate = 60; // frames
  }

  update() {
    this.spawnTimer++;
    if (this.spawnTimer >= this.spawnRate) {
      this.spawnTimer = 0;
      const x = (Math.random() - 0.5) * 3; // -1.5 to 1.5
      const z = -5;
      this.obstacles.push(new Obstacle(x, z));
    }

    const speed = 0.05;
    for (const obs of this.obstacles) obs.update(speed);

    // remove old
    this.obstacles = this.obstacles.filter(o => !o.isBehindCamera());
  }
}
