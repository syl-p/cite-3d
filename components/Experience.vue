<template>
  <TresPerspectiveCamera :args="[60, 1, 0.1, 1000]" :position="new THREE.Vector3(3.5, -0.1, 0)" />
  <!-- <OrbitControls
    :make-default="true"
    :enableDamping="false"
    :enablePan="false"
    :enableZoom="false"
    :max-polar-angle="Math.PI * 0.4"
  /> -->
  <TresAmbientLight :intensity="1.5" />
  <TresDirectionalLight cast-shadow :position="[4, 5, 3]" :intensity="1" />
  <Suspense
    @resolve="
      () => {
        loaded = true;
      }
    ">
    <Carcassonne />
  </Suspense>
</template>

<script setup lang="ts">
import { Html } from "@tresjs/cientos";
import * as THREE from "three";
const applicationStore = useApplicationStore()
const {state} = storeToRefs(applicationStore)
const {setState, setLoaded} = applicationStore
const loaded = ref<Boolean>(false);

usePageLocalisation(loaded);
const { page } = useContent()


watchEffect(() => {
  if(page.value) {
    if(page.value._path !== '/parts') {
      if(page.value.title !== '') {
        setState('page')
      } else {
        setState('intro')
      }
    } else {
      setState('exploration')
    }
    console.log(state.value, page.value._path)
  }

  setLoaded(loaded.value)
})

</script>
