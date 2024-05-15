<script setup>
import { ref, computed } from 'vue';
import { storeToRefs } from 'pinia';
import { useTaskStore } from '@/stores/tasks';
import { useUserStore } from '@/stores/user';

const userStore = useUserStore();
const taskStore = useTaskStore();

const { user } = storeToRefs(userStore);
const { tasks } = storeToRefs(taskStore);

const todoTaskArea = 'To do';

const todoTasks = computed(() => {
  return tasks.value ? tasks.value.filter(task => task.area === todoTaskArea) : [];
});

const handleUpdateTaskArea = async (taskId,task) => {
  try {
    task.is_complete = !task.is_complete;
    task.area = 'Done';
    await taskStore.updateTaskArea(taskId, task);
    if (user.value) {
      console.log("Fetching tasks for user:", user.value.user.id);
      await taskStore.fetchTasks(user.value.user.id); 
    }
  } catch (error) {
    console.error('Error updating task:', error);
  }
};

const handleDeleteTask = async (taskId) => {
  try {
    await taskStore.deleteTask(taskId);
    if (user.value) {
      await taskStore.fetchTasks(user.value.user.id); 
    }
  } catch (error) {
    console.error('Error deleting task:', error);
  }
};
</script>

<template>
  <div class="task-card" v-for="task in todoTasks" :key="task.id">
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
      <button @click="taskStore.editTask(task.id)"></button>
      <button @click="handleDeleteTask(task.id)"></button>
    </div>
  </div>
</template>


<style scoped>

#task-table .task-card{
    background-color: #fcfcfc;
    display: flex;
    flex-direction: column;
    gap: 20px;
    width: 85%;
    padding: 20px;
    box-shadow: rgba(149, 157, 165, 0.2) 0px 0px 10px;
    margin: auto;
    margin-bottom: 20px ;

}

#task-table .task-card .task-card-title h4{
    font-size: 16px;
}

#task-table .task-card .task-card-data{
    display: flex;
    flex-direction: column;
    gap: 5px;
    font-size: 14px;
}

#task-table .task-card .task-card-tags{
    display: flex;
    flex-direction: row;
    gap: 10px;
    font-size: 13px;
    justify-content: space-between;
}

#task-table .task-card .task-card-tags p,span{
    padding: 10px;
    background-color: #f8f8f8;
    border-radius: 5px;
}

#task-table .task-card .task-card-actions{
    display: flex;
    flex-direction: row;
    align-content: space-around;

    justify-content: space-between;
}

#task-table .task-card .task-card-actions button{
    padding-top: 5px;
    padding-bottom: 5px;
    padding-left: 10px;
    padding-right: 10px;
    border: none;
    width: 30px;
    height: 30px;
    border-radius: 5px;
}

#task-table .task-card .task-card-actions button:nth-of-type(1){
    background-color:mediumseagreen;
    background-image:url("../assets/completed-icon.png");
    background-size: 20px;
    background-position: center;
    background-repeat: no-repeat;
    color: white;
    font-weight: 700;
}

#task-table .task-card .task-card-actions button:nth-of-type(1):hover{
    background-color:rgb(31, 126, 73);
}

#task-table .task-card .task-card-actions button:nth-of-type(2){
    background-color:rgb(255, 173, 21);
    color:white;
    font-weight: 700;
    background-image: url("../assets/edit-icon.png");
    background-size: 20px;
    background-position: center;
    background-repeat: no-repeat;
}

#task-table .task-card .task-card-actions button:nth-of-type(2):hover{
    background-color: rgb(180, 117, 0);
}

#task-table .task-card .task-card-actions button:nth-of-type(3){
    background-color:crimson;
    color:white;
    font-weight: 700;
    background-image: url("../assets/delete-icon.png");
    background-size: 20px;
    background-position: center;
    background-repeat: no-repeat;
}

#task-table .task-card .task-card-actions button:nth-of-type(3):hover{
    background-color:rgb(160, 6, 36);
}

</style>