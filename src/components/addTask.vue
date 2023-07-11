<template>
    <div>
        <div class="mb-3">
            <label class="form-label">Name</label>
            <input type="text" class="form-control" v-model="taskName">
        </div>

        <label class="form-label">description</label>
        <div class="mb-3 form-floating">
            <textarea class="form-control" v-model="taskDescription"></textarea>
        </div>

        <!-- TODO add date picker to duedate and remind me -->
        <div class="mb-3">
            <label class="form-label">Due Date</label>
            <input type="text" class="form-control" v-model="taskDueDate">
        </div>

        <div class="mb-3">
            <label class="form-label">Remind Date</label>
            <input type="text" class="form-control" v-model="taskRemind">
        </div>

        <label class="form-label">Priority</label>
        <div>
            <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="none"
                    v-model="taskPriority">
                <label class="form-check-label" for="inlineRadio1">None</label>
            </div>
            <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="low"
                    v-model="taskPriority">
                <label class="form-check-label" for="inlineRadio2">!</label>
            </div>
            <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio3" value="med"
                    v-model="taskPriority">
                <label class="form-check-label" for="inlineRadio3">!!</label>
            </div>
            <div class="form-check form-check-inline mb-3">
                <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio4" value="high"
                    v-model="taskPriority">
                <label class="form-check-label" for="inlineRadio4">!!!</label>
            </div>
        </div>

        <div class="mb-3">
            <label class="form-label">File</label>
            <input class="form-control" type="file" v-on:change="taskFile">
        </div>
        
    </div>
</template>

<script setup>
import { ref } from 'vue'

const taskName = ref()
const taskDescription = ref()
const taskDueDate = ref()
const taskRemind = ref()
const taskPriority = ref()
// <!-- TODO upload file to firestore  with file -->
const taskFile = ref()
const taskFinish = ref(false)



</script>