import { ref, computed } from 'vue'
import { defineStore } from 'pinia'


export const useApplicationStore = defineStore('application', () => {

    const universeLoaded: Ref<Boolean> = ref(false)
    const state: Ref<'intro' | 'exploration' | 'page'> = ref('intro')

    function setState(value: 'intro' | 'exploration' | 'page')  {
        state.value = value
    }

    function setLoaded(bool: boolean) {
        universeLoaded.value = bool
    }

    return { state, universeLoaded, setLoaded, setState }
})