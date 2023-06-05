import * as THREE from 'three';

const getLathePoints = (widht, thickness, radius) => {
  const coords = [[radius, 0], [radius + widht, 0], [radius + widht, thickness], [radius, thickness]];
  const points = coords.map(([a, b]) => new THREE.Vector2(a, b));

  return points;
};

const getLatheDegrees = (degStart, degEnd) => {
  const start = THREE.MathUtils.degToRad(degStart);
  const length = THREE.MathUtils.degToRad(degEnd - degStart);

  return {start, length};
};

export {getLathePoints, getLatheDegrees};
