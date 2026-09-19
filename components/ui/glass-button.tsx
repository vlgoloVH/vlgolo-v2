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
  /** Hover: strength of the soap-film colour, 0 → none, 1 → full rainbow. */
  iridescence: 0.28,
  /** How much of the glare survives on hover, so it does not fight the colour. */
  hoverGlare: 0.45,
  /** Seconds for the hover state to ease in or out. */
  hoverEase: 0.45,
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
uniform float uHover;      // 0 → resting glass, 1 → soap film
uniform float uIrid;
uniform float uHoverGlare;

/* Thin-film interference, faked with a cosine palette: one number in, a full
   spectrum out. The phases are what set the order of the bands. */
vec3 filmColour(float t) {
  return 0.5 + 0.5 * cos(6.28318 * (t + vec3(0.0, 0.33, 0.67)));
}

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

  // On hover the lens bends harder and splits the channels further, so the
  // colour looks like it grows out of the refraction rather than sitting on top.
  float bend = pow(edge, 1.7) * uRefract * (1.0 + 0.35 * uHover);
  float disperse = uDisperse * (1.0 + 0.6 * uHover);

  // Splay pulls the whole sample outward from the centre.
  vec2 uv = (vUv - 0.5) * (1.0 - uSplay) + 0.5;

  vec2 pushG = n * bend;
  vec2 pushR = n * bend * (1.0 + disperse);
  vec2 pushB = n * bend * (1.0 - disperse);

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

  // Soap film. The band position comes from the angle of the surface plus how
  // close we are to the rim, with two slow waves stirring it so the patches
  // crawl the way they do on a real bubble. Strongest at the edge, faint in the
  // middle, which is where a film actually shows its colour.
  if (uHover > 0.001) {
    float swirl =
      sin(vUv.x * 2.1 + uTime * 0.31) * 0.2 +
      sin((vUv.y * 3.0 - vUv.x * 1.4) + uTime * 0.24) * 0.16;
    // The normal feeds in as components, not as an angle: atan wraps at ±pi and
    // that wrap shows up as a hard seam down one side of the pill.
    float thickness = n.x * 0.1 + n.y * 0.05 + edge * 0.38 + swirl;
    // Pulled towards white, so the film is pastel rather than a full rainbow.
    vec3 film = mix(filmColour(thickness), vec3(1.0), 0.22);
    float amount = uHover * uIrid * (0.72 + 0.28 * edge);
    // Screen, not replace: the video keeps showing through the colour.
    col = col + film * amount * (0.55 + 0.45 * (1.0 - col));
  }

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
  float glareLevel = mix(1.0, uHoverGlare, uHover);
  col += glare * fade * 0.24 * glareLevel * (0.75 + 0.25 * edge);

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
  /** Which video the lens refracts. Defaults to the first one on the page;
   *  null means there is nothing to refract, and the lens runs flat — the
   *  sheen, the glare and the hover colour still play. */
  videoSelector?: string | null;
  /** Set for a file the visitor should get rather than a page to open. */
  download?: boolean;
  className?: string;
}

/** The flat colour the lens sits on when there is no video to refract: the
 *  section surface, so the pill still reads as glass. */
const FLAT = [20, 20, 21, 255];

/** The pill renders the video behind it again, bent through a rounded-rect
 *  lens, so the refraction shows what is genuinely there. Without a video it
 *  refracts a flat colour instead, and without WebGL it silently keeps the CSS
 *  glass underneath. */
export function GlassButton({
  href,
  label,
  videoSelector = "video",
  download = false,
  className = "",
}: Props) {
  const rootRef = useRef<HTMLAnchorElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [live, setLive] = useState(false);

  useEffect(() => {
    const root = rootRef.current;
    const canvas = canvasRef.current;
    if (!root || !canvas) return;

    const video = videoSelector
      ? document.querySelector<HTMLVideoElement>(videoSelector)
      : null;

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

    if (!video) {
      // One pixel of the section colour: the lens has something to sample, and
      // nothing to upload every frame.
      gl.texImage2D(
        gl.TEXTURE_2D,
        0,
        gl.RGBA,
        1,
        1,
        0,
        gl.RGBA,
        gl.UNSIGNED_BYTE,
        new Uint8Array(FLAT),
      );
    }

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
      uHover: u("uHover"),
      uIrid: u("uIrid"),
      uHoverGlare: u("uHoverGlare"),
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
    gl.uniform1f(uniforms.uIrid, GLASS.iridescence);
    gl.uniform1f(uniforms.uHoverGlare, GLASS.hoverGlare);

    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    let raf = 0;
    let sized = "";
    let started = false;
    const t0 = performance.now();

    // Pointer and keyboard both count as hover; the value eases towards the
    // target so the colour arrives instead of snapping on.
    let hover = 0;
    let hoverTarget = 0;
    let last = performance.now();
    /** Touch fires pointerenter on tap same as a mouse would, but iOS doesn't
     *  reliably follow it with a pointerleave — left unfiltered, the glow
     *  gets stuck on after every tap. Every pointer event carries the input
     *  that produced it, so this checks that directly instead of a media
     *  query: a trackpad on an iPad with a keyboard case is `pointerType
     *  "mouse"` and still hovers normally, only an actual finger is filtered. */
    const pointerEnter = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;
      hoverTarget = 1;
    };
    const pointerLeave = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;
      hoverTarget = 0;
    };
    const focusIn = () => {
      hoverTarget = 1;
    };
    const focusOut = () => {
      hoverTarget = 0;
    };
    let onScreen = true;
    const visibility = new IntersectionObserver(
      ([entry]) => {
        onScreen = entry.isIntersecting;
      },
      { threshold: 0 },
    );
    visibility.observe(root);

    root.addEventListener("pointerenter", pointerEnter);
    root.addEventListener("pointerleave", pointerLeave);
    root.addEventListener("focus", focusIn);
    root.addEventListener("blur", focusOut);

    const draw = () => {
      raf = requestAnimationFrame(draw);

      const now = performance.now();
      const dt = Math.min((now - last) / 1000, 0.1);
      last = now;
      hover += (hoverTarget - hover) * Math.min(dt / GLASS.hoverEase, 1);

      // Off screen there is nothing to show, and the frame upload is the kind of
      // work that turns up as scroll jank.
      if (!onScreen) return;
      if (video && video.readyState < 2) return;

      const pill = root.getBoundingClientRect();
      if (!pill.width) return;

      // The video is object-contain, so work out the letterboxed draw area.
      const box = video?.getBoundingClientRect();
      const scale =
        video && box
          ? Math.min(box.width / video.videoWidth, box.height / video.videoHeight)
          : 1;
      const drawW = video ? video.videoWidth * scale : pill.width;
      const drawH = video ? video.videoHeight * scale : pill.height;
      const drawX = video && box ? box.x + (box.width - drawW) / 2 : pill.x;
      const drawY = video && box ? box.y + (box.height - drawH) / 2 : pill.y;
      if (!drawW || !drawH) return;

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
      gl.uniform1f(
        uniforms.uDim,
        video ? parseFloat(getComputedStyle(video).opacity) || 1 : 1,
      );
      gl.uniform1f(uniforms.uTime, (now - t0) / 1000);
      gl.uniform1f(uniforms.uHover, hover);

      gl.bindTexture(gl.TEXTURE_2D, texture);
      if (video) {
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 0);
        try {
          gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, video);
        } catch {
          return;
        }
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
      visibility.disconnect();
      root.removeEventListener("pointerenter", pointerEnter);
      root.removeEventListener("pointerleave", pointerLeave);
      root.removeEventListener("focus", focusIn);
      root.removeEventListener("blur", focusOut);
      gl.deleteTexture(texture);
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
    };
  }, [videoSelector]);

  return (
    <a
      ref={rootRef}
      href={href}
      download={download || undefined}
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
