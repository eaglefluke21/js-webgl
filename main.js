import { initGL } from './engine/gl.js';
import { createCamera } from './engine/camera.js';
import { createProgram } from './engine/shaderSources.js';
import { cubeVertices } from './engine/mesh.js';
import { renderScene } from './engine/renderer.js';
import { Player } from './game/player.js';
import { World } from './game/world.js';
import { mat4Identity } from './engine/math.js';

const canvas = document.getElementById('game');
const gl = initGL(canvas);
const program = createProgram(gl);
gl.useProgram(program);

const loc = {
  a_position: gl.getAttribLocation(program, 'a_position'),
  u_model: gl.getUniformLocation(program, 'u_model'),
  u_view: gl.getUniformLocation(program, 'u_view'),
  u_projection: gl.getUniformLocation(program, 'u_projection'),
};

// Camera and game objects
const camera = createCamera(canvas);
const player = new Player();
const world = new World();

// Input
const input = { left: false, right: false };
window.addEventListener('keydown', e => {
  if (e.key === 'ArrowLeft' || e.key === 'a') input.left = true;
  if (e.key === 'ArrowRight' || e.key === 'd') input.right = true;
});
window.addEventListener('keyup', e => {
  if (e.key === 'ArrowLeft' || e.key === 'a') input.left = false;
  if (e.key === 'ArrowRight' || e.key === 'd') input.right = false;
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

  gl.clearColor(0.05, 0.05, 0.08, 1);
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  // Render player
  renderScene(gl, loc, player.getModelMatrix(), camera, cubeVertices.length / 3);

  // Render obstacles
  for (const obs of world.obstacles)
    renderScene(gl, loc, obs.getModelMatrix(), camera, cubeVertices.length / 3);

  requestAnimationFrame(loop);
}

loop();
