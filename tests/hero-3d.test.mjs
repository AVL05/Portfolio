import assert from "node:assert/strict";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { test } from "node:test";
import { runInNewContext } from "node:vm";
import { ModuleKind, transpileModule } from "typescript";
import { MeshoptDecoder } from "three/examples/jsm/libs/meshopt_decoder.module.js";

const directory = new URL("../public/hero-3d/optimized/", import.meta.url);
const expected = ["camera-lens", "camera", "desk", "monitor", "office-chair", "pc-tower", "potted-plant", "shelf", "desk-lamp", "office-rug", "topographic-wall-panel"].map(name => `${name}.glb`).sort();

const configSource = readFileSync(new URL("../components/hero-3d/roomSceneConfig.ts", import.meta.url), "utf8");
const configModule = { exports: {} };
runInNewContext(transpileModule(configSource, { compilerOptions: { module: ModuleKind.CommonJS } }).outputText, configModule);

test("all four localized hotspots point to existing portfolio destinations", () => {
  const hotspots = configModule.exports.roomHotspots;
  assert.equal(Object.keys(hotspots).length, 4);
  for (const hotspot of Object.values(hotspots)) {
    const destination = new URL(hotspot.href, "https://www.aleviclop.dev");
    assert.equal(destination.origin, "https://www.aleviclop.dev");
    assert.ok(hotspot.label.es.trim() && hotspot.label.en.trim());
    assert.ok(hotspot.position.every(Number.isFinite));
    if (destination.hash) {
      assert.equal(destination.pathname, "/");
      const files = { "#about": "skills", "#projects": "projects", "#photography": "photography" };
      assert.ok(files[destination.hash]);
      const section = readFileSync(new URL("../components/" + files[destination.hash] + ".tsx", import.meta.url), "utf8");
      assert.ok(section.includes('id="' + destination.hash.slice(1) + '"'));
    } else {
      assert.ok(existsSync(new URL(`../app/(es)${destination.pathname}/page.tsx`, import.meta.url)));
    }
  }
});

test("virtual monitor screen has a safe offset and an optional local texture", () => {
  const screen = configModule.exports.monitorScreenConfig;
  assert.ok(screen.offset > 0 && screen.offset < 0.02);
  assert.ok(screen.width > 0 && screen.aspect > 1);
  assert.ok(screen.emissiveIntensity > 0 && screen.emissiveIntensity < 0.3);
  if (screen.texture !== null) {
    assert.ok(screen.texture.startsWith("/hero-3d/textures/"));
    assert.ok(existsSync(new URL(`../public${screen.texture}`, import.meta.url)));
  }
});

test("creative room assets fit the transfer budget and decode locally", async () => {
  assert.deepEqual(readdirSync(directory).sort(), expected);
  await MeshoptDecoder.ready;
  let bytes = 0;
  let triangles = 0;
  for (const file of expected) {
    const buffer = readFileSync(new URL(file, directory));
    bytes += buffer.length;
    assert.equal(buffer.readUInt32LE(0), 0x46546c67, file);
    assert.equal(buffer.readUInt32LE(4), 2, file);
    assert.equal(buffer.readUInt32LE(8), buffer.length, file);
    const jsonLength = buffer.readUInt32LE(12);
    const gltf = JSON.parse(buffer.subarray(20, 20 + jsonLength).toString());
    const binary = buffer.subarray(28 + jsonLength);
    assert.ok(gltf.extensionsRequired.includes("EXT_meshopt_compression"), file);
    for (const image of gltf.images) {
      assert.equal(image.uri, undefined, `${file}: textures must be embedded`);
      assert.equal(image.mimeType, "image/webp", file);
    }
    for (const view of gltf.bufferViews) {
      const compressed = view.extensions?.EXT_meshopt_compression;
      if (!compressed) continue;
      const source = binary.subarray(compressed.byteOffset, compressed.byteOffset + compressed.byteLength);
      assert.equal(source.length, compressed.byteLength, file);
      const decoded = new Uint8Array(compressed.count * compressed.byteStride);
      MeshoptDecoder.decodeGltfBuffer(decoded, compressed.count, compressed.byteStride, source, compressed.mode, compressed.filter);
      assert.equal(decoded.length, view.byteLength, file);
    }
    for (const mesh of gltf.meshes) {
      for (const primitive of mesh.primitives) {
        triangles += gltf.accessors[primitive.indices].count / 3;
      }
    }
  }
  assert.ok(bytes < 10_000_000, `GLB payload: ${bytes}`);
  assert.ok(triangles < 800_000, `Triangle budget (11 models): ${triangles}`);
});

test("mountain texture is a local PNG with a valid aspect ratio", () => {
  const image = readFileSync(new URL("../public/hero-3d/textures/Meshy_AI_mountain-window-view.png", import.meta.url));
  assert.equal(image.subarray(1, 4).toString(), "PNG");
  assert.ok(image.readUInt32BE(16) > 0);
  assert.ok(image.readUInt32BE(20) > 0);
});
