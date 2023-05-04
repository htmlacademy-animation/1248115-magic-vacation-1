const fragmentShader = `
  precision mediump float;
  uniform sampler2D map;

  varying vec2 vUv;

  uniform float hueShift;
  uniform bool circles;

  struct circleStruct {
    float sphere;
    vec2 center;
  };

  struct paramCircles {
    float sphere;
    float centerX;
    float centerY;
  };

  uniform paramCircles paramArrayCircles[3];

  const float radius = 1.0;
  float depth = radius * 0.6;
  vec4 outlineColor = vec4(1, 1, 1, 1);
  float outlineWidth = 0.015;

  vec2 ma;
  vec2 dc;
  float ax;
  circleStruct currentCircle;

  void drawCircle() {
    dc = vUv - currentCircle.center;
    ax = dc.x*dc.x*4.*currentCircle.sphere + dc.y*dc.y*currentCircle.sphere;
    if (ax < radius) {
      if (ax >= radius - outlineWidth) {
        gl_FragColor = outlineColor;
      } else {
        float dx = ax*depth/radius * (ax/radius - 1.);
        ma = currentCircle.center + (vUv - currentCircle.center) * (ax + dx) / ax;
        gl_FragColor = vec4(texture2D(map, ma).rgb, 1.);
      }
    }
  }

  vec3 rgb2hsv(vec3 c) {
    vec4 K = vec4(0.0, -1.0 / 3.0, 2.0 / 3.0, -1.0);
    vec4 p = mix(vec4(c.bg, K.wz), vec4(c.gb, K.xy), step(c.b, c.g));
    vec4 q = mix(vec4(p.xyw, c.r), vec4(c.r, p.yzx), step(p.x, c.r));

    float d = q.x - min(q.w, q.y);
    float e = 1.0e-10;
    return vec3(abs(q.z + (q.w - q.y) / (6.0 * d + e)), d / (q.x + e), q.x);
  }

  vec3 hsv2rgb(vec3 c) {
    vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
    vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
    return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
  }

  void shiftColor() {
    vec3 fragRGB = gl_FragColor.rgb;
    vec3 fragHSV = rgb2hsv(fragRGB).xyz;

    fragHSV.x += hueShift / 360.0;

    if (fragHSV.x > 1.0) {
      fragHSV.x -= 1.0;
    }
    if (fragHSV.x < 0.0) {
      fragHSV.x += 1.0;
    }

    fragRGB = hsv2rgb(fragHSV);
    gl_FragColor = vec4(fragRGB, 1);
  }

  void main() {
    ma = vUv;
    gl_FragColor = vec4(texture2D(map, ma).rgb, 1.);

    if (circles == true) {
      for (int index = 0; index < 3; index++) {
        currentCircle = circleStruct(paramArrayCircles[index].sphere, vec2(paramArrayCircles[index].centerX, paramArrayCircles[index].centerY));
        drawCircle();
      }
    }

    if (hueShift != 0.0) {
      shiftColor();
    }
  }
`;

export {fragmentShader};
