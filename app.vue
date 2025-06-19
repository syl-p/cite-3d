<template>
  <main class="relative h-fit font-serif text-lg scroll-smooth" @click="navigateTo('/parts')">
    <div v-if="state === 'intro' && universeLoaded" class="fixed top-0 left-0 w-full h-screen flex flex-col justify-center items-center -z-[100]">
      <h1 class="text-[70px] md:text-[100px] xl:text-[160px] uppercase font-bold font-spectral">Carcassonne</h1>
    </div>

    <TresCanvas
      v-bind="gl"
      window-size
      shadows
      class="fixed top-0 left-0 -z-50 w-full h-screen"
    >
      <Experience />
    </TresCanvas>

    <header class="z-50 p-8 fixed flex justify-between top-0 left-0 w-full">
      <div>
        <NuxtLink to="/" class="flex space-x-3 justify-center items-center">
          <div class="w-10 h-10 bg-yellow-500"></div>
          <div class="uppercase font-spectral">
            Cité<br />
            de <span class="font-bold">{{loaded}}</span>
          </div>
        </NuxtLink>
      </div>
      <div>
        <UiNavigation :pages="data" />
      </div>
    </header>
    <NuxtPage />

    <div class="absolute w-full h-screen top-0 left-0 z-[1000]" v-if="!universeLoaded">
        <div
          class="flex h-full w-full flex-col items-center justify-center bg-white"
        >
          <p>Chargement de la carte...</p>
        </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { NoToneMapping, PCFSoftShadowMap, SRGBColorSpace } from "three";
import {useApplicationStore} from '@/stores/application'
const applicationStore = useApplicationStore()
const {state, universeLoaded} = storeToRefs(applicationStore)

const { data } = useAsyncData("parts", () =>
  queryContent("parts").find()
);

const { page } = useContent();

const gl = {
  alpha: true,
  shadows: true,
  shadowMap: {
    autoUpdate: true,
  },
  shadowMapType: PCFSoftShadowMap,
  outputColorSpace: SRGBColorSpace,
  toneMapping: NoToneMapping,
};
</script>
