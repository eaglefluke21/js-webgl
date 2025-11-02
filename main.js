import { initGL } from './engine/gl.js';
import { createCamera } from './engine/camera.js';
import { createProgram } from './engine/shaderSources.js';
import { cubeVertices } from './engine/mesh.js';
import { renderScene } from './engine/renderer.js';
import { Player } from './game/player.js';
import { World } from './game/world.js';

const canvas = document.getElementById('game');
const gl = initGL(canvas);
const program = createProgram(gl);
gl.useProgram(program);

const loc = {
  a_position: gl.getAttribLocation(program, 'a_position'),
  u_model: gl.getUniformLocation(program, 'u_model'),
  u_view: gl.getUniformLocation(program, 'u_view'),
  u_projection: gl.getUniformLocation(program, 'u_projection'),
  u_color: gl.getUniformLocation(program, 'u_color'),
};


// Camera and game objects
const camera = createCamera(canvas);
const player = new Player();
const world = new World();
// console.log('world',world);
// throw new Error('stop');

// Input
const input = { left: false, right: false , up: false, down: false};
window.addEventListener('keydown', e => {
  if (e.key === 'ArrowLeft' || e.key === 'a') input.left = true;
  if (e.key === 'ArrowRight' || e.key === 'd') input.right = true;
  if (e.key === 'ArrowUp' || e.key === 'w') input.up = true;
  if (e.key === 'ArrowDown' || e.key === 's') input.down = true;
});

window.addEventListener('keyup', e => {
  if (e.key === 'ArrowLeft' || e.key === 'a') input.left = false;
  if (e.key === 'ArrowRight' || e.key === 'd') input.right = false;
  if (e.key === 'ArrowUp' || e.key === 'w') input.up = false;
  if (e.key === 'ArrowDown' || e.key === 's') input.down = false;
});

// Buffer
const buffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(cubeVertices), gl.STATIC_DRAW);
gl.enableVertexAttribArray(loc.a_position);
gl.vertexAttribPointer(loc.a_position, 3, gl.FLOAT, false, 0, 0);

gl.enable(gl.DEPTH_TEST);

function loop() {
  player.update(input);
  world.update();

  gl.clearColor(160/255, 160/255, 160/255, 1);
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  // Render player
  renderScene(gl, loc, player.getModelMatrix(), camera, cubeVertices.length / 3 , [0.5,0.3,0.8,1.0]);

  // Render obstacles
  for (const obs of world.obstacles)
    renderScene(gl, loc, obs.getModelMatrix(), camera, cubeVertices.length / 3,[0.3,0.5,0.6,1.0]);

  requestAnimationFrame(loop);
}

loop();
