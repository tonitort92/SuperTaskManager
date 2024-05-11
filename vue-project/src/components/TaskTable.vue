<script setup>

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
                        <td  width="20%" align="center" valign="middle">
                            <div class="task-card">
                                <div class="task-card-title">
                                    <h4>Carga de datos en Supabase</h4>
                                </div>
                                <div class="task-card-data">
                                    <p>Crear las tablas de profiles y tasks para poder almacenar los datos de estado y el auth del usuario</p>
                                </div>
                                <div class="task-card-tags">
                                    <p>15-09-1992</p>
                                    <span>#Navidad</span>
                                </div>
                                <div class="task-card-actions">
                                    <button></button>
                                    <button></button>
                                    <button></button>
                                </div>
                            </div>
                        </td>
                        <td  width="20%" align="center" valign="middle">
                            <div class="task-card">
                                <div class="task-card-title">
                                    <h4>Carga de datos en Supabase</h4>
                                </div>
                                <div class="task-card-data">
                                    <p>Crear las tablas de profiles y tasks para poder almacenar los datos de estado y el auth del usuario</p>
                                </div>
                                <div class="task-card-tags">
                                    <p>15-09-1992</p>
                                    <span>#tags de la tarea</span>
                                </div>
                                <div class="task-card-actions">
                                    <button></button>
                                    <button></button>
                                    <button></button>
                                </div>
                            </div>
                        </td>
                        <td  width="20%" align="center" valign="middle">
                            <div class="task-card">
                                <div class="task-card-title">
                                    <h4>Carga de datos en Supabase</h4>
                                </div>
                                <div class="task-card-data">
                                    <p>Crear las tablas de profiles y tasks para poder almacenar los datos de estado y el auth del usuario</p>
                                </div>
                                <div class="task-card-tags">
                                    <p>15-09-1992</p>
                                    <span>#tags de la tarea</span>
                                </div>
                                <div class="task-card-actions">
                                    <button></button>
                                    <button></button>
                                    <button></button>
                                </div>
                            </div>
                        </td>
                        <td  width="20%" align="center" valign="middle">
                            <div class="task-card">
                                <div class="task-card-title">
                                    <h4>Carga de datos en Supabase</h4>
                                </div>
                                <div class="task-card-data">
                                    <p>Crear las tablas de profiles y tasks para poder almacenar los datos de estado y el auth del usuario</p>
                                </div>
                                <div class="task-card-tags">
                                    <p>15-09-1992</p>
                                    <span>#tags de la tarea</span>
                                </div>
                                <div class="task-card-actions">
                                    <button></button>
                                    <button></button>
                                    <button></button>
                                </div>
                            </div>
                        </td>
                        <td  width="20%" align="center" valign="middle">
                            <div class="task-card">
                                <div class="task-card-title">
                                    <h4>Carga de datos en Supabase</h4>
                                </div>
                                <div class="task-card-data">
                                    <p>Crear las tablas de profiles y tasks para poder almacenar los datos de estado y el auth del usuario</p>
                                </div>
                                <div class="task-card-tags">
                                    <p>15-09-1992</p>
                                    <span>#tags de la tarea</span>
                                </div>
                                <div class="task-card-actions">
                                    <button></button>
                                    <button></button>
                                    <button></button>
                                </div>
                            </div>
                        </td>
                    </tr>
                    <!-- More rows can be added here -->
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
    height: 80%;
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
    width: 20px;
    margin-right: 5%;
    margin-left: 5%;

}

#task-table th {
    background-color: #f7f7f7;
    color: rgb(170, 170, 170);

}

#task-table .task-card{
    background-color: #fcfcfc;
    display: flex;
    flex-direction: column;
    gap: 20px;
    width: 85%;
    padding: 20px;
    box-shadow: rgba(149, 157, 165, 0.2) 0px 0px 10px;
    margin: auto;

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
    background-color:cornflowerblue;
    background-image: url("../assets/clock-icon.png");
    background-size: 20px;
    background-position: center;
    background-repeat: no-repeat;
    color: white;
    font-weight: 700;
}

#task-table .task-card .task-card-actions button:nth-of-type(1):hover{
    background-color:rgb(56, 99, 180);
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