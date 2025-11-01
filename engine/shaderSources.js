const vertexShaderSrc = `
attribute vec3 a_position;
uniform mat4 u_model;
uniform mat4 u_view;
uniform mat4 u_projection;
void main() {
  gl_Position = u_projection * u_view * u_model * vec4(a_position, 1.0);
}
`;

const fragmentShaderSrc = `
precision mediump float;
void main() {
  gl_FragColor = vec4(0.9, 0.1, 0.4, 1.0);
}
`;

export function createProgram(gl) {
  function compile(src, type) {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, src);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      console.error(gl.getShaderInfoLog(shader));
      throw new Error('Shader compile failed');
    }
    return shader;
  }

  const vs = compile(vertexShaderSrc, gl.VERTEX_SHADER);
  const fs = compile(fragmentShaderSrc, gl.FRAGMENT_SHADER);
  const program = gl.createProgram();
  gl.attachShader(program, vs);
  gl.attachShader(program, fs);
  gl.linkProgram(program);

  if (!gl.getProgramParameter(program, gl.LINK_STATUS))
    throw new Error(gl.getProgramInfoLog(program));

  return program;
}
