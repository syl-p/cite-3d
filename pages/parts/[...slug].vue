<template>
  <section class="font-serif transition-all snap-y snap-mandatory">
    <div
      class="bg-[#fdfcf5] fixed w-full h-full transition-all -z-10"
      :style="{ opacity: scrollOverHeaderPourcent / 100 }"
    ></div>
    <header class="h-[150vh] snap-start relative w-full transition-all" 
      ref="headerRef">
      <div
        v-show="scrollOverHeaderPourcent < 60"
        class="fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 h-screen w-full flex flex-col justify-center items-center"
      >
        <div class="flex-1">
        </div>

        <div>
          <a @click.stop="scrollToContent" class="block text-2xl uppercase font-bold mb-5">En savoir plus</a>
          <div class="mx-auto text-center w-full pb-12">
            <svg
              class="mx-auto"
              width="24"
              height="24"
              xmlns="http://www.w3.org/2000/svg"
              fill-rule="evenodd"
              clip-rule="evenodd"
            >
              <path
                d="M11 21.883l-6.235-7.527-.765.644 7.521 9 7.479-9-.764-.645-6.236 7.529v-21.884h-1v21.883z"
              />
            </svg>
          </div>
        </div>
      </div>
    </header>
    <article
      id="content"
      class="z-10 snap-start"
    >
      <div class="py-20 px-8 flex flex-col justify-center items-center container mx-auto">
        <h1 class="font-spectral text-4xl lg:text-8xl">{{ page.title }}</h1>
        <p class="mb-6">{{ page.description }}</p>
      </div>

      <ContentDoc />

      <footer class="flex justify-between py-20 px-8 container mx-auto">
        <NuxtLink v-if="prev" :to="prev._path">
          Précédent
        </NuxtLink>
        <NuxtLink v-if="next" :to="next._path">
          Suivant
        </NuxtLink>
      </footer>
    </article>
  </section>
</template>

<script setup lang="ts">
const { prev, next, page } = useContent();
import { useWindowScroll } from "@vueuse/core";
const { y } = useWindowScroll();
const headerRef: Ref<HTMLElement | null> = ref(null);
const scrollOverHeaderPourcent = ref(0);

const backToMap =  async () => {
  await navigateTo('/parts')
}

const scrollToContent = () => {
  y.value = headerRef.value.scrollHeight
}

watch(y, (newValue) => {
  if (headerRef.value) {
    const value = (newValue / headerRef.value.scrollHeight) * 100;
    const pourcent = Math.min(Math.max(value, 0), 100);
    scrollOverHeaderPourcent.value = Math.round(pourcent);
  }
});
</script>
