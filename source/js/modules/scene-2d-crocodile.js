import Animation from './animation.js';
import Scene2D from './scene-2d.js';
import _ from './utils.js';

const IMAGES_URLS = Object.freeze({
  key: `img/crocodile/key.png`,
  flamingo: `img/crocodile/flamingo.png`,
  leaf: `img/crocodile/leaf.png`,
  saturn: `img/crocodile/saturn.png`,
  snowflake: `img/crocodile/snowflake.png`,
  watermelon: `img/crocodile/watermelon.png`,
  crocodile: `img/crocodile/crocodile.png`,
  drop: `img/crocodile/drop.png`
});

const OBJECTS = Object.freeze({
  crocodile: {
    imageId: `crocodile`,
    x: 49,
    y: 64,
    size: 95,
    opacity: 1,
    transforms: {
      translateX: 46,
      translateY: -22
    }
  },
  key: {
    imageId: `key`,
    x: 50 + 2,
    y: 57 + 4,
    size: 23,
    opacity: 0,
    transforms: {
      scaleX: 0.8,
      scaleY: 0.8
    }
  },
  watermelon: {
    imageId: `watermelon`,
    x: 7,
    y: 75,
    size: 0,
    opacity: 0,
    transforms: {
      translateX: 40,
      translateY: -15,
    }
  },
  flamingo: {
    imageId: `flamingo`,
    x: 22,
    y: 50,
    size: 0,
    opacity: 0,
    transforms: {
      translateX: 22,
      translateY: 3
    }
  },
  leaf: {
    imageId: `leaf`,
    x: 90,
    y: 42,
    size: 0,
    opacity: 0,
    transforms: {
      translateX: -35,
      translateY: 10
    }
  },
  snowflake: {
    imageId: `snowflake`,
    x: 75,
    y: 62,
    size: 0,
    opacity: 0,
    transforms: {
      translateX: -25,
      translateX: -7
    }
  },
  saturn: {
    imageId: `saturn`,
    x: 90,
    y: 82,
    size: 0,
    opacity: 0,
    transforms: {
      translateX: -37,
      translateY: -23,
    }
  },
  drop: {
    imageId: `drop`,
    x: 46,
    y: 64,
    size: 0,
    opacity: 1,
    transforms: {
      translateX: 0
    }
  }
});

export default class Scene2DCrocodile extends Scene2D {
  constructor() {
    const canvas = document.getElementById('crocodileCanvas');

    super({
      canvas,
      objects: OBJECTS,
      imagesUrls: IMAGES_URLS,
    });

    this.startAnimationLoop = this.startAnimationLoop.bind(this);
    this.animationsLoop = [];

    this.afterInit = () => {
      this.objects.crocodile.after = this.actCrocodileAfter.bind(this);
      this.objects.key.after = this.actKeyAfter.bind(this);
    };

    this.initEventListeners();
    this.initObjects(OBJECTS);

    this.start();

    setTimeout(this.startAnimationLoop, 1500);

    this.updateSize();
  }

  startAnimationLoop() {
    this.animationsLoop.forEach((animation) => animation.start());
    setTimeout(this.startAnimationLoop, 1100)
  }

  initEventListeners() {
    window.addEventListener(`resize`, this.updateSize.bind(this));
  }

  initAnimations() {
    this.animations.push(new Animation({
      func: () => {
        this.drawScene();
      },
      duration: `infinite`,
      fps: 60
    }));

    this.initKeyAnimations();
    this.initCrocodileAnimations();
    this.initWatermelonAnimations();
    this.initFlamingoAnimations();
    this.initLeafAnimations();
    this.initSnowflakeAnimations();
    this.initSaturnAnimations();
    this.initDropAnimations();
  }

  initKeyAnimations() {
    this.animations.push(new Animation({
      func: (progress) => {
        const progressReversed = 1 - progress;

        this.objects.key.x = 50 + 2 * progressReversed;
        this.objects.key.y = 57 + 4 * progressReversed;
        this.objects.key.transforms.scaleX = 0.8 + 0.2 * progress;
        this.objects.key.transforms.scaleY = 0.8 + 0.2 * progress;
        this.objects.key.opacity = progress;
      },
      duration: 200,
      delay: 166,
      easing: _.easeLinear
    }));
  }

  actKeyAfter() {
    this.ctx.globalCompositeOperation = `source-over`;
  }

  actCrocodileAfter() {
    this.ctx.globalCompositeOperation = `destination-in`;
    const s = this.size / 100;
    const startPointX = (this.objects.key.x + this.objects.key.size / 2) * s;
    const startPointY = (this.objects.key.y + this.objects.key.size * this.images.key.height /  this.images.key.width / 2) * s;
    this.ctx.beginPath();
    this.ctx.moveTo(startPointX - 3.9 * s, startPointY - 19.5 * s);
    this.ctx.arc(startPointX - 11.4 * s, startPointY - 28 * s, 11.4 * s, 1, 3.14, true);
    this.ctx.lineTo(startPointX - 30 *s, startPointY - 20 * s);
    this.ctx.lineTo(startPointX - 45 *s, startPointY - 5 * s);
    this.ctx.lineTo(startPointX - 45 *s, startPointY + 5 * s);
    this.ctx.lineTo(startPointX - 35 *s, startPointY + 15 * s);
    this.ctx.lineTo(startPointX, startPointY);
    this.ctx.closePath();
    this.ctx.fill();
    this.ctx.globalCompositeOperation = `destination-over`;
  }

  initCrocodileAnimations() {
    this.animations.push(new Animation({
      func: (progress) => {
        const progressReversed = 1 - progress;

        this.objects.crocodile.transforms.translateX = 30 * progressReversed;
        this.objects.crocodile.transforms.translateY = -5 * progressReversed;
      },
      duration: 600,
      delay: 867,
      easing: _.easeLinear
    }));
  }

  initWatermelonAnimations() {
    this.animations.push(new Animation({
      func: (progress) => {
        this.objects.watermelon.opacity = progress;
      },
      duration: 66,
      delay: 233,
      easing: _.easeOutCubic
    }));

    this.animations.push(new Animation({
      func: (progress) => {
        const progressReversed = 1 - progress;

        this.objects.watermelon.size = 18 * progress;
        this.objects.watermelon.transforms.translateX = 40 * progressReversed;
        this.objects.watermelon.transforms.translateY = -15 * progressReversed;
        this.objects.watermelon.transforms.rotate = 50 * progressReversed;
      },
      duration: 500,
      delay: 233,
      easing: _.easeOutCubic
    }));

    this.animations.push(new Animation({
      func: (progress) => {
        this.objects.watermelon.transforms.translateY = 30 * progress;
      },
      duration: 466,
      delay: 733,
      easing: _.easeInCubic
    }));
  }

  initFlamingoAnimations() {
    this.animations.push(new Animation({
      func: (progress) => {
        this.objects.flamingo.opacity = progress;
      },
      duration: 66,
      delay: 233,
      easing: _.easeOutCubic
    }));

    this.animations.push(new Animation({
      func: (progress) => {
        const progressReversed = 1 - progress;

        this.objects.flamingo.size = 21 * progress;
        this.objects.flamingo.transforms.translateX = 22 * progressReversed;
        this.objects.flamingo.transforms.translateY = 3 * progressReversed;
        this.objects.flamingo.transforms.rotate = 30 * progressReversed;
      },
      duration: 500,
      delay: 233,
      easing: _.easeOutCubic
    }));

    this.animations.push(new Animation({
      func: (progress) => {
        this.objects.flamingo.transforms.translateY = 60 * progress;
      },
      duration: 666,
      delay: 733,
      easing: _.easeInCubic
    }));
  }

  initLeafAnimations() {
    this.animations.push(new Animation({
      func: (progress) => {
        this.objects.leaf.opacity = progress;
      },
      duration: 66,
      delay: 233,
      easing: _.easeOutCubic
    }));

    this.animations.push(new Animation({
      func: (progress) => {
        const progressReversed = 1 - progress;

        this.objects.leaf.size = 28 * progress;
        this.objects.leaf.transforms.translateX = -35 * progressReversed;
        this.objects.leaf.transforms.translateY = 10 * progressReversed;
        this.objects.leaf.transforms.rotate = -35 * progressReversed;
      },
      duration: 500,
      delay: 233,
      easing: _.easeOutCubic
    }));

    this.animations.push(new Animation({
      func: (progress) => {
        this.objects.leaf.transforms.translateY = 70 * progress;
      },
      duration: 600,
      delay: 733,
      easing: _.easeInCubic
    }));
  }

  initSnowflakeAnimations() {
    this.animations.push(new Animation({
      func: (progress) => {
        this.objects.snowflake.opacity = progress;
      },
      duration: 66,
      delay: 233,
      easing: _.easeOutCubic
    }));

    this.animations.push(new Animation({
      func: (progress) => {
        const progressReversed = 1 - progress;

        this.objects.snowflake.size = 18 * progress;
        this.objects.snowflake.transforms.translateX = -25 * progressReversed;
        this.objects.snowflake.transforms.translateY = -7 * progressReversed;
        this.objects.snowflake.transforms.rotate = -45 * progressReversed;
      },
      duration: 500,
      delay: 233,
      easing: _.easeOutCubic
    }));

    this.animations.push(new Animation({
      func: (progress) => {
        this.objects.snowflake.transforms.translateY = 45 * progress;
      },
      duration: 733,
      delay: 733,
      easing: _.easeInCubic
    }));
  }

  initSaturnAnimations() {
    this.animations.push(new Animation({
      func: (progress) => {
        this.objects.saturn.opacity = progress;
      },
      duration: 66,
      delay: 233,
      easing: _.easeOutCubic
    }));

    this.animations.push(new Animation({
      func: (progress) => {
        const progressReversed = 1 - progress;

        this.objects.saturn.size = 22 * progress;
        this.objects.saturn.transforms.translateX = -37 * progressReversed;
        this.objects.saturn.transforms.translateY = -23 * progressReversed;
        this.objects.saturn.transforms.rotate = -40 * progressReversed;
      },
      duration: 500,
      delay: 233,
      easing: _.easeOutCubic
    }));

    this.animations.push(new Animation({
      func: (progress) => {
        this.objects.saturn.transforms.translateY = 25 * progress;
      },
      duration: 600,
      delay: 733,
      easing: _.easeInCubic
    }));
  }

  initDropAnimations() {
    this.animationsLoop.push(new Animation({
      func: (progress) => {
        this.objects.drop.size = 6 * progress;
        this.objects.drop.y = 64 + 5 * progress;
        this.objects.drop.opacity = progress;
      },
      duration: 500,
    }));

    this.animationsLoop.push(new Animation({
      func: (progress) => {
        this.objects.drop.transforms.translateY = 6 * progress;
      },
      duration: 1000,
      easing: _.easeInCubic
    }));

    this.animationsLoop.push(new Animation({
      func: (progress) => {
        const progressReversed = 1 - progress;

        this.objects.drop.size = 6 * progressReversed;
        this.objects.drop.opacity = progressReversed;
      },
      duration: 200,
      delay: 800,
    }));

    this.animations.push(new Animation({
      func: () => {
        this.objects.drop.y = 64;
      },
      delay: 1000,
      duration: 50
    }));
  }
}
