<template>
    <div>
        <h1>Todo</h1>
        <h6>A simple todo app, similar to Microsoft ToDo.</h6>
        <p>1-week project <br> Made during an internship at BeNeat <br> 12 June 2023 - 18 July 2023</p>
        <br> <br>

        <h6>Please sign-in to continue</h6>
        <button class="btn btn-info mt-1" @click="signIn()">Google sign-in</button>
    </div>
</template>
<script setup>
import { authentication } from '../components/firebase/auth'
import { findAccount } from '../components/firebase/firestoredb'
import { useRouter } from "vue-router"

const router = useRouter()


const signIn = async () => {
    await authentication()
    await findAccount()
    router.push('/main')
}


</script>