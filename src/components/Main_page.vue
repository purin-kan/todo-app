<template>
    <div>
        <div class="row">
            <h2>{{ useUidStore().username }}'s ToDo List</h2>
        </div>

        <div class="row" v-if="addingTask || editingTask">
            <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
                aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="staticBackdropLabel">{{ addingTask ? 'Add' : 'Edit' }} Task
                            </h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"
                                @click="doneWithModal()"></button>
                        </div>
                        <div class="modal-body">
                            <addTask ref="rSave" @switch="switchDisabled" />
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-danger" data-bs-dismiss="modal"
                                @click="doneWithModal()">Cancel</button>
                            <button type="button" class="btn btn-success" :disabled="isDisabled" data-bs-dismiss="modal"
                                @click="addingTask ? saveData() : saveEdit()">Save {{ addingTask ? '' : 'Edit' }}</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="row mt-3">
            <div class="col-2 rounded pt-1 bg-info text-center" style="--bs-bg-opacity: .7;" data-bs-toggle="modal"
                data-bs-target="#staticBackdrop" @click="addTaskClicked()">
                add task
            </div>

            <div class="col-10">
                <div class="row">
                    <div v-if="addingTask">
                    </div>
                </div>
                <div class="row">
                    <div class="col-4">
                        <div class="ms-2">
                            <h5 class="">Taskname</h5>
                        </div>
                    </div>
                    <div class="col-8" v-if="!showDetails">
                        <h5 class="ms-4">Description</h5>
                    </div>
                </div>
            </div>

        </div>



        <div class="row mt-2">

            <div class="col-2">
                <div class="row rounded  p-2 mt-2 bg-warning" style="--bs-bg-opacity: .5;" v-for="sort in sortBy">
                    <span class="text-center text-break" @click="fetchData(sort), hideDetailTab()">{{ sort.name }}</span>
                </div>
                <div class="row rounded p-2 mt-5 bg-danger text-white" @click="signOutClicked()">
                    <span class="text-center">Sign-out</span>
                </div>
            </div>

            <div :class="[columnLength]">
                <div class="row rounded p-3 ms-1 mt-2 bg-dark-subtle" v-for="task in tasks" @click="taskClicked(task)">
                    <div :class="[taskNameColumnLength]">
                        <span class="text-break" :class="task.finished == true ? 'text-decoration-line-through' : ''"
                            v-if="task.priority == 'none'">{{ task.name }}</span>
                        <h5 class="text-break" :class="task.finished == true ? 'text-decoration-line-through' : ''"
                            v-if="task.priority == 'low'">{{ task.name }}</h5>
                        <h4 class="text-break" :class="task.finished == true ? 'text-decoration-line-through' : ''"
                            v-if="task.priority == 'med'">{{ task.name }}</h4>
                        <h3 class="text-break" :class="task.finished == true ? 'text-decoration-line-through' : ''"
                            v-if="task.priority == 'high'">{{ task.name }}</h3>
                    </div>
                    <div class="col-8" v-if="!showDetails">
                        {{ task.description }}
                    </div>
                    <!-- {{ task }} -->
                </div>
            </div>

            <div class="col-6 mt-2" v-if="showDetails == true">
                <div class="card p-3 bg-light">
                    <div class="row mb-3 justify-content-center" v-if="showMenu">
                        <button class="col-3 btn btn-outline-secondary text-center"
                            @click="editClicked(selectedTaskDetails)" data-bs-toggle="modal"
                            data-bs-target="#staticBackdrop">
                            Edit
                        </button>
                        <button class="col-3 btn btn-outline-danger text-center ms-2 me-1"
                            @click="deleteTask(selectedTaskDetails.taskId)">
                            Delete
                        </button>
                        <button class="col-2 btn btn-outline-success text-center me-2 ms-1"
                            v-if="!selectedTaskDetails.finished" @click="markTask(selectedTaskDetails.taskId, true)">
                            ✓
                        </button>
                        <button class="col-2 btn btn-outline-danger text-center" v-if="selectedTaskDetails.finished"
                            @click="markTask(selectedTaskDetails.taskId, false)">
                            ✗
                        </button>
                    </div>
                    <div class="row">
                        <div class="col-9">
                            <h2 :class="selectedTaskDetails.finished == true ? 'text-decoration-line-through' : ''">{{
                                selectedTaskDetails.name }}</h2>
                        </div>
                        <div class="col-3">
                            <div class="p-1 text-center rounded bg-secondary-subtle" @click="menuToggle()">☰</div>
                        </div>
                    </div>

                    <p>{{ selectedTaskDetails.description }}</p>
                    <span v-if="!!selectedTaskDetails.dueDate"><strong>Due Date:</strong> {{ selectedTaskDetails.dueDate
                    }}</span>
                    <span v-if="!!selectedTaskDetails.remindDate"><strong>Reminder:</strong> {{
                        selectedTaskDetails.remindDate }}</span>
                    <span v-if="selectedTaskDetails.priority != 'none'"><strong>Priority:</strong> {{
                        selectedTaskDetails.priority }}</span>
                    <br>
                    <div>
                        <a v-if="!!selectedTaskDetails.file" class="btn btn-outline-dark btn-sm"
                            :href="[selectedTaskDetails.file]" target="_blank">Download File</a>
                        <img v-if="selectedTaskDetails.isImage" :src="selectedTaskDetails.file"
                            class="img-fluid text-center rounded mt-3">
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import addTask from './addTask.vue'
import { useUidStore } from '../stores/store';
import { tasks, setTaskStatus, deleteTaskFromDb, fetchData } from './firebase/firestoredb'
import { signOut } from './firebase/auth'
import { useRouter } from "vue-router"
const router = useRouter()

const sortBy = ref([
    { name: 'Recent', keySort: 'timestamp', sortBy: 'desc', type: 'sort' },
    { name: 'Old', keySort: 'timestamp', sortBy: 'asc', type: 'sort' },
    { name: 'Due', keySort: 'dueDate', sortBy: 'asc', type: 'sort' },
    { name: 'Remind', keySort: 'remindDate', sortBy: 'asc', type: 'sort' },
    { name: '!', keySort: 'priority', value: 'low', type: 'where' },
    { name: '!!', keySort: 'priority', value: 'med', type: 'where' },
    { name: '!!!', keySort: 'priority', value: 'high', type: 'where' },
    { name: 'HasFile', keySort: 'file', type: 'file' },
])

let columnLength = ref("col-10")
let taskNameColumnLength = ref("col-4")
let showDetails = false
const selectedTaskDetails = ref()
const taskClicked = (task) => {
    if (selectedTaskDetails.value == task) {
        hideDetailTab()
    } else {
        taskNameColumnLength.value = "col-12"
        columnLength.value = "col-4"
        showDetails = true

        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });

        selectedTaskDetails.value = task
    }
    showMenu.value = false
}

const hideDetailTab = () => {
    columnLength.value = "col-10"
    taskNameColumnLength.value = "col-4"
    showDetails = false

    selectedTaskDetails.value = null
}


const showMenu = ref(false)
const menuToggle = () => {
    showMenu.value = !showMenu.value
}

const markTask = (taskId, status) => {
    setTaskStatus(taskId, status)
    hideDetailTab()
}

const deleteTask = (taskId) => {
    deleteTaskFromDb(taskId)
    hideDetailTab()
}


let addingTask = ref(false)
const addTaskClicked = () => {
    addingTask.value = true
}
const doneWithModal = () => {
    addingTask.value = false
    editingTask.value = false
}

const rSave = ref()
const isDisabled = ref(true)
const saveData = () => {
    rSave.value.saveTask()
    doneWithModal()
}
const switchDisabled = (val) => {
    isDisabled.value = val
}
const editingTask = ref(false)
const editClicked = (taskDetail) => {
    editingTask.value = true
    rSave.value.editTask(taskDetail)
}
const saveEdit = () => {
    rSave.value.saveEdit()
    editingTask.value = false
    hideDetailTab()
}


const signOutClicked = async () => {
    await signOut()
    router.push('/')
}


</script>