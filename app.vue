<template>
  <main class="relative h-fit font-serif text-lg">
    <client-only>
      <div v-if="state === 'intro' && universeLoaded" class="fixed top-0 left-0 w-full h-screen flex flex-col justify-center items-center -z-[100]">
        <h1 class="text-[70px] md:text-[100px] xl:text-[160px] uppercase font-bold font-spectral">Carcassonne</h1>
      </div>
    </client-only>

    <client-only>
      <div class="h-screen w-full fixed top-0 left-0 -z-10">
        <TresCanvas
          v-bind="gl"
          window-size
          shadows
        >
          <Experience />
        </TresCanvas>
      </div>
    </client-only>

    <client-only>
      <header class="z-50 p-8 fixed flex justify-between top-0 left-0 w-full">
        <div>
          <NuxtLink to="/parts" class="uppercase font-spectral flex space-x-3 items-center">
            <span v-if="state == 'page' " class="block p-2 bg-yellow-500 text-white font-bold">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="m18.75 4.5-7.5 7.5 7.5 7.5m-6-15L5.25 12l7.5 7.5" />
              </svg>
            </span>
            <span class="hidden md:block">
              Cité<br />
              de <span class="font-bold">Carcassonne</span>
            </span>
          </NuxtLink>
        </div>
        <div class="flex-1 text-right">
          <UiNavigation :pages="data" />
        </div>
      </header>
    </client-only>

    <NuxtPage />

    <client-only>
      <div class="absolute w-full h-screen top-0 left-0 z-[1000]" v-if="!universeLoaded">
          <div
            class="flex h-full w-full flex-col items-center justify-center bg-white"
          >
            <p>Chargement de la carte...</p>
          </div>
      </div>
    </client-only>

    <NuxtLink v-if="state === 'intro'" to="/parts" class="fixed bottom-10 left-1/2 -translate-x-1/2 border block z-50 font-bold text-2xl uppercase p-2">
      Exploration
    </NuxtLink>
  </main>
</template>

<script setup lang="ts">
import { NoToneMapping, PCFSoftShadowMap, SRGBColorSpace } from "three";
import {useApplicationStore} from '@/stores/application'
const applicationStore = useApplicationStore()
const {setState} = applicationStore
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
