<script>
    import { ref } from 'vue';

    const taskTitle = ref('');
    const taskDescription = ref('');
    const taskTag = ref('');
    const taskArea = ref('');
</script>

<template>
<div id="modal-new-task-wrapper">
    <div id="modal-new-task">
        <h4>Añade una nueva tarea en tu board</h4>
        <form>
            <input v-model='taskTitle' type="text" placeholder="Escribe un título a tu card">
            <textarea v-model='taskDescription'  type="text"  placeholder="Describe yourself here..."></textarea>
            <input v-model='taskTag' type="text" placeholder="Escribe '#' y el tag identificador">
            <label for="area-of-work">ESTADO DE LA CARD:</label>
            <select v-model='taskArea' id="area-of-work" name="areas">
                <option value="Backlog">selecciona una opción</option>
                <option value="Backlog">BACKLOG</option>
                <option value="Commited">COMMITED</option>
                <option value="To do">TO DO</option>
                <option value="Doing">DOING</option>
                <option value="Done">DONE</option>
            </select>
            <div>
                <button type="submit">Crear nueva tarea</button>
                <button>Cancelar</button>
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