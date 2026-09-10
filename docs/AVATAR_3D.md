# Avatar 3D aislado

Prueba: `pnpm dev`, abrir `/avatar-preview`. No sustituye la home ni modifica
`components/hero.tsx`. La ruta lleva `noindex` y no se incorpora al sitemap.

## Inspección del archivo original

- Archivo: `public/hero-3d/avatar.glb`, 83.761.652 bytes (79,9 MiB).
- SHA-256: `4FF1017468AFC6F9E3E6D226F1DBCC2F7430EDCBB933B832DB6F2512DC0EA2A3`.
- Exportador: Khronos glTF Blender I/O v4.5.51; glTF 2.0.
- Un mesh skinned: `output_unwrapped`, 112.526 vértices, 113.884 triángulos.
- Armature y skin: `Armature`; 28 joints.
- Material original: `BakedMaterial`, color base PNG 8192×8192 y
  metallic/roughness PNG 4096×4096. Se conservan materiales y texturas.
- Bounds de POSITION: X [-0,543791; 0,542761], Y [0; 1,70],
  Z [-0,232803; 0,236318]. Escala de Armature y mesh: 1.
- Y arriba; frontal +Z, comprobado con el vector mundial `Head → headfront`:
  aproximadamente [0; 0; 0,157647]. Cámara en +Z, sin rotar el modelo.
- Dos clips llamados `Walking`; no se reproducen.

Huesos reales, respetando mayúsculas:

```text
Hips
  Spine02 → Spine01 → Spine → neck → Head → head_end / headfront
  Spine → LeftShoulder → LeftArm → LeftForeArm → LeftHand → LeftHand_End
  Spine → RightShoulder → RightArm → RightForeArm → RightHand → RightHand_End
  LeftUpLeg → LeftLeg → LeftFoot → LeftToeBase → LeftToe_end
  RightUpLeg → RightLeg → RightFoot → RightToeBase → RightToe_end
```

## Implementación

`AvatarPreview` carga el Canvas solo en cliente. `AvatarModel` usa `useGLTF`
y `SkeletonUtils.clone` para animar una copia del esqueleto sin mutar la caché.
El centrado usa los bounds de la pose y una traslación fija del contenedor;
la cámara ajusta su distancia al tamaño del visor. No se escala el avatar.

Solo se rotan `Spine`, `neck` y `Head`: respiración, micro idle y seguimiento
limitado del cursor con slerp independiente de FPS. Los ejes se calculan desde
la orientación mundial real de cada hueso. Hips, piernas y pies no se animan.
Al salir el cursor vuelve al centro; movimiento reducido restaura la pose
y cambia a render bajo demanda. DPR máximo 1,5, sin sombras ni postprocesado.

La CSP permite `connect-src blob:` únicamente en `/avatar-preview` para que
ImageBitmapLoader pueda decodificar las texturas embebidas.

El peso del GLB y sus texturas limita la carga y memoria GPU, especialmente
en móviles. Optimizar el asset requeriría una fase autorizada posterior.
El GLB original permanece intacto y no se generan renders ni vídeos.

## Comprobación local

Playwright/Chromium: texturas originales cargadas (8192 y 4096), un draw call
y 113.884 triángulos. El cursor cambia Head/neck; las transformaciones mundiales
de Hips y ambos pies permanecen idénticas. Movimiento reducido restaura la pose
y la mantiene estable. Visores de 992×675 y 358×633 ajustan la cámara.
Sin errores de consola; home accesible. Comprobación de estado WebGL y rig,
sin capturas ni evaluación artística. SHA-256 del GLB sin cambios.

Three.js emite un aviso de deprecación de `THREE.Clock` desde React Three Fiber;
no impide la carga. No se modifica la dependencia para silenciarlo.
