<script setup>
//We import the main methods of vue for this component

import BacklogCards from './BacklogCards.vue'
import CommitedCards from './CommitedCards.vue'
import TodoCards from './TodoCards.vue'
import DoingCards from './DoingCards.vue'
import DoneCards from './DoneCards.vue'
</script>

<!--Here we define with HTML the main structure and embedded functions to it-->

<template>
  <div id="task-table-wrapper">
    <div id="task-table">
      <div class="column">
        <div class="column-header">Backlog</div>
        <div id="backlog-tasks">
          <BacklogCards></BacklogCards>
        </div>
      </div>
      <div class="column">
        <div class="column-header">Commited</div>
        <div id="commited-tasks">
          <CommitedCards></CommitedCards>
        </div>
      </div>
      <div class="column">
        <div class="column-header">To do</div>
        <div id="todo-tasks">
          <TodoCards></TodoCards>
        </div>
      </div>
      <div class="column">
        <div class="column-header">Doing</div>
        <div id="doing-tasks">
          <DoingCards></DoingCards>
        </div>
      </div>
      <div class="column">
        <div class="column-header">Done</div>
        <div id="done-tasks">
          <DoneCards></DoneCards>
        </div>
      </div>
    </div>
  </div>
</template>

<!--Here we define with CSS the main styles and responsive elements-->

<style scoped>
#task-table-wrapper {
  display: flex;
  justify-content: center;
  margin-top: 100px;
  height: auto;
  width: 100%;
  overflow-x: hidden;
}

#task-table {
  background-color: #ffffff;
  padding: 50px;
  border-radius: 20px;
  width: 100%;
  max-width: 1440px;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  display: flex;
  flex-direction: row;
  gap: 20px;
  justify-content: center;
}

.column {
  flex: 1 1 calc(20% - 40px); /* Ajustar el ancho relativo y espacio entre columnas */
  min-width: 200px; /* Ajustar el ancho mínimo para dispositivos pequeños */
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
}

.column-header {
  background-color: #f7f7f7;
  color: rgb(170, 170, 170);
  padding: 8px;
  width: 100%;
  text-align: center;
  border-bottom: 1px solid #f8f8f8;
}

@media (max-width: 1024px) {
  #task-table {
    flex-direction: column;
    padding: 20px;
  }

  .column {
    max-width: 100%;
    width: 100%;
    min-width: 100%;
  }
}

@media (max-width: 768px) {
  #task-table {
    padding: 20px;
    flex-direction: column;
    gap: 10px;
  }

  .column {
    max-width: 100%;
    width: 100%;
    min-width: 100%;
  }
}
</style>
