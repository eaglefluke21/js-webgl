export function renderScene(gl, loc, model, camera, vertexCount,color) {
  gl.uniformMatrix4fv(loc.u_model, false, new Float32Array(model));
  gl.uniformMatrix4fv(loc.u_view, false, new Float32Array(camera.view));
  gl.uniformMatrix4fv(loc.u_projection, false, new Float32Array(camera.projection));
  gl.uniform4fv(loc.u_color,color);
  gl.drawArrays(gl.TRIANGLES, 0, vertexCount);
}
