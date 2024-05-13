<script setup>

   

</script>



<template>
    <div id="add-task-container">
        <button>
            <img src="../assets/add-task-icon.png">
        </button>
    </div>
</template>

<style scoped>

    #add-task-container {
        position: fixed;
        bottom: 50px;
        right: 50px;

    }

    button {
        border-radius: 200px;
        background-color: cornflowerblue;
        padding: 20px;
        border: none;
        box-shadow: rgba(149, 157, 165, 0.6) 0px 0px 16px;
    }

    button:hover {
        background-color: rgb(53, 97, 179);
    }
    
    button:active {
        background-color: rgb(27, 57, 114);
        padding: 15px;
    }

</style>
