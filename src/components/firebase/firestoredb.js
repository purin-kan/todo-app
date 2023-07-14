import { getFirestore, collection, doc, getDoc, getDocs, setDoc, addDoc, updateDoc, deleteDoc, query, orderBy } from "firebase/firestore";
import { app } from './firebase'
import { useUidStore } from '../../stores/store';
import { ref } from 'vue'

const db = getFirestore(app);

export const findAccount = async () => {

    const docRef = doc(db, "todo", useUidStore().uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        fetchData()
    } else {
        await setDoc(doc(db, "todo", useUidStore().uid), {
            username: useUidStore().user.displayName,
            uid: useUidStore().uid
        });
        console.log('user created');

        const timestamp = new Date();
        const ictTime = new Date(timestamp.getTime() + (7 * 60 * 60 * 1000));
        const taskData = {
            name: 'Add a task!',
            description: 'press the "add task" button',
            dueDate: null,
            remindDate: null,
            priority: 'med',
            file: null,
            isImage: false,
            finished: false,
            timestamp: ictTime.toISOString(),
            taskId: null
        };

        const documentRef = doc(db, 'todo', useUidStore().uid);
        const tasksRef = collection(documentRef, 'tasks');

        const docRef = await addDoc(tasksRef, taskData);
        const taskId = docRef.id;

        await updateDoc(docRef, {
            taskId: taskId
        });


        fetchData()
    }
}


export const tasks = ref([])
export const fetchData = async (sort = null) => {
    tasks.value = []
    const documentRef = doc(db, 'todo', useUidStore().uid);
    let tasksRef = collection(documentRef, 'tasks');



    if (!!sort) {
        const hashmap = new Map();

        hashmap.set('Recent', 'timestamp asc');
        hashmap.set('Oldest', 'timestamp desc');
        hashmap.set('!', 'priority');
        hashmap.set('!!', 'priority');
        hashmap.set('!!!', 'priority');
        hashmap.set('Due Date', 'duedate ascending');
        hashmap.set('Remind Date', 'remind date ascending');
        hashmap.set('HasFile', 'hasfile?');

        const orderByField = hashmap.get(sort);

        if (orderByField === 'timestamp asc') {
            tasksRef = query(tasksRef, orderBy("timestamp", "asc"))
        } else if (orderByField === 'timestamp desc') {
            tasksRef = query(tasksRef, orderBy("timestamp", "desc"))
        } else if (orderByField === '') {
            //more fields here...
        }


    }

    const querySnapshot = await getDocs(tasksRef);
    querySnapshot.forEach((doc) => {
        let task = doc.data();
        tasks.value.push(task);
    });
}


export const addTaskToDb = async (task) => {
    const timestamp = new Date();
    const ictTime = new Date(timestamp.getTime() + (7 * 60 * 60 * 1000));
    const taskData = {
        name: task.name,
        description: task.description,
        dueDate: task.dueDate,
        remindDate: task.remindDate,
        priority: task.priority,
        file: task.file,
        isImage: task.fileIsImage,
        finished: task.finished,
        timestamp: ictTime.toISOString(),
        taskId: null
    };

    const documentRef = doc(db, 'todo', useUidStore().uid);
    const tasksRef = collection(documentRef, 'tasks');

    const docRef = await addDoc(tasksRef, taskData);
    const taskId = docRef.id;

    await updateDoc(docRef, {
        taskId: taskId
    });

    fetchData();
};


export const setTaskStatus = async (taskId, status) => {
    const documentRef = doc(db, 'todo', useUidStore().uid);
    const tasksRef = collection(documentRef, 'tasks');
    const taskDocRef = doc(tasksRef, taskId);

    await updateDoc(taskDocRef, {
        finished: status
    });

    fetchData()
}

export const deleteTaskFromDb = async (taskId) => {
    const documentRef = doc(db, 'todo', useUidStore().uid);
    const tasksRef = collection(documentRef, 'tasks');
    const taskDocRef = doc(tasksRef, taskId);
    await deleteDoc(taskDocRef);
    fetchData()
}

export const editTaskdb = async (taskId, task) => {
    const documentRef = doc(db, 'todo', useUidStore().uid);
    const tasksRef = collection(documentRef, 'tasks');
    const taskDocRef = doc(tasksRef, taskId);


    await updateDoc(taskDocRef, {
        name: task.name,
        description: task.description,
        dueDate: task.dueDate,
        remindDate: task.remindDate,
        priority: task.priority,
        file: task.file,
        isImage: task.fileIsImage
    });

    fetchData()
}