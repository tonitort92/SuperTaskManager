<script setup>

    import NavBar from '@/components/NavBar.vue';
    import TaskTable from '@/components/TaskTable.vue';
    import ModalNewTask from '@/components/ModalNewTask.vue';

</script>

<template>
    <NavBar></NavBar>
    <ModalNewTask></ModalNewTask>
    <TaskTable></TaskTable>
</template>

<style scoped>

a.router-link-exact-active {
    margin-left: 80px;
}

</style>