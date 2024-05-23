<script setup>
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useTaskStore } from '@/stores/tasks'; 
import { useUserStore } from '@/stores/user';

const taskTitle = ref('');
const taskDescription = ref('');
const taskTag = ref('');
const taskArea = ref('');
const isShown = ref(false);
const taskStore = useTaskStore();
const userStore = useUserStore();
const { user } = storeToRefs(userStore);

const taskDate = new Date();

const padToTwoDigits = (num) => String(num).padStart(2, '0');

const day = padToTwoDigits(taskDate.getDate());
const month = padToTwoDigits(taskDate.getMonth() + 1);
const year = taskDate.getFullYear();

const formattedDate = `${year}-${month}-${day}`;

async function handleAddTask() {
    if (!user.value.id) {
        alert('Error: No se pudo obtener el ID del usuario. Por favor, asegúrate de estar logueado.');
        return;
    }

    if (taskTitle.value.length > 30) {
        alert('El título es demasiado largo, no puedes superar las 30 palabras');
    } else if (taskTitle.value.length < 3) {
        alert('El título es demasiado corto, necesitas más de 3 palabras');
    } else if (taskDescription.value.length < 10) {
        alert('La descripción es demasiado corta, necesitas más de 10 palabras');
    } else if (taskDescription.value.length > 150) {
        alert('La descripción es demasiado larga, no puedes superar las 150 palabras');
    } else if (!taskTag.value.includes('#') || taskTag.value.includes(' ')) {
        alert('Necesitas incluir # al principio del tag y no puedes añadir espacios. Un solo tag por card');
    } else if (taskArea.value == '' || taskArea.value.length < 1) {
        alert('Necesitas seleccionar la area de trabajo de tu card');
    } else {
        try {
            await taskStore.pushTask({
                title: taskTitle.value,
                description: taskDescription.value,
                tag: taskTag.value,
                area: taskArea.value,
                inserted_at: formattedDate,
                user_id: user.value.id
            });

            if (user.value) {
                await taskStore.fetchTasks(user.value.id); 
            }

            alert("¡Tarea creada con éxito!");
            isShown.value = false;
            taskTitle.value = '';
            taskDescription.value = '';
            taskTag.value = '';
            taskArea.value = '';
        } catch (error) {
            alert(error.message);
        }
    }
}
</script>

<template>
    <div id="add-task-container">
        <button @click="isShown = true">
            <img src="../assets/add-task-icon.png" alt="Add Task Icon">
        </button>
    </div>
    <div v-if="isShown" id="modal-new-task-wrapper">
        <div id="modal-new-task">
            <h4>Añade una nueva tarea en tu board</h4>
            <form @submit.prevent="handleAddTask">
                <input v-model="taskTitle" type="text" placeholder="Escribe un título a tu card">
                <textarea v-model="taskDescription" placeholder="Describe yourself here..."></textarea>
                <input v-model="taskTag" type="text" placeholder="Escribe '#' y el tag identificador">
                <label for="area-of-work">ESTADO DE LA CARD:</label>
                <select v-model="taskArea" id="area-of-work" name="areas">
                    <option value="Backlog">BACKLOG</option>
                    <option value="Commited">COMMITED</option>
                    <option value="To do">TO DO</option>
                    <option value="Doing">DOING</option>
                    <option value="Done">DONE</option>
                </select>
                <div>
                    <button type="submit">Crear nueva tarea</button>
                    <button @click.prevent="isShown = false">Cancelar</button>
                </div>
            </form>
        </div>
    </div>
</template>


<style>

    #modal-new-task-wrapper {
        background-color: rgba(0, 0, 0, 0.3);
        backdrop-filter: blur(2px);
        height: 100vh;
        justify-content: center;
        align-content: center;
        align-items: center;
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        z-index: 1000; 
        display: flex;
    }

    #modal-new-task {
        max-width: 640%;
        min-width: 640px;
        border-radius: 10px;
        background-color: #fff;
        padding:20px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-content: center;
        align-items: center;
        height: 500px;
        gap: 30px;
        box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
        border-top: 20px solid rgba(59,126,195,1);
        border-bottom: 20px solid rgba(59,126,195,1);;
    }

    #modal-new-task h4 {
        font-size: 28px;
    }

    #modal-new-task form {
        display: flex;
        flex-direction: column;
        max-width: 300px;
        text-align: center;
        justify-content: center;
        align-items: center;
        gap: 15px;
    }
    
    #modal-new-task form input{
        border: none;
        border-radius: 20px;
        background-color: #f8f8f8;
        height: 30px;
        text-align: center;
        width: 400px;
    
    }
    
    #modal-new-task form input:focus {
        outline: none;
        border: 3px solid rgba(59,126,195,1);
        background-color: rgb(239, 247, 255);
    
      }
      
    
    #modal-new-task form button{
        height: 45px;
        width: 200px;
        border: none; 
        border-radius: 20px;
        margin-top: 20px;
        background: rgb(59,126,195);
        background: linear-gradient(32deg, rgba(59,126,195,1) 33%, rgba(0,212,255,1) 100%);
        color: white;
        font-weight: bolder;
        letter-spacing: 3px;
        height: 40px;
    }

    #modal-new-task form button:hover{
        background: rgb(59,126,195);
        background: linear-gradient(32deg, rgb(34, 89, 145) 33%, rgb(61, 129, 143) 100%);
    }

    #modal-new-task form button:nth-of-type(2){
        height: 45px;
        width: 200px;
        border: none; 
        border-radius: 20px;
        margin-top: 20px;
        background: crimson;
        background: crimson;
        color: white;
        font-weight: bolder;
        letter-spacing: 3px;
        height: 40px;
    }

    #modal-new-task form button:nth-of-type(2):hover{
        height: 45px;
        width: 200px;
        border: none; 
        border-radius: 20px;
        margin-top: 20px;
        background: crimson;
        background: rgb(129, 10, 34);
        color: white;
        font-weight: bolder;
        letter-spacing: 3px;
        height: 40px;
    }

    #modal-new-task form div {
        display: flex;
        flex-direction: row;
        gap: 30px;
    }

    #add-task-container {
        position: fixed;
        bottom: 50px;
        right: 50px;

    }

    #add-task-container button {
        border-radius: 200px;
        background-color: cornflowerblue;
        padding: 20px;
        border: none;
        box-shadow: rgba(149, 157, 165, 0.6) 0px 0px 16px;
    }

    #add-task-container button:hover {
        background-color: rgb(53, 97, 179);
    }
    
    #add-task-container button:active {
        background-color: rgb(27, 57, 114);
        padding: 15px;
    }

    select {
        border: none;
        border-radius: 20px;
        background-color: #f8f8f8;
        height: 30px;
        text-align: center;
        width: 400px;
    }

    select:focus {
        outline: none;
        border: 3px solid rgba(59,126,195,1);
        background-color: rgb(239, 247, 255);
        font-family: Work Sans;
    }

    label{
        margin-top: 20px;
        font-weight: 500;
    }

    textarea{
        border: none;
        border-radius: 20px;
        background-color: #f8f8f8;
        height: 100px;
        text-align: center;
        width: 400px;
        font-family: Work Sans;
        display: flex;
    }

    textarea:focus {
        outline: none;
        border: 3px solid rgba(59,126,195,1);
        background-color: rgb(239, 247, 255);
        font-family: Work Sans;
    }

    





</style>