<template>
  <main class="relative h-fit font-serif">
    <TresCanvas
      v-bind="gl"
      window-size
      shadows
      class="fixed top-0 left-0 -z-50 w-full h-screen"
    >
      <Experience @is-moving="(state) => updateState(state)" />
    </TresCanvas>

    <header class="z-50 p-8 fixed flex justify-between top-0 left-0 w-full">
      <div>
        <NuxtLink to="/" class="flex space-x-3">
          <div class="w-10 h-10 bg-yellow-500"></div>
          <div class="uppercase font-spectral">
            Cité<br />
            de <span class="font-bold">Carcassonne</span>
          </div>
        </NuxtLink>
      </div>
      <div></div>
    </header>

    <UiNavigation :pages="data" />
    <NuxtPage />
  </main>
</template>

<script setup lang="ts">
import { NoToneMapping, PCFSoftShadowMap, SRGBColorSpace } from "three";

const { data } = await useAsyncData("parts", () =>
  queryContent("parts").find()
);

const { page } = useContent();

type CameraState = "IDLE" | "MOVING" | "ARRIVED";

const cameraState = ref<CameraState>("IDLE");
const updateState = (state: CameraState) => {
  cameraState.value = state;
  // console.log("test", cameraState.value);
};

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
