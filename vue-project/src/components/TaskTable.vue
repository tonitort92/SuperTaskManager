<script setup>

import BacklogCards from './BacklogCards.vue';
import CommitedCards from './CommitedCards.vue';
import TodoCards from './TodoCards.vue';
import DoingCards from './DoingCards.vue';
import DoneCards from './DoneCards.vue';

/*onMounted(async () => {
  if (user.value) {
    await taskStore.fetchTasks(user.value.id); 
  }
});*/

</script>

<template>

    <div id="task-table-wrapper">
        <div id="task-table">
            <table>
                <thead>
                    <tr>
                        <th>Backlog</th>
                        <th>Commited</th>
                        <th>To do</th>
                        <th>Doing</th>
                        <th>Done</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td id="backlog-tasks" width="20%" align="center" valign="top">
                            <BacklogCards></BacklogCards>
                        </td>
                        <td id="commited-tasks" width="20%" align="center" valign="top">
                            <CommitedCards></CommitedCards>
                        </td>
                        <td id="todo-tasks" width="20%" align="center" valign="top">
                            <TodoCards></TodoCards>
                        </td>
                        <td id="doing-tasks" width="20%" align="center" valign="top">
                            <DoingCards></DoingCards>
                        </td>
                        <td id="done-tasks" width="20%" align="center" valign="top">
                            <DoneCards></DoneCards>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
<style scoped>

#task-table-wrapper{
    display: flex;
    align-items: flex-start;
    margin-top: 100px;
    align-content: center;
    justify-content: center;
    height: 100vh;
    min-width: 100vw;
}

#task-table{
    background-color: #ffffff;
    padding: 50px;
    border-radius: 20px;
    width: 100%;
    height: auto;
    max-width: 1440px;
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
    margin-top: 100px;
}

#task-table table {
    width: 100%;
    border-collapse: collapse;
}

#task-table th, td {
    border-left: 1px solid #f8f8f8;
    padding: 8px;
    text-align: center;
    padding-top: 20px;
    padding-bottom: 20px;
}

#task-table td {
    border-radius: 20px;
    width: 20%;
    max-width: 250px;
    min-width: 250px;
    margin-right: 5%;
    margin-left: 5%;

}

#task-table th {
    background-color: #f7f7f7;
    color: rgb(170, 170, 170);

}

</style>