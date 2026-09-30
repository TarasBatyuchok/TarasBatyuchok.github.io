// Edit these three stops to recolor the mountain.
const TERRAIN_COLORS = ['#b8ff00', '#77ff3d', '#00dbc0'];

function smoothStep(start, end, value) {
  const amount = Math.max(0, Math.min(1, (value - start) / (end - start)));
  return amount * amount * (3 - 2 * amount);
}

function peak(x, z, centerX, centerZ, radiusX, radiusZ, power = 1) {
  const distance = Math.hypot((x - centerX) / radiusX, (z - centerZ) / radiusZ);
  return Math.pow(Math.max(0, 1 - distance), power);
}

function terrainHeight(x, z, time) {
  const ridge =
    1.25 * peak(x, z, -.24, .12, .64, .79, .85) +
    1.32 * peak(x, z, .23, .22, .58, .75, .95) +
    .72 * peak(x, z, .58, .06, .31, .6, .85);
  const envelope =
    smoothStep(0, .23, z) *
    smoothStep(1.03, .78, z) *
    smoothStep(1.1, .67, Math.abs(x));
  const sharp = Math.pow(
    Math.max(0, Math.sin(x * 14.4 + Math.sin(z * 15.6) * .82) +
      .28 * Math.sin(x * 31.2 - z * 9.6)),
    4,
  );
  const peaks = .42 * sharp * peak(x, z, -.09, .32, .57, .63, .7);
  const rolling =
    .16 * Math.sin(x * 13 + z * 9 + .32 * Math.sin(z * 17)) +
    .105 * Math.sin(x * 27 - z * 19) +
    .065 * Math.sin(x * 48 + z * 23);
  const moving =
    .095 * Math.sin(x * 10 + z * 13 + time * .48) +
    .07 * Math.sin(x * 23 - z * 14 - time * .31);

  return Math.max(0, envelope * (ridge * (.72 + rolling + moving) + peaks));
}

export function createTerrain(canvas) {
  const context = canvas.getContext('2d');
  const compact = matchMedia('(max-width: 600px)').matches;
  const columns = compact ? 105 : 145;
  const rows = compact ? 52 : 70;
  const points = Array.from(
    { length: rows + 1 },
    () => new Float32Array((columns + 1) * 2),
  );
  const pointer = {
    x: 0, z: .5, targetX: 0, targetZ: .5,
    strength: 0, targetStrength: 0,
  };
  let width = 0;
  let height = 0;

  function resize() {
    const rect = canvas.getBoundingClientRect();
    const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
    width = Math.max(1, rect.width);
    height = Math.max(1, rect.height);
    canvas.width = Math.round(width * pixelRatio);
    canvas.height = Math.round(height * pixelRatio);
    context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
  }

  function draw(time) {
    pointer.x += (pointer.targetX - pointer.x) * .055;
    pointer.z += (pointer.targetZ - pointer.z) * .055;
    pointer.strength += (pointer.targetStrength - pointer.strength) * .035;
    context.clearRect(0, 0, width, height);

    const gradient = context.createLinearGradient(0, 0, width, 0);
    TERRAIN_COLORS.forEach((color, index) => {
      gradient.addColorStop(index / (TERRAIN_COLORS.length - 1), color);
    });

    const mobile = width <= 600;
    const scale = Math.min(width / 1600, height / 650);
    const spread = mobile ? width * .78 : Math.max(width * .51, 760 * scale);
    const heightScale = mobile ? Math.min(height * .35, width * .42) : height * .35;
    const floor = height * .94;

    for (let row = 0; row <= rows; row++) {
      const z = row / rows;
      const line = points[row];
      for (let column = 0; column <= columns; column++) {
        const x = column / columns * 2 - 1;
        const dx = (x - pointer.x) * 1.2;
        const influence = Math.exp(-(dx * dx + (z - pointer.z) ** 2) / .032);
        const elevation = terrainHeight(x, z, time) +
          pointer.strength * influence * .16;
        line[column * 2] = width * .5 + x * spread;
        line[column * 2 + 1] = floor - z * height * .012 - elevation * heightScale;
      }
    }

    context.strokeStyle = gradient;
    context.lineWidth = mobile ? .65 : Math.max(.42, Math.min(1, width / 1500));
    context.lineJoin = 'round';

    for (let row = rows; row >= 0; row--) {
      const line = points[row];
      context.globalAlpha = .11 + .62 * Math.pow(row / rows, .9);
      context.beginPath();
      context.moveTo(line[0], line[1]);
      for (let column = 1; column <= columns; column++) {
        context.lineTo(line[column * 2], line[column * 2 + 1]);
      }
      context.stroke();
    }

    for (let column = 0; column <= columns; column++) {
      context.globalAlpha = .19 + .36 * (1 - Math.abs(column / columns * 2 - 1));
      context.beginPath();
      for (let row = 0; row <= rows; row++) {
        const line = points[row];
        const x = line[column * 2];
        const y = line[column * 2 + 1];
        if (row === 0) context.moveTo(x, y);
        else context.lineTo(x, y);
      }
      context.stroke();
    }
    context.globalAlpha = 1;
  }

  function updatePointer(event) {
    const rect = canvas.getBoundingClientRect();
    pointer.targetX = Math.max(-1, Math.min(1,
      (event.clientX - rect.left) / rect.width * 2 - 1,
    ));
    pointer.targetZ = Math.max(0, Math.min(1,
      1 - (event.clientY - rect.top) / rect.height,
    ));
    pointer.targetStrength = 1;
  }

  canvas.addEventListener('pointerdown', updatePointer);
  canvas.addEventListener('pointermove', event => {
    if (event.pointerType === 'mouse' || event.buttons) updatePointer(event);
  });
  canvas.addEventListener('pointerup', event => {
    if (event.pointerType !== 'mouse') pointer.targetStrength = 0;
  });
  canvas.addEventListener('pointercancel', () => { pointer.targetStrength = 0; });
  canvas.addEventListener('pointerleave', () => { pointer.targetStrength = 0; });

  return { resize, draw };
}
