<script setup>
import { ref, computed } from 'vue';
import { storeToRefs } from 'pinia';
import { useTaskStore } from '@/stores/tasks';
import { useUserStore } from '@/stores/user';

const userStore = useUserStore();
const taskStore = useTaskStore();

const { user } = storeToRefs(userStore);
const { tasks } = storeToRefs(taskStore);

const isShown = ref(false);

const taskTitleEdit = ref('');
const taskDescriptionEdit = ref('');
const taskTagEdit = ref('');
const taskAreaEdit = ref('');

const selectedTaskId = ref(null); 
const selectedTask = ref(null);

const doingTaskArea = 'Doing';

const doingTasks = computed(() => {
  return tasks.value ? tasks.value.filter(task => task.area === doingTaskArea) : [];
});

const fetchTasksForUser = async () => {
  if (user.value) {
    await taskStore.fetchTasks(user.value.id);
  }
};

const handleUpdateTaskArea = async (taskId, task) => {
  try {
    task.is_complete = !task.is_complete;
    task.area = task.is_complete ? 'Done' : doingTaskArea;
    await taskStore.updateTask(taskId, task);
    await fetchTasksForUser();
  } catch (error) {
    console.error('Error updating task:', error);
  }
};

const handleDeleteTask = async (taskId) => {
  try {
    await taskStore.deleteTask(taskId);
    await fetchTasksForUser();
  } catch (error) {
    console.error('Error deleting task:', error);
  }
};

const openEditModal = (task) => {
  isShown.value = true;
  selectedTaskId.value = task.id;
  selectedTask.value = task;
  taskTitleEdit.value = task.title;
  taskDescriptionEdit.value = task.description;
  taskTagEdit.value = task.tag;
  taskAreaEdit.value = task.area;
};

const handleEditTask = async () => {
  const taskId = selectedTaskId.value;
  const task = selectedTask.value;

  if (taskTitleEdit.value.length > 30) {
    alert('El título es demasiado largo, no puedes superar las 30 palabras');
  } else if (taskTitleEdit.value.length < 3) {
    alert('El título es demasiado corto, necesitas más de 3 palabras');
  } else if (taskDescriptionEdit.value.length < 10) {
    alert('La descripción es demasiado corta, necesitas más de 10 palabras');
  } else if (taskDescriptionEdit.value.length > 150) {
    alert('La descripción es demasiado larga, no puedes superar las 150 palabras');
  } else if (!taskTagEdit.value.includes('#') || taskTagEdit.value.includes(' ')) {
    alert('Necesitas incluir # al principio del tag y no puedes añadir espacios. Un solo tag por card');
  } else if (taskAreaEdit.value == '' || taskAreaEdit.value.length < 1) {
    alert('Necesitas seleccionar la area de trabajo de tu card');
  } else {
    if (!user.value.id) {
      alert('Error: No se pudo obtener el ID del usuario. Por favor, asegúrate de estar logueado.');
      return;
    }
    try {
      task.title = taskTitleEdit.value;
      task.description = taskDescriptionEdit.value;
      task.tag = taskTagEdit.value;
      task.area = taskAreaEdit.value;
      await taskStore.updateTask(taskId, task);
      await fetchTasksForUser();
      isShown.value = false; // Cerrar el modal después de actualizar la tarea
    } catch (error) {
      console.error('Error updating task:', error);
    }
  }
};
</script>

<template>
  <div v-if="isShown" id="modal-edit-task-wrapper">
    <div id="modal-edit-task">
      <h4>Edita la tarea</h4>
      <form @submit.prevent="handleEditTask">
        <input v-model="taskTitleEdit" type="text" placeholder="Escribe un título a tu card">
        <textarea v-model="taskDescriptionEdit" placeholder="Describe yourself here..."></textarea>
        <input v-model="taskTagEdit" type="text" placeholder="Escribe '#' y el tag identificador">
        <label for="area-of-work">ESTADO DE LA CARD:</label>
        <select v-model="taskAreaEdit" id="area-of-work" name="areas">
          <option value="Backlog">BACKLOG</option>
          <option value="Commited">COMMITED</option>
          <option value="To do">TO DO</option>
          <option value="Doing">DOING</option>
          <option value="Done">DONE</option>
        </select>
        <div>
          <button type="submit">Actualizar</button>
          <button @click.prevent="isShown = false">Cancelar</button>
        </div>
      </form>
    </div>
  </div>
  
  <div class="task-card" v-for="task in doingTasks" :key="task.id">
    <div class="task-card-title">
      <h4>{{ task.title }}</h4>
    </div>
    <div class="task-card-data">
      <p>{{ task.description }}</p>
    </div>
    <div class="task-card-tags">
      <p>{{ task.inserted_at }}</p>
      <span>{{ task.tag }}</span>
    </div>
    <div class="task-card-actions">
      <button @click="handleUpdateTaskArea(task.id, task)"></button>
      <button @click.prevent="openEditModal(task)"></button>
      <button @click="handleDeleteTask(task.id)"></button>
    </div>
  </div>
</template>

<style scoped>
#modal-edit-task-wrapper {
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

#modal-edit-task {
  max-width: 640px;
  min-width: 640px;
  border-radius: 10px;
  background-color: #fff;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  align-items: center;
  height: 500px;
  gap: 30px;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  border-top: 20px solid rgba(59,126,195,1);
  border-bottom: 20px solid rgba(59,126,195,1);
}

#modal-edit-task h4 {
  font-size: 28px;
}

#modal-edit-task form {
  display: flex;
  flex-direction: column;
  max-width: 300px;
  text-align: center;
  justify-content: center;
  align-items: center;
  gap: 15px;
}

#modal-edit-task form input {
  border: none;
  border-radius: 20px;
  background-color: #f8f8f8;
  height: 30px;
  text-align: center;
  width: 400px;
}

#modal-edit-task form input:focus {
  outline: none;
  border: 3px solid rgba(59,126,195,1);
  background-color: rgb(239, 247, 255);
}

#modal-edit-task form button {
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

#modal-edit-task form button:hover {
  background: rgb(59,126,195);
  background: linear-gradient(32deg, rgb(34, 89, 145) 33%, rgb(61, 129, 143) 100%);
}

#modal-edit-task form button:nth-of-type(2) {
  height: 45px;
  width: 200px;
  border: none; 
  border-radius: 20px;
  margin-top: 20px;
  background: crimson;
  color: white;
  font-weight: bolder;
  letter-spacing: 3px;
  height: 40px;
}

#modal-edit-task form button:nth-of-type(2):hover {
  background: rgb(129, 10, 34);
}

#modal-edit-task form div {
  display: flex;
  flex-direction: row;
  gap: 30px;
}

#modal-edit-task form select {
  border: none;
  border-radius: 20px;
  background-color: #f8f8f8;
  height: 30px;
  text-align: center;
  width: 400px;
}

#modal-edit-task form select:focus {
  outline: none;
  border: 3px solid rgba(59,126,195,1);
  background-color: rgb(239, 247, 255);
  font-family: Work Sans;
}

#modal-edit-task form textarea {
  border: none;
  border-radius: 20px;
  background-color: #f8f8f8;
  height: 100px;
  text-align: center;
  width: 400px;
  font-family: Work Sans;
  display: flex;
}

#modal-edit-task form textarea:focus {
  outline: none;
  border: 3px solid rgba(59,126,195,1);
  background-color: rgb(239, 247, 255);
  font-family: Work Sans;
}


#task-table .task-card {
  background-color: #fcfcfc;
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 85%;
  padding: 20px;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 0px 10px;
  margin: auto;
  margin-bottom: 20px;
}

#task-table .task-card .task-card-title h4 {
  font-size: 16px;
  word-wrap: break-word; 
}

#task-table .task-card .task-card-data {
  display: flex;
  flex-direction: column;
  gap: 5px;
  font-size: 14px;
  word-wrap: break-word; 
}

#task-table .task-card .task-card-tags {
  display: flex;
  flex-direction: column;
  gap: 10px;
  font-size: 13px;
  justify-content: space-between;
  word-wrap: break-word; 
}

#task-table .task-card .task-card-tags p,
span {
  padding: 10px;
  background-color: #f8f8f8;
  border-radius: 5px;
}

#task-table .task-card .task-card-actions {
  display: flex;
  flex-direction: row;
  align-content: space-around;
  justify-content: space-between;
}

#task-table .task-card .task-card-actions button {
  padding-top: 5px;
  padding-bottom: 5px;
  padding-left: 10px;
  padding-right: 10px;
  border: none;
  width: 30px;
  height: 30px;
  border-radius: 5px;
}

#task-table .task-card .task-card-actions button:nth-of-type(1) {
  background-color: mediumseagreen;
  background-image: url("../assets/completed-icon.png");
  background-size: 20px;
  background-position: center;
  background-repeat: no-repeat;
  color: white;
  font-weight: 700;
}

#task-table .task-card .task-card-actions button:nth-of-type(1):hover {
  background-color: rgb(31, 126, 73);
}

#task-table .task-card .task-card-actions button:nth-of-type(2) {
  background-color: rgb(255, 173, 21);
  color: white;
  font-weight: 700;
  background-image: url("../assets/edit-icon.png");
  background-size: 20px;
  background-position: center;
  background-repeat: no-repeat;
}

#task-table .task-card .task-card-actions button:nth-of-type(2):hover {
  background-color: rgb(180, 117, 0);
}

#task-table .task-card .task-card-actions button:nth-of-type(3) {
  background-color: crimson;
  color: white;
  font-weight: 700;
  background-image: url("../assets/delete-icon.png");
  background-size: 20px;
  background-position: center;
  background-repeat: no-repeat;
}

#task-table .task-card .task-card-actions button:nth-of-type(3):hover {
  background-color: rgb(160, 6, 36);
}

/* Responsive styles */
@media (max-width: 768px) {
  #modal-edit-task {
    max-width: 90%;
    min-width: 300px;
    padding: 20px;
    height: auto;
    gap: 20px;
  }

  #modal-edit-task h4 {
    font-size: 24px;
  }

  #modal-edit-task form {
    max-width: 100%;
    width: 100%;
  }

  #modal-edit-task form input,
  #modal-edit-task form textarea,
  #modal-edit-task form select {
    width: 100%;
    height: 40px;
  }

  #modal-edit-task form textarea {
    resize: vertical; /* Permitir redimensionar verticalmente */
    height: auto; /* Altura automática para el textarea */
  }

  #modal-edit-task form button,
  #modal-edit-task form button:nth-of-type(2) {
    width: 100%;
    height: 50px;
  }

  #modal-edit-task form div {
    flex-direction: column;
    gap: 15px;
    width: 100%;
  }
}

</style>