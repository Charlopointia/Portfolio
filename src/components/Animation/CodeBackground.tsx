import { type RefObject, useEffect, useRef } from "react";
import { verses } from "./verses";
import "./CodeBackground.css";

type CodeBackgroundProps = {
  /** Élément au centre du globe (la card avec le nom) */
  anchorRef: RefObject<HTMLElement | null>;
};

/* -------------------------------------------------------------------------- */
/* Réglages                                                                   */
/* -------------------------------------------------------------------------- */

const SETTINGS = {
  fontSize: 13, // taille de base des lettres (px CSS)
  lineHeight: 22, // hauteur d'une ligne de la grille (px CSS)
  centerZoom: 1.2, // grossissement au centre du globe
  rotationSpeed: 7, // rotation du globe (px de grille par seconde)
  maxPixelRatio: 1.5, // limite la résolution sur les écrans Retina (performances)
};

/* Atlas de glyphes : les 95 caractères ASCII affichables, en 16 × 6 cases */
const ATLAS = {
  width: 1024,
  height: 512,
  columns: 16,
  cellWidth: 64,
  cellHeight: 80,
  fontSize: 64,
  glyphWidth: 38.4, // 0.6em : chasse de JetBrains Mono
};

/* Grille de texte : les citations écrites à la suite, ligne après ligne */
const MAP = { columns: 512, rows: 128 };

/* -------------------------------------------------------------------------- */
/* Shaders                                                                    */
/* -------------------------------------------------------------------------- */

const VERTEX_SHADER = `
attribute vec2 aPosition;
void main() {
  gl_Position = vec4(aPosition, 0.0, 1.0);
}
`;

/*
 * Pour chaque pixel :
 *  1. globe : on projette le pixel sur une sphère centrée sur la card
 *     (texte grossi au centre, comprimé vers le bord) ;
 *  2. on trouve la case de la grille et la lettre qu'elle contient ;
 *  3. un bruit animé décide si la lettre est allumée : des groupes de lettres
 *     voisines s'allument ensemble (des mots apparaissent), d'autres scintillent.
 */
const FRAGMENT_SHADER = `
precision highp float;

uniform sampler2D uAtlas;
uniform sampler2D uMap;
uniform vec2 uResolution;
uniform vec2 uCenter;
uniform vec2 uGlobe;     // rayons horizontal et vertical du globe
uniform vec2 uCell;      // taille d'une case de la grille
uniform float uGlyphHeight;
uniform float uZoom;
uniform float uTime;
uniform float uSpeed;

const vec2 MAP_SIZE = vec2(${MAP.columns}.0, ${MAP.rows}.0);
const float ATLAS_COLUMNS = ${ATLAS.columns}.0;
const vec2 ATLAS_SIZE = vec2(${ATLAS.width}.0, ${ATLAS.height}.0);
const vec2 ATLAS_CELL = vec2(${ATLAS.cellWidth}.0, ${ATLAS.cellHeight}.0);
const float GLYPH_WIDTH = ${ATLAS.glyphWidth};

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));
  return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
}

void main() {
  vec2 p = vec2(gl_FragCoord.x, uResolution.y - gl_FragCoord.y);
  vec2 v = p - uCenter;

  // 1. Globe : distance au centre, normalisée sur l'ellipse
  vec2 n = v / uGlobe;
  float rn = length(n);
  if (rn >= 1.0) {
    gl_FragColor = vec4(0.0);
    return;
  }
  float projection = rn > 0.0001 ? asin(rn) / rn : 1.0;
  vec2 grid = v * projection / uZoom;
  grid.x += uTime * uSpeed; // le globe tourne

  // 2. Case de la grille et lettre correspondante
  vec2 cellPos = grid / uCell;
  vec2 cell = floor(cellPos);
  vec2 local = fract(cellPos);

  vec2 mapUv = (mod(cell, MAP_SIZE) + 0.5) / MAP_SIZE;
  float code = floor(texture2D(uMap, mapUv).r * 255.0 + 0.5);

  // Lettre centrée dans sa case, en hauteur
  float glyphY = (local.y * uCell.y - (uCell.y - uGlyphHeight) * 0.5) / uGlyphHeight;
  float inside = step(32.5, code) * step(0.0, glyphY) * step(glyphY, 1.0);
  float index = max(code - 32.0, 0.0);
  vec2 atlasCell = vec2(mod(index, ATLAS_COLUMNS), floor(index / ATLAS_COLUMNS));
  vec2 inGlyph = vec2(
    (ATLAS_CELL.x - GLYPH_WIDTH) * 0.5 + local.x * GLYPH_WIDTH,
    clamp(glyphY, 0.0, 1.0) * ATLAS_CELL.y
  );
  float ink = texture2D(uAtlas, (atlasCell * ATLAS_CELL + inGlyph) / ATLAS_SIZE).a * inside;

  // 3. Allumage des lettres
  float rowSeed = hash(vec2(cell.y, 7.0));
  float words = noise(vec2(cell.x * 0.2 + rowSeed * 91.0, uTime * 0.25 + rowSeed * 37.0));
  float flicker = 0.5 + 0.5 * sin(uTime * (0.6 + 1.4 * hash(cell)) + hash(cell + 3.1) * 6.2831);
  float lit = smoothstep(0.6, 0.68, words * 0.5 + flicker * 0.55);

  // Ombrage de sphère : plus sombre vers le bord
  float shade = sqrt(1.0 - rn * rn);
  float letter = ink * lit * mix(0.25, 0.9, shade);

  // Léger voile bleuté qui dessine la sphère
  float fill = 0.07 * shade + 0.05 * smoothstep(0.93, 1.0, rn) * (1.0 - smoothstep(0.995, 1.0, rn));

  vec3 letterColor = mix(vec3(0.553, 0.741, 1.0), vec3(0.84, 0.91, 1.0), lit * shade * 0.5);
  vec3 fillColor = vec3(0.25, 0.42, 0.85);
  float alpha = letter + fill * (1.0 - letter);
  vec3 color = (letterColor * letter + fillColor * fill * (1.0 - letter));

  gl_FragColor = vec4(color, alpha);
}
`;

/* -------------------------------------------------------------------------- */
/* Textures                                                                   */
/* -------------------------------------------------------------------------- */

/** Générateur pseudo-aléatoire déterministe : même grille à chaque chargement */
function createRandom(seed: number) {
  return () => {
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Dessine les 95 caractères ASCII dans une image (un caractère par case) */
function drawAtlas() {
  const canvas = document.createElement("canvas");
  canvas.width = ATLAS.width;
  canvas.height = ATLAS.height;
  const ctx = canvas.getContext("2d");
  if (!ctx) return canvas;

  ctx.font = `${ATLAS.fontSize}px "JetBrains Mono", ui-monospace, Menlo, monospace`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillStyle = "#ffffff";

  for (let code = 32; code <= 126; code++) {
    const index = code - 32;
    const x = (index % ATLAS.columns) * ATLAS.cellWidth + ATLAS.cellWidth / 2;
    const y = Math.floor(index / ATLAS.columns) * ATLAS.cellHeight + ATLAS.cellHeight / 2;
    ctx.fillText(String.fromCharCode(code), x, y);
  }
  return canvas;
}

/** Écrit les citations à la suite dans la grille (un code ASCII par case) */
function buildTextMap() {
  const random = createRandom(42);
  const size = MAP.columns * MAP.rows;
  const data = new Uint8Array(size * 4);
  let i = 0;
  while (i < size) {
    const verse = verses[Math.floor(random() * verses.length)] + "  ";
    for (let c = 0; c < verse.length && i < size; c++, i++) {
      const code = verse.charCodeAt(c);
      data[i * 4] = code >= 32 && code <= 126 ? code : 32;
      data[i * 4 + 3] = 255;
    }
  }
  return data;
}

/* -------------------------------------------------------------------------- */
/* WebGL                                                                      */
/* -------------------------------------------------------------------------- */

function compile(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error(gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

function createProgram(gl: WebGLRenderingContext) {
  const vertex = compile(gl, gl.VERTEX_SHADER, VERTEX_SHADER);
  const fragment = compile(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER);
  if (!vertex || !fragment) return null;

  const program = gl.createProgram();
  if (!program) return null;
  gl.attachShader(program, vertex);
  gl.attachShader(program, fragment);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error(gl.getProgramInfoLog(program));
    return null;
  }
  return program;
}

function createTexture(gl: WebGLRenderingContext, unit: number, filter: number) {
  const texture = gl.createTexture();
  gl.activeTexture(gl.TEXTURE0 + unit);
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, filter);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  return texture;
}

/* -------------------------------------------------------------------------- */
/* Composant                                                                  */
/* -------------------------------------------------------------------------- */

export default function CodeBackground({ anchorRef }: CodeBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = canvas?.parentElement;
    if (!canvas || !container) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const gl = canvas.getContext("webgl", { alpha: true, premultipliedAlpha: true, antialias: false });
    if (!gl) return; // Sans WebGL : simple fond dégradé, sans texte

    const program = createProgram(gl);
    if (!program) return;
    gl.useProgram(program);

    // Un rectangle qui couvre tout le canvas
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
    const position = gl.getAttribLocation(program, "aPosition");
    gl.enableVertexAttribArray(position);
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);

    const uniform = (name: string) => gl.getUniformLocation(program, name);

    // Texture 0 : atlas des lettres (mipmaps pour des petites lettres nettes)
    const atlasTexture = createTexture(gl, 0, gl.LINEAR_MIPMAP_LINEAR);
    const uploadAtlas = () => {
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, atlasTexture);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, drawAtlas());
      gl.generateMipmap(gl.TEXTURE_2D);
    };
    uploadAtlas();
    gl.uniform1i(uniform("uAtlas"), 0);

    // Texture 1 : la grille de texte (lue case par case, sans lissage)
    const mapTexture = createTexture(gl, 1, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, MAP.columns, MAP.rows, 0, gl.RGBA, gl.UNSIGNED_BYTE, buildTextMap());
    gl.uniform1i(uniform("uMap"), 1);

    const uResolution = uniform("uResolution");
    const uCenter = uniform("uCenter");
    const uGlobe = uniform("uGlobe");
    const uCell = uniform("uCell");
    const uGlyphHeight = uniform("uGlyphHeight");
    const uZoom = uniform("uZoom");
    const uTime = uniform("uTime");
    const uSpeed = uniform("uSpeed");

    /** Recalcule la taille, le centre (milieu de la card) et le globe */
    const layout = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, SETTINGS.maxPixelRatio);
      const width = Math.max(1, Math.round(container.clientWidth * ratio));
      const height = Math.max(1, Math.round(container.clientHeight * ratio));
      canvas.width = width;
      canvas.height = height;
      gl.viewport(0, 0, width, height);

      const containerBox = container.getBoundingClientRect();
      const anchorBox = anchorRef.current?.getBoundingClientRect();
      const cx = (anchorBox ? anchorBox.left + anchorBox.width / 2 - containerBox.left : containerBox.width / 2) * ratio;
      const cy = (anchorBox ? anchorBox.top + anchorBox.height / 2 - containerBox.top : containerBox.height / 2) * ratio;

      // Globe un peu plus grand que l'écran : son bord arrondi apparaît dans les coins
      const radiusX = Math.max(cx, width - cx) * 1.18;
      const radiusY = Math.max(cy, height - cy) * 1.4;

      const glyphWidth = SETTINGS.fontSize * 0.6 * ratio;
      const glyphHeight = glyphWidth * (ATLAS.cellHeight / ATLAS.glyphWidth);

      gl.uniform2f(uResolution, width, height);
      gl.uniform2f(uCenter, cx, cy);
      gl.uniform2f(uGlobe, radiusX, radiusY);
      gl.uniform2f(uCell, glyphWidth, SETTINGS.lineHeight * ratio);
      gl.uniform1f(uGlyphHeight, glyphHeight);
      gl.uniform1f(uZoom, SETTINGS.centerZoom);
      gl.uniform1f(uSpeed, SETTINGS.rotationSpeed * ratio);
    };

    const start = performance.now();
    let frame = 0;
    let visible = true;
    let disposed = false;

    const render = () => {
      gl.uniform1f(uTime, (performance.now() - start) / 1000);
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    };

    const loop = () => {
      render();
      if (visible && !reduceMotion) frame = requestAnimationFrame(loop);
    };

    const restart = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(loop);
    };

    layout();
    restart();

    // La police JetBrains Mono peut arriver après le premier rendu
    document.fonts?.ready.then(() => {
      if (disposed) return;
      uploadAtlas();
      restart();
    });

    const resizeObserver = new ResizeObserver(() => {
      layout();
      restart();
    });
    resizeObserver.observe(container);

    // Pause quand l'accueil n'est plus à l'écran
    const visibilityObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) restart();
    });
    visibilityObserver.observe(container);

    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      visibilityObserver.disconnect();
      gl.deleteTexture(atlasTexture);
      gl.deleteTexture(mapTexture);
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
    };
  }, [anchorRef]);

  return (
    <div className="code-bg" aria-hidden="true">
      <div className="code-bg-gradient" />
      <canvas ref={canvasRef} className="code-bg-canvas" />
      <div className="code-bg-scanlines" />
    </div>
  );
}
