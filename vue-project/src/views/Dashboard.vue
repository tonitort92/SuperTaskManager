<script setup>

    import NavBar from '@/components/NavBar.vue';
    import TaskTable from '@/components/TaskTable.vue';
    import AddNewTask from '@/components/AddNewTask.vue';
    import ModalNewTask from '@/components/ModalNewTask.vue';

</script>

<template>
    <NavBar></NavBar>
    <ModalNewTask></ModalNewTask>
    <AddNewTask></AddNewTask>
    <TaskTable></TaskTable>
</template>

<style scoped>

</style>