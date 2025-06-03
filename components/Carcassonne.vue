<template>
  <ScreenSpace :depth="15">
    <Text3D
      ref="backgroundText"
      :size="1.6"
      :height="0"
      :position="[0, 2.5, 5]"
      font="/fonts/Spectral SC_Regular.json"
      text="Carcassonne"
      :center="true"
      :need-updates="true"
      v-if="!page.title"
    >
      <TresMeshStandardMaterial color="#000000" />
    </Text3D>
  </ScreenSpace>
  <primitive :object="scene" :scale="0.01"></primitive>
</template>

<script setup lang="ts">
import { Text3D, useGLTF } from "@tresjs/cientos";
import { useTexture } from "@tresjs/core";
import * as THREE from "three";
const { page } = useContent();
const backgroundText = ref();

const { scene } = await useGLTF(
  "/cite-carcassonne-export/cite-carcassonne.gltf",
  { draco: true }
);

const { alphaMap } = await useTexture({ alphaMap: "/alpha-map.png" });
const emit = defineEmits(["select"]);

const material = new THREE.MeshStandardMaterial({ color: "#e2e2e2" });
material.onBeforeCompile = (shader) => {
  shader.uniforms.alphaTexture = {
    value: alphaMap,
  };
  shader.vertexShader = `
    varying vec2 vUv;
    varying vec3 vPosition;
    ${shader.vertexShader}
  `.replace(
    `#include <uv_vertex>`,
    `#include <uv_vertex>
      vUv = uv;
      vPosition = (modelMatrix * vec4(position, 1.0)).xyz;
    `
  );

  shader.fragmentShader = `
        uniform sampler2D alphaTexture;
        varying vec3 vPosition;

        ${shader.fragmentShader}
      `.replace(
    `#include <dithering_fragment>`,
    `
          // Calcul des coordonnées de la texture alpha
          vec2 textureCoords = (vPosition.xz * 0.150) + 0.5;
          vec4 textureColor = texture2D(alphaTexture, textureCoords);
          float alpha = textureColor.a;

          // Appliquer l'alpha de la texture externe sans toucher à la couleur ou à la texture
          gl_FragColor.a *= alpha;

          #include <dithering_fragment>
        `
  );
};

scene.traverse((el: any) => {
  if (el.isMesh) {
    el.material = material;
  }
});

const { camera } = useTresContext();

const { onLoop } = useRenderLoop();
onLoop(() => {
  if (camera.value && backgroundText.value) {
  }
});
</script>
