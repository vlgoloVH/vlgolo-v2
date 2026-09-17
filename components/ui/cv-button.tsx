"use client";

import { useEffect, useRef, useState } from "react";

/** The Figma glass values this is built to reproduce. */
const GLASS = {
  /** Light −45°, 80% → sheen direction and strength. */
  lightAngle: -45,
  lightStrength: 0.8,
  /** Refraction 100 → how far the edge bends what is behind it, in px. */
  refraction: 20,
  /** Depth 82 → how deep into the pill the bend reaches, in px. */
  depth: 16,
  /** Dispersion 55 → how far apart the R and B samples drift. */
  dispersion: 0.55,
  /** Frost 4 → a touch of blur, done as a few extra taps. */
  frost: 1.2,
  /** Splay 60 → outward stretch of the whole sample. */
  splay: 0.06,
  /** Seconds between glare sweeps, and how long one sweep takes. */
  sweepEvery: 2.2,
  sweepTime: 1.1,
} as const;

const VERT = `
attribute vec2 aPos;
varying vec2 vUv;
void main() {
  vUv = aPos * 0.5 + 0.5;
  gl_Position = vec4(aPos, 0.0, 1.0);
}`;

/* Refraction through a rounded-rect lens: the surface normal comes from the
   gradient of the pill's signed distance field, the sample is pushed along it,
   and the three colour channels are pushed by slightly different amounts,
   which is what produces the spectral fringe. */
const FRAG = `
precision highp float;
varying vec2 vUv;

uniform sampler2D uTex;
uniform vec2 uUv0;        // top-left of the pill inside the video, in uv
uniform vec2 uUvSize;     // size of the pill inside the video, in uv
uniform vec2 uPxToUv;     // one css pixel expressed in uv
uniform vec2 uSize;       // pill size in css px
uniform float uRadius;    // pill corner radius in css px
uniform float uDim;       // current opacity of the video behind
uniform float uRefract;
uniform float uDepth;
uniform float uDisperse;
uniform float uFrost;
uniform float uSplay;
uniform vec2 uLight;
uniform float uTime;
uniform float uSweepEvery;
uniform float uSweepTime;

float sdRoundRect(vec2 p, vec2 half_, float r) {
  vec2 q = abs(p) - half_ + r;
  return min(max(q.x, q.y), 0.0) + length(max(q, 0.0)) - r;
}

vec3 sampleAt(vec2 uv, vec2 push) {
  vec2 base = uUv0 + uv * uUvSize;
  vec2 off = push * uPxToUv;
  return texture2D(uTex, base + off).rgb;
}

void main() {
  vec2 half_ = uSize * 0.5;
  vec2 p = (vUv - 0.5) * uSize;

  float d = sdRoundRect(p, half_, uRadius);

  // Numeric gradient of the field = the lens normal.
  float e = 1.0;
  vec2 n = normalize(vec2(
    sdRoundRect(p + vec2(e, 0.0), half_, uRadius) - sdRoundRect(p - vec2(e, 0.0), half_, uRadius),
    sdRoundRect(p + vec2(0.0, e), half_, uRadius) - sdRoundRect(p - vec2(0.0, e), half_, uRadius)
  ) + 1e-6);

  // 1 hard against the rim, falling to 0 by uDepth inside.
  float edge = 1.0 - clamp(-d / uDepth, 0.0, 1.0);
  float bend = pow(edge, 1.7) * uRefract;

  // Splay pulls the whole sample outward from the centre.
  vec2 uv = (vUv - 0.5) * (1.0 - uSplay) + 0.5;

  vec2 pushG = n * bend;
  vec2 pushR = n * bend * (1.0 + uDisperse);
  vec2 pushB = n * bend * (1.0 - uDisperse);

  vec3 col;
  col.r = sampleAt(uv, pushR).r;
  col.g = sampleAt(uv, pushG).g;
  col.b = sampleAt(uv, pushB).b;

  // Frost: a few cheap taps around the main one.
  if (uFrost > 0.0) {
    vec3 blur = col;
    blur += sampleAt(uv, pushG + vec2(uFrost, 0.0));
    blur += sampleAt(uv, pushG + vec2(-uFrost, 0.0));
    blur += sampleAt(uv, pushG + vec2(0.0, uFrost));
    blur += sampleAt(uv, pushG + vec2(0.0, -uFrost));
    col = blur / 5.0;
  }

  col *= uDim;

  // Sheen raking in from the light direction, strongest on the rim. It breathes
  // very slightly so the glass never looks like a still image.
  float spec = pow(max(dot(n, uLight), 0.0), 6.0) * edge;
  col += spec * 0.42 * (0.86 + 0.14 * sin(uTime * 0.55));

  // A wide, very soft base sheen drifting side to side, so the glass is never
  // completely still.
  float drift = sin(uTime * 0.22) * 0.5 + 0.5;
  col += exp(-pow((vUv.x - drift) * 2.6, 2.0)) * 0.04;

  // And a narrow diagonal glare that crosses the pill every uSweepEvery
  // seconds, taking uSweepTime to travel. Visible, but gone before it nags.
  float cycle = mod(uTime, uSweepEvery);
  float phase = clamp(cycle / uSweepTime, 0.0, 1.0);
  float pos = mix(-0.4, 1.4, smoothstep(0.0, 1.0, phase));
  float diag = vUv.x * 0.84 + vUv.y * 0.16;
  float glare = exp(-pow((diag - pos) * 6.5, 2.0));
  float fade = sin(phase * 3.14159);          // eases in and out of the sweep
  col += glare * fade * 0.24 * (0.75 + 0.25 * edge);

  // The 10% white fill from the Figma style.
  col += vec3(0.10) * 0.85;

  // Antialias the pill edge itself.
  float alpha = 1.0 - smoothstep(-1.0, 0.5, d);
  gl_FragColor = vec4(col, alpha);
}`;

function compile(gl: WebGLRenderingContext, type: number, src: string) {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, src);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

interface Props {
  href: string;
  label: string;
  className?: string;
}

/** The pill renders the hero video again, bent through a rounded-rect lens, so
 *  the refraction shows what is genuinely behind the button. If WebGL or the
 *  video is unavailable it silently keeps the CSS glass underneath. */
export function CvButton({ href, label, className = "" }: Props) {
  const rootRef = useRef<HTMLAnchorElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [live, setLive] = useState(false);

  useEffect(() => {
    const root = rootRef.current;
    const canvas = canvasRef.current;
    if (!root || !canvas) return;

    const video = document.querySelector("video");
    if (!video) return;

    const gl = canvas.getContext("webgl", {
      alpha: true,
      premultipliedAlpha: false,
      antialias: false,
    });
    if (!gl) return;

    const vs = compile(gl, gl.VERTEX_SHADER, VERT);
    const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG);
    if (!vs || !fs) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;
    gl.useProgram(program);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
      gl.STATIC_DRAW,
    );
    const aPos = gl.getAttribLocation(program, "aPos");
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    const texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

    const u = (name: string) => gl.getUniformLocation(program, name);
    const uniforms = {
      uUv0: u("uUv0"),
      uUvSize: u("uUvSize"),
      uPxToUv: u("uPxToUv"),
      uSize: u("uSize"),
      uRadius: u("uRadius"),
      uDim: u("uDim"),
      uRefract: u("uRefract"),
      uDepth: u("uDepth"),
      uDisperse: u("uDisperse"),
      uFrost: u("uFrost"),
      uSplay: u("uSplay"),
      uLight: u("uLight"),
      uTime: u("uTime"),
      uSweepEvery: u("uSweepEvery"),
      uSweepTime: u("uSweepTime"),
    };

    const rad = (GLASS.lightAngle * Math.PI) / 180;
    gl.uniform2f(uniforms.uLight, Math.cos(rad), Math.sin(rad));
    gl.uniform1f(uniforms.uRefract, GLASS.refraction);
    gl.uniform1f(uniforms.uDepth, GLASS.depth);
    gl.uniform1f(uniforms.uDisperse, GLASS.dispersion);
    gl.uniform1f(uniforms.uFrost, GLASS.frost);
    gl.uniform1f(uniforms.uSplay, GLASS.splay);
    gl.uniform1f(uniforms.uSweepEvery, GLASS.sweepEvery);
    gl.uniform1f(uniforms.uSweepTime, GLASS.sweepTime);

    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    let raf = 0;
    let sized = "";
    let started = false;
    const t0 = performance.now();

    const draw = () => {
      raf = requestAnimationFrame(draw);

      if (video.readyState < 2) return;

      const pill = root.getBoundingClientRect();
      const box = video.getBoundingClientRect();
      if (!pill.width || !box.width) return;

      // The video is object-contain, so work out the letterboxed draw area.
      const scale = Math.min(box.width / video.videoWidth, box.height / video.videoHeight);
      const drawW = video.videoWidth * scale;
      const drawH = video.videoHeight * scale;
      const drawX = box.x + (box.width - drawW) / 2;
      const drawY = box.y + (box.height - drawH) / 2;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const key = `${pill.width}x${pill.height}x${dpr}`;
      if (key !== sized) {
        canvas.width = Math.round(pill.width * dpr);
        canvas.height = Math.round(pill.height * dpr);
        gl.viewport(0, 0, canvas.width, canvas.height);
        gl.uniform2f(uniforms.uSize, pill.width, pill.height);
        gl.uniform1f(uniforms.uRadius, pill.height / 2);
        sized = key;
      }

      gl.uniform2f(uniforms.uUv0, (pill.x - drawX) / drawW, (pill.y - drawY) / drawH);
      gl.uniform2f(uniforms.uUvSize, pill.width / drawW, pill.height / drawH);
      gl.uniform2f(uniforms.uPxToUv, 1 / drawW, 1 / drawH);
      gl.uniform1f(uniforms.uDim, parseFloat(getComputedStyle(video).opacity) || 1);
      gl.uniform1f(uniforms.uTime, (performance.now() - t0) / 1000);

      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 0);
      try {
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, video);
      } catch {
        return;
      }

      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

      if (!started) {
        started = true;
        setLive(true);
      }
    };

    raf = requestAnimationFrame(draw);

    const onVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(raf);
      } else {
        raf = requestAnimationFrame(draw);
      }
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("visibilitychange", onVisibility);
      gl.deleteTexture(texture);
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
    };
  }, []);

  return (
    <a
      ref={rootRef}
      href={href}
      download
      data-live={live ? "true" : undefined}
      className={`glass-pill group ${className}`}
    >
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full opacity-0 transition-opacity duration-500 group-data-[live=true]:opacity-100"
      />
      <span className="relative">{label}</span>
    </a>
  );
}
