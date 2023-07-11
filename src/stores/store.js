import { ref } from 'vue'
import { defineStore } from 'pinia'


export const useUidStore = defineStore('uid', () => {

    const user = ref()
    const uid = ref()

    return { uid, user }
})

    //TODO: pinia persistent store to save login 
