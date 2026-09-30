const GRID_COLOR = 'rgba(97, 150, 132, .13)';

export function createGrid(canvas) {
  const context = canvas.getContext('2d', { alpha: false });
  const hover = {
    x: 0, y: 0, alpha: 0,
    previousX: 0, previousY: 0, previousAlpha: 0,
    active: false, ready: false,
  };
  let width = 0;
  let height = 0;
  let pixelRatio = 1;

  function cellSize() {
    return width <= 600 ? 32 : 48;
  }

  function resize() {
    pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = Math.round(width * pixelRatio);
    canvas.height = Math.round(height * pixelRatio);
    context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
  }

  function drawCell(x, y, alpha, size) {
    if (alpha < .002) return;
    context.save();
    context.globalAlpha = alpha;

    const glow = context.createRadialGradient(
      x + size / 2, y + size / 2, 0,
      x + size / 2, y + size / 2, size * 1.25,
    );
    glow.addColorStop(0, 'rgba(113,255,174,.10)');
    glow.addColorStop(1, 'rgba(113,255,174,0)');
    context.fillStyle = glow;
    context.fillRect(x - size, y - size, size * 3, size * 3);

    context.fillStyle = 'rgba(137,255,158,.075)';
    context.fillRect(x, y, size, size);
    context.strokeStyle = 'rgba(170,255,173,.28)';
    context.lineWidth = 1;
    context.strokeRect(x + .5, y + .5, size - 1, size - 1);
    context.restore();
  }

  function draw() {
    hover.alpha += ((hover.active ? 1 : 0) - hover.alpha) * .075;
    hover.previousAlpha *= .86;

    context.fillStyle = '#000';
    context.fillRect(0, 0, width, height);

    const size = cellSize();
    context.strokeStyle = GRID_COLOR;
    context.lineWidth = 1;
    context.beginPath();
    for (let x = size / 2; x < width; x += size) {
      context.moveTo(x, 0);
      context.lineTo(x, height);
    }
    for (let y = size / 2; y < height; y += size) {
      context.moveTo(0, y);
      context.lineTo(width, y);
    }
    context.stroke();

    drawCell(hover.previousX, hover.previousY, hover.previousAlpha, size);
    drawCell(hover.x, hover.y, hover.alpha, size);
  }

  function updateHover(event) {
    if (event.pointerType !== 'mouse') return;
    const size = cellSize();
    const x = size / 2 + Math.floor((event.clientX - size / 2) / size) * size;
    const y = size / 2 + Math.floor((event.clientY - size / 2) / size) * size;

    if (!hover.ready) {
      hover.x = x;
      hover.y = y;
      hover.ready = true;
    } else if (x !== hover.x || y !== hover.y) {
      hover.previousX = hover.x;
      hover.previousY = hover.y;
      hover.previousAlpha = hover.alpha;
      hover.x = x;
      hover.y = y;
      hover.alpha = 0;
    }
    hover.active = true;
  }

  window.addEventListener('pointermove', updateHover);
  document.addEventListener('mouseout', event => {
    if (!event.relatedTarget) hover.active = false;
  });

  return { resize, draw };
}
