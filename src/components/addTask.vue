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

        <div class="mb-3">
            <label class="form-label">Due Date</label>
            <flat-pickr class="form-control form-control-sm" v-model="taskDueDate" :config="flatpickrConfig"></flat-pickr>
        </div>

        <div class="mb-3">
            <label class="form-label">Remind Date</label>
            <flat-pickr class="form-control form-control-sm" v-model="taskRemind" :config="flatpickrConfig"></flat-pickr>
        </div>

        <label class="form-label">Priority</label>
        <div>
            <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="none"
                    v-model="taskPriority" checked>
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
            <input class="form-control" type="file" id="formFile" ref="file">
        </div>

    </div>
</template>

<script setup>
import { ref, defineExpose, defineEmits, watch } from 'vue'
import { addTaskToDb } from './firebase/firestoredb'
import FlatPickr from 'vue-flatpickr-component';
import 'flatpickr/dist/flatpickr.css';
import { saveFile, downloadURL } from './firebase/storage';

const flatpickrConfig = {
    altInput: true,
    altFormat: 'h:i K   D\\, M j\\, Y',
    wrap: true,
    clickOpens: true,
    allowInput: false,
    enableTime: true,
    // hour:minute(24h) date/month/year
    dateFormat: 'H:i j\\/n\\/Y',
    minDate: 'today',
};

const taskName = ref(null)
const taskDescription = ref(null)
const taskDueDate = ref(null)
const taskRemind = ref(null)
const taskPriority = ref('none')
const taskFile = ref(null)
const taskFileIsImage = ref(false)
const taskFinish = ref(false)



const file = ref()
let selectedfile = null
const saveTask = async () => {
    selectedfile = null
    if (!!file.value.files[0]) {
        selectedfile = file.value.files[0];
    
        await saveFile(selectedfile)
        if (selectedfile.type === 'image/jpeg' || selectedfile.type === 'image/png') {
            taskFileIsImage.value = true
        }
        taskFile.value = downloadURL
    }




    const task = {
        name: taskName.value,
        description: taskDescription.value,
        dueDate: taskDueDate.value,
        remindDate: taskRemind.value,
        priority: taskPriority.value,
        file: taskFile.value,
        fileIsImage: taskFileIsImage.value,
        finished: taskFinish.value
    }
    addTaskToDb(task)

    taskName.value = null
    taskDescription.value = null
    taskDueDate.value = null
    taskRemind.value = null
    taskPriority.value = 'none'
    taskFile.value = null
    taskFileIsImage.value = false
    taskFinish.value = false
}

const isDisabled = defineEmits(['switch'])

watch(taskName, (newName) => {
    if (!!newName && !(/^\s*$/.test(newName))) {
        isDisabled('switch', false);
    } else {
        isDisabled('switch', true);
    }
})


defineExpose({
    saveTask, taskName
})

</script>
