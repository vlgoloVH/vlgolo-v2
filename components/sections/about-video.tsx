"use client";

import { useEffect, useRef, useState } from "react";
import { ABOUT } from "@/lib/site";

const VERT = `
attribute vec2 aPos;
varying vec2 vUv;
void main() {
  vUv = vec2(aPos.x * 0.5 + 0.5, 0.5 - aPos.y * 0.5);
  gl_Position = vec4(aPos, 0.0, 1.0);
}`;

/* The file holds the picture on the left and its matte on the right. Sampling
   both halves and using the matte as alpha cuts the figure out at draw time, so
   the clip has no background and therefore no edge — in every browser, which a
   video file's own alpha channel cannot do (Safari ignores it in VP9). */
const FRAG = `
precision mediump float;
varying vec2 vUv;
uniform sampler2D uTex;
void main() {
  vec2 uv = vec2(vUv.x * 0.5, vUv.y);
  vec3 colour = texture2D(uTex, uv).rgb;
  float alpha = texture2D(uTex, uv + vec2(0.5, 0.0)).r;
  gl_FragColor = vec4(colour, alpha);
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

/** The portrait loop. Playback and drawing only run while the section is on
 *  screen. `muted` is set on the element itself because React sets it as a
 *  property only, which would leave the attribute off the server-rendered
 *  markup and get autoplay blocked. */
export function AboutVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [live, setLive] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    video.muted = true;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const visibility = new IntersectionObserver(
      ([entry]) => {
        if (reduced) return;
        if (entry.isIntersecting) {
          void video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.15 },
    );
    visibility.observe(canvas);

    const gl = canvas.getContext("webgl", {
      alpha: true,
      premultipliedAlpha: false,
      antialias: false,
    });
    if (!gl) return () => visibility.disconnect();

    const vs = compile(gl, gl.VERTEX_SHADER, VERT);
    const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG);
    const program = gl.createProgram();
    if (!vs || !fs || !program) return () => visibility.disconnect();

    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      return () => visibility.disconnect();
    }
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

    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    let raf = 0;
    let sized = "";
    let started = false;

    const draw = () => {
      raf = requestAnimationFrame(draw);
      if (video.readyState < 2) return;

      const box = canvas.getBoundingClientRect();
      if (!box.width) return;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const key = `${Math.round(box.width)}x${Math.round(box.height)}x${dpr}`;
      if (key !== sized) {
        canvas.width = Math.round(box.width * dpr);
        canvas.height = Math.round(box.height * dpr);
        gl.viewport(0, 0, canvas.width, canvas.height);
        sized = key;
      }

      gl.bindTexture(gl.TEXTURE_2D, texture);
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
      visibility.disconnect();
      gl.deleteTexture(texture);
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
    };
  }, []);

  return (
    <div className="group relative h-full w-full" data-live={live ? "true" : undefined}>
      {/* The source never shows: it is there to be decoded and sampled. */}
      <video
        ref={videoRef}
        data-portrait=""
        className="pointer-events-none absolute h-px w-px opacity-0"
        src={ABOUT.video.packed}
        preload="auto"
        playsInline
        loop
        muted
        aria-hidden="true"
        tabIndex={-1}
      />

      {/* The still is the first frame, already cut out, so there is nothing to
          see arrive — and it is what stays without WebGL. */}
      <img
        src={ABOUT.video.poster}
        alt=""
        aria-hidden="true"
        className="h-full w-full object-cover object-bottom transition-opacity duration-500 group-data-[live=true]:opacity-0"
      />

      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="absolute inset-0 h-full w-full opacity-0 transition-opacity duration-500 group-data-[live=true]:opacity-100"
      />
    </div>
  );
}
