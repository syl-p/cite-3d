<template>
  <section class="mt-20 mb-20 mx-auto container">
    <img :src="`/img/${image}`" class="w-full"/>
  </section>
</template>

<script setup lang="ts">
defineProps(["image"]);
</script>

<style scoped>
section {
  position: relative;
  width: 100%;
}
</style>
