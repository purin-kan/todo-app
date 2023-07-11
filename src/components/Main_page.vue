<template>
    <div>
        <div class="row">
            <h2>{{ username }}'s ToDo List</h2>
        </div>

        <div class="row" v-if="addingTask">
            <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
                aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="staticBackdropLabel">Add Task</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <addTask />
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Cancel</button>
                            <button type="button" class="btn btn-success">Save</button>
                            <!-- TODO save add task form data from addTask to firestoredb -->
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="row mt-3">
            <div class="col-2 bg-info text-center" data-bs-toggle="modal" data-bs-target="#staticBackdrop"
                @click="addTaskClicked()">
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
                <div class="row p-3 mt-2 bg-dark-subtle" v-for="i in 3">
                    <!-- TODO sort data, add the different document -->
                    sort by {{ i }}
                </div>
            </div>

            <div :class="[columnLength]">
                <div class="row p-3 ms-1 mt-2 bg-dark-subtle" v-for="i in 9" @click="taskClicked(i)">
                    <div :class="[taskNameColumnLength]">
                        <!-- TODO show data from db -->
                        taskname: verylongname
                    </div>
                    <div class="col-8" v-if="!showDetails">
                        <!-- TODO show description from db -->
                        task description:
                    </div>
                </div>
            </div>

            <div class="col-6 mt-2" v-if="showDetails == true">
                <div class="card p-3 bg-light">
                    <!-- TODO show data details -->
                    <!-- TODO figure out how to display file/image -->

                    task_name : 'task_name',
                    task_description : 'task_description',
                    file : object,
                    due_date : datetimeString,
                    remind_date : datetimeString,
                    priority : 'low, med, high',
                    status : 'checked, not_checked,
                    <br>
                    picture

                </div>
            </div>

        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import addTask from './addTask.vue'
import { useUidStore } from '../stores/store';

const username = ref(useUidStore().user.displayName)

let columnLength = ref("col-10")
let taskNameColumnLength = ref("col-4")
let showDetails = false
const taskClicked = (i) => {
    taskNameColumnLength = "col-12"
    columnLength.value = "col-4"
    showDetails = true
}


let addingTask = ref(false)
const addTaskClicked = () => {
    addingTask.value = true
}


</script>

<style>
body {
    display: block;
    background-color: whitesmoke;
    text-align: start;
    align-items: flex-start;

}
</style>