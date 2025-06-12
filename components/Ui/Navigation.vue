<template>

  <OnClickOutside @trigger="closeModal">
    <div class="relative">
      <button @click="open = !open"
        class="py-3 px-4 inline-flex items-center gap-x-2 font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-2xs hover:bg-gray-50 focus:outline-hidden focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
        type="button">
        {{page.title || 'Selection'}}
        <svg class="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"/>
        </svg>
      </button>

      <!-- Dropdown menu -->
      <div id="dropdown" :class="{hidden: !open}" class="absolute right-0 z-10 mt-4 min-w-56 bg-white rounded-md ring-1 ring-black ring-opacity-5 shadow-lg origin-top-right focus:outline-none">
          <ul class="text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
            <li v-for="(p, index) of pages" :key="index" :class="page.title == p.title ? 'bg-yellow-500': ''">
              <NuxtLink
                :to="p._path"
                @click="closeModal" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                {{ p.title }}
              </NuxtLink>
            </li>
          </ul>
      </div>
    </div>
  </OnClickOutside>
</template>

<script setup lang="ts">
const target = useTemplateRef<HTMLElement>('target')
import { OnClickOutside } from '@vueuse/components'
const { pages } = defineProps(["pages"]);
const {page} = useContent()
const open = ref(false)

const closeModal = () => {
  open.value = false
}
</script>
