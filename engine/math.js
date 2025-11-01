export function mat4Identity() {
  return [
    1,0,0,0,
    0,1,0,0,
    0,0,1,0,
    0,0,0,1
  ];
}

export function mat4Multiply(a, b) {
  const out = new Array(16);
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      out[i*4 + j] =
        a[i*4 + 0]*b[0*4 + j] +
        a[i*4 + 1]*b[1*4 + j] +
        a[i*4 + 2]*b[2*4 + j] +
        a[i*4 + 3]*b[3*4 + j];
    }
  }
  return out;
}

export function mat4Translate(tx, ty, tz) {
  const m = mat4Identity();
  m[12] = tx; m[13] = ty; m[14] = tz;
  return m;
}

export function mat4RotateY(angle) {
  const c = Math.cos(angle), s = Math.sin(angle);
  return [
    c, 0, -s, 0,
    0, 1,  0, 0,
    s, 0,  c, 0,
    0, 0,  0, 1
  ];
}

export function mat4Perspective(fovRad, aspect, near, far) {
  const f = 1 / Math.tan(fovRad / 2);
  const nf = 1 / (near - far);
  return [
    f/aspect, 0, 0, 0,
    0, f, 0, 0,
    0, 0, (far + near)*nf, -1,
    0, 0, (2*far*near)*nf, 0
  ];
}

export function mat4LookAt(eye, target, up) {
  const fx = target[0] - eye[0];
  const fy = target[1] - eye[1];
  const fz = target[2] - eye[2];
  const fl = Math.hypot(fx, fy, fz);
  const f0 = fx/fl, f1 = fy/fl, f2 = fz/fl;

  const sx = f1*up[2] - f2*up[1];
  const sy = f2*up[0] - f0*up[2];
  const sz = f0*up[1] - f1*up[0];
  const sl = Math.hypot(sx, sy, sz);
  const s0 = sx/sl, s1 = sy/sl, s2 = sz/sl;

  const u0 = s1*f2 - s2*f1;
  const u1 = s2*f0 - s0*f2;
  const u2 = s0*f1 - s1*f0;

  return [
    s0, u0, -f0, 0,
    s1, u1, -f1, 0,
    s2, u2, -f2, 0,
    -(s0*eye[0] + s1*eye[1] + s2*eye[2]),
    -(u0*eye[0] + u1*eye[1] + u2*eye[2]),
    f0*eye[0] + f1*eye[1] + f2*eye[2],
    1
  ];
}
