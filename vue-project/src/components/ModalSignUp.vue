<script setup></script>

<template>

    <div id="modal-auth-wrapper">
        <div id="modal-auth">
            <img src="../assets/hello-hand.webp">
            <h2>¡Date de alta en <span>SuperTaskManager!</span></h2>
            <h3>Logueate en la aplicación usando tu usuario y contraseña</h3>
            <form>
                <input placeholder="Correo electrónico">
                <input placeholder="Contraseña">
                <input placeholder="Confirma la contraseña">
                <button>DARTE DE ALTA</button>
            </form>
        </div>
    </div>

</template>

<style scoped>

#modal-auth-wrapper{
    display: flex;
    align-items: center;
    align-content: center;
    height: 100vh;
    justify-content: center;
}

#modal-auth{
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

#modal-auth h2{
    font-weight: 900;
}

#modal-auth h2 span{
    color: cornflowerblue;
}

#modal-auth h3{
    font-weight: 500;
}

#modal-auth form{
    display: flex;
    flex-direction: column;
    max-width: 300px;
    text-align: center;
    justify-content: center;
    align-items: center;
    gap: 15px;
}

#modal-auth form input{
    border: none;
    border-radius: 20px;
    background-color: #f8f8f8;
    height: 30px;
    text-align: center;
    width: 400px;

}

#modal-auth form input:focus {
    outline: none;
    border: 3px solid rgba(59,126,195,1);
    background-color: rgb(239, 247, 255);

  }
  

#modal-auth form button{
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

#modal-auth img{
    width: 120px;
}

</style>