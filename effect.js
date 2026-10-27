(() => {
  // Tune particle colors, counts, sizes, motion, and lifetimes in this single configuration object.
  const CONFIG = {
    motionQuery: '(prefers-reduced-motion: reduce)',
    minParticles: 200,
    maxParticles: 350,
    particlesAtReferenceSize: 260,
    referenceArea: 1280 * 720,
    maxPixelRatio: 1.5,
    maxFrameDelta: 0.05,
    smoke: {
      share: 0.45,
      minSize: 100,
      maxSize: 300,
      minSpeed: 77,
      maxSpeed: 161,
      minLife: 6,
      maxLife: 10,
      minHorizontalSpeed: -16,
      maxHorizontalSpeed: 16,
      minWobbleSpeed: 0.5,
      maxWobbleSpeed: 1.8,
      minWobbleAmount: 8,
      maxWobbleAmount: 30,
      minRotation: -0.2,
      maxRotation: 0.2,
      minRotationSpeed: -0.12,
      maxRotationSpeed: 0.12,
      fadeIn: 0.8,
      fadeOut: 1.6,
      alpha: 0.58,
      scaleGrowth: 0.9,
      colors: [0xff1493, 0xc01cc4, 0x6a0dad, 0x2a0545]
    },
    flame: {
      share: 0.4,
      clusterCount: 14,
      clusterSpread: 42,
      minWidth: 16,
      maxWidth: 42,
      minHeight: 150,
      maxHeight: 320,
      minSpeed: 130,
      maxSpeed: 260,
      minLife: 1.6,
      maxLife: 3,
      topRatio: 0.18,
      minHorizontalSpeed: -16,
      maxHorizontalSpeed: 16,
      minWobbleSpeed: 0.5,
      maxWobbleSpeed: 1.8,
      minWobbleAmount: 2,
      maxWobbleAmount: 14,
      minRotation: -0.2,
      maxRotation: 0.2,
      minRotationSpeed: -0.35,
      maxRotationSpeed: 0.35,
      minFlicker: 0.72,
      maxFlicker: 1.12,
      fadeIn: 0.12,
      fadeOut: 0.42,
      alpha: 0.96,
      scaleShrink: 0.32,
      colors: [0xf8edff, 0xd8b4fe, 0xb388eb, 0x6a0dad]
    },
    ember: {
      minSize: 1.5,
      maxSize: 4,
      minSpeed: 45,
      maxSpeed: 105,
      minLife: 1.5,
      maxLife: 4,
      minHorizontalSpeed: -16,
      maxHorizontalSpeed: 16,
      minWobbleSpeed: 0.5,
      maxWobbleSpeed: 1.8,
      minWobbleAmount: 2,
      maxWobbleAmount: 14,
      minRotation: -0.2,
      maxRotation: 0.2,
      minRotationSpeed: -0.35,
      maxRotationSpeed: 0.35,
      fadeIn: 0.1,
      fadeOut: 0.5,
      alpha: 0.82,
      colors: [0xf8edff, 0xd8b4fe, 0xb388eb]
    },
    texture: {
      smokeSize: 256,
      flameWidth: 100,
      flameHeight: 220,
      emberSize: 32
    }
  };

  const layer = document.getElementById('auth-effect-layer');
  if (!layer) return;

  const reducedMotion = window.matchMedia(CONFIG.motionQuery);
  const particlePool = [];
  let app = null;
  let particleLayer = null;
  let canvas = null;
  let context = null;
  let frameId = 0;
  let lastFrameTime = 0;
  let width = 0;
  let height = 0;
  let pixelRatio = 1;
  let textures = null;
  let glowGradient = null;
  let paused = document.hidden;

  function randomBetween(min, max) {
    return min + Math.random() * (max - min);
  }

  function mixColor(start, end, amount) {
    const red = Math.round(((start >> 16) & 255) * (1 - amount) + ((end >> 16) & 255) * amount);
    const green = Math.round(((start >> 8) & 255) * (1 - amount) + ((end >> 8) & 255) * amount);
    const blue = Math.round((start & 255) * (1 - amount) + (end & 255) * amount);
    return (red << 16) | (green << 8) | blue;
  }

  function colorAt(stops, progress) {
    const scaled = Math.min(0.9999, Math.max(0, progress)) * (stops.length - 1);
    const index = Math.floor(scaled);
    return mixColor(stops[index], stops[index + 1], scaled - index);
  }

  function createTextures() {
    const smokeSize = CONFIG.texture.smokeSize;
    const smokeCanvas = document.createElement('canvas');
    smokeCanvas.width = smokeSize;
    smokeCanvas.height = smokeSize;
    const smokeContext = smokeCanvas.getContext('2d');
    const smokePuffs = [
      [0.42, 0.52, 0.48, 0.72],
      [0.68, 0.42, 0.28, 0.52],
      [0.24, 0.39, 0.24, 0.46]
    ];
    for (const [centerX, centerY, radius, opacity] of smokePuffs) {
      const smokeGradient = smokeContext.createRadialGradient(
        centerX * smokeSize,
        centerY * smokeSize,
        4,
        centerX * smokeSize,
        centerY * smokeSize,
        radius * smokeSize
      );
      smokeGradient.addColorStop(0, `rgba(255,255,255,${opacity})`);
      smokeGradient.addColorStop(0.58, `rgba(255,255,255,${opacity * 0.48})`);
      smokeGradient.addColorStop(1, 'rgba(255,255,255,0)');
      smokeContext.fillStyle = smokeGradient;
      smokeContext.fillRect(0, 0, smokeSize, smokeSize);
    }

    const flameCanvas = document.createElement('canvas');
    flameCanvas.width = CONFIG.texture.flameWidth;
    flameCanvas.height = CONFIG.texture.flameHeight;
    const flameContext = flameCanvas.getContext('2d');
    const flameGradient = flameContext.createLinearGradient(0, CONFIG.texture.flameHeight, 0, 0);
    flameGradient.addColorStop(0, 'rgba(255,255,255,0.96)');
    flameGradient.addColorStop(0.2, 'rgba(248,237,255,0.9)');
    flameGradient.addColorStop(0.58, 'rgba(216,180,254,0.65)');
    flameGradient.addColorStop(1, 'rgba(179,136,235,0)');
    flameContext.beginPath();
    flameContext.moveTo(50, 220);
    flameContext.bezierCurveTo(18, 188, 35, 155, 29, 128);
    flameContext.bezierCurveTo(22, 94, 48, 72, 43, 42);
    flameContext.bezierCurveTo(58, 60, 53, 78, 70, 96);
    flameContext.bezierCurveTo(97, 126, 74, 153, 82, 177);
    flameContext.bezierCurveTo(88, 197, 67, 213, 50, 220);
    flameContext.closePath();
    flameContext.fillStyle = flameGradient;
    flameContext.fill();

    const emberCanvas = document.createElement('canvas');
    emberCanvas.width = CONFIG.texture.emberSize;
    emberCanvas.height = CONFIG.texture.emberSize;
    const emberContext = emberCanvas.getContext('2d');
    const emberGradient = emberContext.createRadialGradient(
      CONFIG.texture.emberSize / 2,
      CONFIG.texture.emberSize / 2,
      0,
      CONFIG.texture.emberSize / 2,
      CONFIG.texture.emberSize / 2,
      CONFIG.texture.emberSize / 2
    );
    emberGradient.addColorStop(0, 'rgba(255,255,255,1)');
    emberGradient.addColorStop(0.25, 'rgba(216,180,254,0.85)');
    emberGradient.addColorStop(1, 'rgba(179,136,235,0)');
    emberContext.fillStyle = emberGradient;
    emberContext.fillRect(0, 0, CONFIG.texture.emberSize, CONFIG.texture.emberSize);

    function tintTexture(source, color) {
      const tinted = document.createElement('canvas');
      tinted.width = source.width;
      tinted.height = source.height;
      const tintContext = tinted.getContext('2d');
      tintContext.drawImage(source, 0, 0);
      tintContext.globalCompositeOperation = 'source-in';
      tintContext.fillStyle = `#${color.toString(16).padStart(6, '0')}`;
      tintContext.fillRect(0, 0, tinted.width, tinted.height);
      return tinted;
    }

    return {
      smoke: smokeCanvas,
      flame: flameCanvas,
      ember: emberCanvas,
      canvasSmoke: CONFIG.smoke.colors.map((color) => tintTexture(smokeCanvas, color)),
      canvasFlame: CONFIG.flame.colors.map((color) => tintTexture(flameCanvas, color)),
      canvasEmber: CONFIG.ember.colors.map((color) => tintTexture(emberCanvas, color))
    };
  }

  function getParticleCount() {
    const areaScale = (window.innerWidth * window.innerHeight) / CONFIG.referenceArea;
    return Math.max(CONFIG.minParticles, Math.min(CONFIG.maxParticles, Math.round(CONFIG.particlesAtReferenceSize * areaScale)));
  }

  function setParticleAppearance(particle, progress, flicker) {
    const sprite = particle.sprite;
    if (!sprite) return;
    const settings = particle.type === 0 ? CONFIG.smoke : particle.type === 1 ? CONFIG.flame : CONFIG.ember;
    const envelopeIn = Math.min(1, particle.age / settings.fadeIn);
    const envelopeOut = Math.min(1, (particle.life - particle.age) / settings.fadeOut);
    const alpha = Math.max(0, Math.min(envelopeIn, envelopeOut));
    const growth = particle.type === 0 ? 1 + progress * CONFIG.smoke.scaleGrowth : 1 - progress * CONFIG.flame.scaleShrink;

    if (particle.type === 0) {
      sprite.alpha = alpha * CONFIG.smoke.alpha;
      sprite.tint = colorAt(CONFIG.smoke.colors, progress);
      sprite.scale.set((particle.size / CONFIG.texture.smokeSize) * growth, (particle.size / CONFIG.texture.smokeSize) * growth * 1.25);
    } else if (particle.type === 1) {
      sprite.alpha = alpha * flicker * CONFIG.flame.alpha;
      sprite.tint = colorAt(CONFIG.flame.colors, progress);
      sprite.scale.set((particle.size / CONFIG.texture.flameWidth) * flicker, (particle.height / CONFIG.texture.flameHeight) * growth);
    } else {
      sprite.alpha = alpha * CONFIG.ember.alpha;
      sprite.tint = colorAt(CONFIG.ember.colors, progress);
      sprite.scale.set(particle.size / CONFIG.texture.emberSize);
    }
  }

  function resetParticle(particle, initial) {
    const type = particle.type;
    const settings = type === 0 ? CONFIG.smoke : type === 1 ? CONFIG.flame : CONFIG.ember;
    particle.life = randomBetween(settings.minLife, settings.maxLife);
    particle.age = initial ? randomBetween(0, particle.life * 0.9) : 0;
    if (type === 1) {
      particle.lane = Math.floor(Math.random() * CONFIG.flame.clusterCount);
      const laneCenter = (particle.lane + 0.5) * width / CONFIG.flame.clusterCount;
      particle.x = laneCenter + randomBetween(-CONFIG.flame.clusterSpread, CONFIG.flame.clusterSpread);
    } else {
      particle.x = randomBetween(-12, width + 12);
    }
    particle.y = height + randomBetween(0, 36);
    particle.vx = randomBetween(settings.minHorizontalSpeed, settings.maxHorizontalSpeed);
    particle.vy = -randomBetween(settings.minSpeed, settings.maxSpeed);
    if (initial) particle.y = height + particle.vy * particle.age;
    particle.size = type === 1
      ? randomBetween(settings.minWidth, settings.maxWidth)
      : randomBetween(settings.minSize, settings.maxSize);
    particle.height = type === 1 ? randomBetween(settings.minHeight, settings.maxHeight) : particle.size;
    particle.wobble = randomBetween(0, Math.PI * 2);
    particle.wobbleSpeed = randomBetween(settings.minWobbleSpeed, settings.maxWobbleSpeed);
    particle.wobbleAmount = randomBetween(settings.minWobbleAmount, settings.maxWobbleAmount);
    particle.rotation = randomBetween(settings.minRotation, settings.maxRotation);
    particle.rotationSpeed = randomBetween(settings.minRotationSpeed, settings.maxRotationSpeed);
    if (particle.sprite) {
      particle.sprite.x = particle.x;
      particle.sprite.y = particle.y;
      particle.sprite.rotation = particle.rotation;
    }
    setParticleAppearance(
      particle,
      Math.min(1, particle.age / particle.life),
      type === 1 ? randomBetween(CONFIG.flame.minFlicker, CONFIG.flame.maxFlicker) : 1
    );
  }

  function updateParticle(particle, delta) {
    particle.age += delta;
    const flameTop = height * CONFIG.flame.topRatio;
    if (particle.age >= particle.life
      || (particle.type === 1 && particle.y < flameTop)
      || (particle.type !== 1 && particle.y < -particle.height - 280)) {
      resetParticle(particle, false);
    }

    const progress = Math.min(1, particle.age / particle.life);
    particle.wobble += particle.wobbleSpeed * delta;
    particle.x += (particle.vx + Math.sin(particle.wobble) * particle.wobbleAmount) * delta;
    particle.y += particle.vy * delta;
    particle.rotation += particle.rotationSpeed * delta;
    if (particle.sprite) {
      particle.sprite.x = particle.x;
      particle.sprite.y = particle.y;
      particle.sprite.rotation = particle.rotation;
    }
    setParticleAppearance(
      particle,
      progress,
      particle.type === 1 ? randomBetween(CONFIG.flame.minFlicker, CONFIG.flame.maxFlicker) : 1
    );
  }

  function createParticlePool(usePixi) {
    particlePool.length = 0;
    if (usePixi) particleLayer.removeChildren();
    const total = getParticleCount();
    const flameCount = Math.round(total * CONFIG.flame.share);
    const smokeCount = Math.round(total * CONFIG.smoke.share);
    const emberCount = total - flameCount - smokeCount;
    const pixiTextures = usePixi
      ? {
          smoke: window.PIXI.Texture.from(textures.smoke),
          flame: window.PIXI.Texture.from(textures.flame),
          ember: window.PIXI.Texture.from(textures.ember)
        }
      : null;

    for (let index = 0; index < total; index += 1) {
      const type = index < smokeCount ? 0 : index < smokeCount + flameCount ? 1 : 2;
      const sprite = usePixi
        ? new window.PIXI.Sprite(type === 0 ? pixiTextures.smoke : type === 1 ? pixiTextures.flame : pixiTextures.ember)
        : null;

      if (sprite) {
        sprite.anchor.set(0.5, type === 1 ? 1 : 0.5);
        sprite.blendMode = type === 0 ? window.PIXI.BLEND_MODES.SCREEN : window.PIXI.BLEND_MODES.ADD;
        particleLayer.addChild(sprite);
      }

      const particle = {
        type,
        sprite,
        lane: 0,
        age: 0,
        life: 1,
        x: 0,
        y: 0,
        vx: 0,
        vy: 0,
        size: 0,
        height: 0,
        wobble: 0,
        wobbleSpeed: 0,
        wobbleAmount: 0,
        rotation: 0,
        rotationSpeed: 0
      };
      particlePool.push(particle);
      resetParticle(particle, true);
    }
  }

  function renderCanvas() {
    context.clearRect(0, 0, width, height);
    context.globalCompositeOperation = 'screen';
    context.globalAlpha = 1;
    context.fillStyle = glowGradient;
    context.fillRect(0, height * 0.73, width, height * 0.27);
    for (let index = 0; index < particlePool.length; index += 1) {
      const particle = particlePool[index];
      const progress = Math.min(1, particle.age / particle.life);
      const flicker = particle.type === 1 ? randomBetween(CONFIG.flame.minFlicker, CONFIG.flame.maxFlicker) : 1;
      const settings = particle.type === 0 ? CONFIG.smoke : particle.type === 1 ? CONFIG.flame : CONFIG.ember;
      const envelopeIn = Math.min(1, particle.age / settings.fadeIn);
      const envelopeOut = Math.min(1, (particle.life - particle.age) / settings.fadeOut);
      const alpha = Math.max(0, Math.min(envelopeIn, envelopeOut));
      const growth = particle.type === 0 ? 1 + progress * CONFIG.smoke.scaleGrowth : 1 - progress * CONFIG.flame.scaleShrink;
      const particleWidth = particle.type === 0 ? particle.size * growth : particle.type === 1 ? particle.size * flicker : particle.size;
      const particleHeight = particle.type === 0 ? particle.size * growth * 1.25 : particle.type === 1 ? particle.height * growth : particle.size;
      const sourceSet = particle.type === 0 ? textures.canvasSmoke : particle.type === 1 ? textures.canvasFlame : textures.canvasEmber;
      const sourceIndex = Math.min(sourceSet.length - 1, Math.floor(progress * sourceSet.length));

      context.globalAlpha = alpha * settings.alpha * (particle.type === 1 ? flicker : 1);
      context.globalCompositeOperation = particle.type === 0 ? 'screen' : 'lighter';
      context.save();
      context.translate(particle.x, particle.y);
      context.rotate(particle.rotation);
      const verticalOffset = particle.type === 1 ? -particleHeight : -particleHeight / 2;
      context.drawImage(sourceSet[sourceIndex], -particleWidth / 2, verticalOffset, particleWidth, particleHeight);
      context.restore();
    }
    context.globalAlpha = 1;
    context.globalCompositeOperation = 'source-over';
  }

  function startFallback() {
    layer.replaceChildren();
    canvas = document.createElement('canvas');
    canvas.setAttribute('aria-hidden', 'true');
    layer.appendChild(canvas);
    context = canvas.getContext('2d', { alpha: true });
    if (!context) {
      console.error('The login effect canvas could not be initialized.');
      return;
    }
    resizeCanvas();
    createParticlePool(false);
    lastFrameTime = 0;
    if (!paused) frameId = window.requestAnimationFrame(fallbackFrame);
  }

  function fallbackFrame(timestamp) {
    if (paused || reducedMotion.matches) return;
    const delta = lastFrameTime ? Math.min((timestamp - lastFrameTime) / 1000, CONFIG.maxFrameDelta) : 0;
    lastFrameTime = timestamp;
    for (let index = 0; index < particlePool.length; index += 1) {
      updateParticle(particlePool[index], delta);
    }
    renderCanvas();
    frameId = window.requestAnimationFrame(fallbackFrame);
  }

  function resizeCanvas() {
    width = window.innerWidth;
    height = window.innerHeight;
    pixelRatio = Math.min(window.devicePixelRatio || 1, CONFIG.maxPixelRatio);
    if (app) {
      app.renderer.resolution = pixelRatio;
      app.renderer.resize(width, height);
      return;
    }
    if (canvas && context) {
      canvas.width = Math.round(width * pixelRatio);
      canvas.height = Math.round(height * pixelRatio);
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      glowGradient = context.createLinearGradient(0, height, 0, height * 0.73);
      glowGradient.addColorStop(0, 'rgba(106,13,173,0.56)');
      glowGradient.addColorStop(0.35, 'rgba(192,28,196,0.32)');
      glowGradient.addColorStop(1, 'rgba(42,5,69,0)');
    }
  }

  function pixiFrame(ticker) {
    if (paused || reducedMotion.matches) return;
    const delta = Math.min(ticker.deltaMS / 1000, CONFIG.maxFrameDelta);
    for (let index = 0; index < particlePool.length; index += 1) {
      updateParticle(particlePool[index], delta);
    }
  }

  function destroyEffect() {
    if (frameId) {
      window.cancelAnimationFrame(frameId);
      frameId = 0;
    }
    if (app) {
      app.ticker.stop();
      app.ticker.remove(pixiFrame);
      app.destroy(true, { children: true, texture: false, baseTexture: false });
      app = null;
    }
    particleLayer = null;
    particlePool.length = 0;
    canvas = null;
    context = null;
  }

  function startEffect() {
    if (reducedMotion.matches) {
      destroyEffect();
      layer.replaceChildren();
      layer.classList.add('is-static');
      return;
    }

    layer.classList.remove('is-static');
    textures = createTextures();
    width = window.innerWidth;
    height = window.innerHeight;
    pixelRatio = Math.min(window.devicePixelRatio || 1, CONFIG.maxPixelRatio);

    if (window.PIXI && window.PIXI.Application && window.PIXI.ParticleContainer) {
      try {
        canvas = document.createElement('canvas');
        canvas.setAttribute('aria-hidden', 'true');
        layer.replaceChildren(canvas);
        app = new window.PIXI.Application({
          view: canvas,
          width,
          height,
          resolution: pixelRatio,
          autoDensity: true,
          backgroundAlpha: 0,
          antialias: false,
          autoStart: false,
          sharedTicker: false,
          powerPreference: 'low-power'
        });
        particleLayer = new window.PIXI.ParticleContainer(CONFIG.maxParticles, {
          position: true,
          rotation: true,
          vertices: true,
          alpha: true,
          tint: true
        }, 4, false);
        app.stage.addChild(particleLayer);
        createParticlePool(true);
        app.ticker.add(pixiFrame);
        if (!paused) app.ticker.start();
        return;
      } catch (error) {
        console.warn('Pixi particle rendering could not start; using the canvas fallback.', error);
        destroyEffect();
      }
    }

    startFallback();
  }

  document.addEventListener('visibilitychange', () => {
    paused = document.hidden;
    if (app) {
      if (paused) app.ticker.stop();
      else if (!reducedMotion.matches) app.ticker.start();
    } else if (paused) {
      if (frameId) window.cancelAnimationFrame(frameId);
      frameId = 0;
    } else if (!reducedMotion.matches && canvas && context && !frameId) {
      lastFrameTime = 0;
      frameId = window.requestAnimationFrame(fallbackFrame);
    }
  });

  window.addEventListener('resize', () => {
    if (reducedMotion.matches) return;
    resizeCanvas();
    if (particlePool.length) createParticlePool(Boolean(app));
  }, { passive: true });

  reducedMotion.addEventListener('change', startEffect);
  startEffect();
})();
