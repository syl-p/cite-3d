<template>
  <TresPerspectiveCamera :args="[60, 1, 0.1, 1000]" :position="initialOffset" />
  <OrbitControls
    :make-default="true"
    :enableDamping="false"
    :enablePan="false"
    :enableZoom="false"
    :max-polar-angle="Math.PI * 0.4"
  />
  <TresAmbientLight :intensity="1.5" />
  <TresDirectionalLight cast-shadow :position="[4, 5, 3]" :intensity="1" />
  <Suspense>
    <Carcassonne />
  </Suspense>
</template>

<script setup lang="ts">
import * as THREE from "three";
const initialOffset = new THREE.Vector3(3.5, -0.2, 0);
const applicationStore = useApplicationStore()
const {state} = storeToRefs(applicationStore)

usePageLocalisation(initialOffset);
</script>
