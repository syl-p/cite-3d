<template>
  <section class="mt-20 mb-24" 
    :style="`background-image: url('/img/${image}')`"></section>
</template>

<script setup lang="ts">
  defineProps(['image'])
</script>

<style scoped>
section {
  position: relative;
  width: 100%;
  min-height: 100vh;
  background-position: center;
  background-size: cover;
  -webkit-mask-image: url(assets/img/splash.png);
  background-size: cover;
  background-position: center;
}

</style>
