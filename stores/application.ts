import { ref, computed } from 'vue'
import { defineStore } from 'pinia'


export const useApplicationStore = defineStore('application', () => {

    const state: Ref<'intro' | 'exploration'> = ref('intro')

    function setState(value: 'intro' | 'exploration') {
        state.value = value
    }

    return { state, setState }
})