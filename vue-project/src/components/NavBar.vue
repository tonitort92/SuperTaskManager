<script setup>
</script>

<template>
    <header>
        <nav>
            <img src="../assets/task-manager-logo.png">
            <ul>
                <li>TASKS</li>
                <li>PROFILE</li>
                <li>LOG OUT</li>
            </ul>
        </nav>
    </header>
</template>

<style scoped>

header{
    background-color: cornflowerblue;
    display: flex;
    flex-direction: column;
    align-items: center;
    align-content: center; 
    position: fixed;
    width: 100%;
    top: 0;
}

nav {
    display: flex;
    flex-direction: row;
    padding: 20px;
    justify-content: space-between;
    align-items: center;
    max-width: 80%;
    width: 80%;
}

nav img{
    width: 85px;
}

nav ul{
    list-style: none;
}

nav ul li{
    color: white;
    font-weight: 300;
    display: inline-block;
    margin-left: 80px;
}

nav ul li:hover{

    font-weight: 500;

}

nav ul li:nth-of-type(1){
    color: white;
    display: inline-block;
    margin-left: 0;
}


</style>