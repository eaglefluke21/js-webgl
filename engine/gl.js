export function initGL(canvas) {
  const gl = canvas.getContext('webgl');
  if (!gl) throw new Error('WebGL not supported');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  gl.viewport(0, 0, canvas.width, canvas.height);
  return gl;
}
