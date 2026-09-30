function loadImage(url) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error('Не вдалося завантажити хвилю'));
    image.src = url;
  });
}

function drawBridge(bridge, image, time) {
  const { canvas, context } = bridge;
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;
  if (!width || !height) return;
  context.clearRect(0, 0, width, height);

  // Keep the original crop and move its vertical cuts by a few pixels.
  const scale = Math.max(width / image.naturalWidth, height / image.naturalHeight);
  const sourceWidth = width / scale;
  const sourceHeight = height / scale;
  const sourceX = (image.naturalWidth - sourceWidth) / 2;
  const sourceY = (image.naturalHeight - sourceHeight) / 2;
  const sliceWidth = width <= 600 ? 10 : 16;

  for (let x = 0; x < width; x += sliceWidth) {
    const slice = Math.min(sliceWidth, width - x);
    const position = x / width;
    const shift =
      3.5 * Math.sin(position * 9 + time * .63) +
      1.5 * Math.sin(position * 21 - time * .44);
    context.drawImage(
      image,
      sourceX + x / scale, sourceY, slice / scale, sourceHeight,
      x, -5 + shift, slice + .5, height + 10,
    );
  }
}

// Image loading is asynchronous. The rest of the page can animate meanwhile.
export async function createBridges() {
  const canvases = [...document.querySelectorAll('.bridge__canvas')];
  const bridges = canvases.map(canvas => ({
    canvas,
    context: canvas.getContext('2d'),
    visible: false,
  }));
  // Кожна перемичка використовує свою хвилю, але той самий плавний рух зрізів.
  const [firstImage, secondImage, thirdImage, faqImage, contactImage] = await Promise.all([
    loadImage(new URL('../img/wave.webp', import.meta.url)),
    loadImage(new URL('../img/wave-secondary.webp', import.meta.url)),
    loadImage(new URL('../img/wave-third.webp', import.meta.url)),
    loadImage(new URL('../img/wave-faq.webp', import.meta.url)),
    loadImage(new URL('../img/wave-contact.webp', import.meta.url)),
  ]);
  bridges.forEach(bridge => {
    const section = bridge.canvas.parentElement;
    bridge.image = section.classList.contains('bridge--faq') ? faqImage
      : section.classList.contains('bridge--contact') ? contactImage
      : section.classList.contains('bridge--third') ? thirdImage
      : section.classList.contains('bridge--reverse') ? secondImage : firstImage;
  });

  function resize() {
    const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
    bridges.forEach(({ canvas, context }) => {
      canvas.width = Math.round(canvas.clientWidth * pixelRatio);
      canvas.height = Math.round(canvas.clientHeight * pixelRatio);
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    });
    draw(performance.now() / 1000, true);
  }

  function draw(time, all = false) {
    bridges.forEach(bridge => {
      if (all || bridge.visible) drawBridge(bridge, bridge.image, time);
    });
  }

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      const bridge = bridges.find(item => item.canvas === entry.target);
      bridge.visible = entry.isIntersecting;
      bridge.canvas.parentElement.classList.toggle('bridge--visible', bridge.visible);
      if (bridge.visible) drawBridge(bridge, bridge.image, performance.now() / 1000);
    });
  });
  bridges.forEach(bridge => observer.observe(bridge.canvas));
  resize();

  return { resize, draw };
}
