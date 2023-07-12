import { ref } from 'vue'
import { defineStore } from 'pinia'


export const useUidStore = defineStore('uid', () => {

    const user = ref()
    const username = ref()
    const uid = ref()

    return { uid, user, username }
})

    //TODO: pinia persistent store to save login 
