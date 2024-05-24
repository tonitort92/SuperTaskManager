<script setup>
//We import the main methods of vue for this component

import { ref } from 'vue'
import { useUserStore } from '@/stores/user'
import router from '@/router/index'

//We define our main reactive objects to work as variables

const authMail = ref('')
const authPassword = ref('')
const authConfirm = ref('')
const signedUp = ref(false)
const userStore = useUserStore()

//Main function for sign up with a new account

async function handleSignUp() {
  if (authPassword.value !== authConfirm.value) {
    alert('Las contraseñas no coinciden')
    signedUp.value = false
    return
  }

  if (authPassword.value.length < 6) {
    alert('La contraseña es demasiado corta')
    return
  }

  if (!authMail.value.includes('@') || !authMail.value.includes('.')) {
    alert('Parece que no has puesto un correo válido')
    return
  }

  try {
    await userStore.signUp(authMail.value, authPassword.value)
    signedUp.value = true
    alert('¡Bravo! Te has registrado a SuperTaskManager. Bienvenido a la plataforma :D')
    router.push('/auth')
  } catch (error) {
    if (error.message.includes('Email rate limit exceeded')) {
      alert(
        'Has intentado registrarte demasiadas veces en poco tiempo. Por favor, espera unos minutos antes de intentarlo nuevamente.'
      )
    } else if (error.message.includes('violates foreign key constraint')) {
      alert('Error en el registro: No se pudo crear el perfil asociado.')
    } else {
      alert('Error en el registro: ' + error.message)
    }
    signedUp.value = false
  }
}
</script>

<!--Here we define with HTML the main structure and embedded functions to it-->

<template>
  <div id="modal-auth-wrapper">
    <div id="modal-auth">
      <img src="../assets/hello-hand.webp" />
      <h2>¡Date de alta en <span>SuperTaskManager!</span></h2>
      <h3>Logueate en la aplicación usando tu usuario y contraseña</h3>
      <form @submit.prevent="handleSignUp">
        <input v-model="authMail" placeholder="Correo electrónico" />
        <input type="password" v-model="authPassword" placeholder="Contraseña" />
        <input type="password" v-model="authConfirm" placeholder="Confirma la contraseña" />
        <button type="submit">DARTE DE ALTA</button>
      </form>
      <p>Ya tengo una cuenta, <router-link :to="'/auth'">quiero loguearme</router-link></p>
    </div>
  </div>
</template>

<!--Here we define with CSS the main styles and responsive elements-->

<style scoped>
#modal-auth-wrapper {
  display: flex;
  align-items: center;
  align-content: center;
  height: 100vh;
  justify-content: center;
  padding: 10px;
}

#modal-auth {
  max-width: 640px;
  min-width: 300px;
  width: 100%;
  border-radius: 10px;
  background-color: #fff;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  align-items: center;
  height: auto;
  gap: 30px;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  border-top: 20px solid rgba(59, 126, 195, 1);
  border-bottom: 20px solid rgba(59, 126, 195, 1);
}

#modal-auth h2 {
  font-weight: 900;
}

#modal-auth h2 span {
  color: cornflowerblue;
}

#modal-auth h3 {
  font-weight: 500;
}

#modal-auth form {
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 300px;
  text-align: center;
  justify-content: center;
  align-items: center;
  gap: 15px;
}

#modal-auth form input {
  border: none;
  border-radius: 20px;
  background-color: #f8f8f8;
  height: 30px;
  text-align: center;
  width: 100%;
  max-width: 400px;
}

#modal-auth form input:focus {
  outline: none;
  border: 3px solid rgba(59, 126, 195, 1);
  background-color: rgb(239, 247, 255);
}

#modal-auth form button {
  height: 45px;
  width: 200px;
  border: none;
  border-radius: 20px;
  margin-top: 20px;
  background: rgb(59, 126, 195);
  background: linear-gradient(32deg, rgba(59, 126, 195, 1) 33%, rgba(0, 212, 255, 1) 100%);
  color: white;
  font-weight: bolder;
  letter-spacing: 3px;
  height: 40px;
}

#modal-auth img {
  width: 120px;
}

a:-webkit-any-link {
  text-decoration: none;
  color: cornflowerblue;
  font-weight: 500;
}

a:-webkit-any-link:hover {
  text-decoration: none;
  color: rgb(62, 107, 190);
  font-weight: 500;
}

/* Media Queries for Responsive Design */
@media (max-width: 768px) {
  #modal-auth {
    padding: 15px;
  }

  #modal-auth form input {
    max-width: 100%;
  }

  #modal-auth form button {
    width: 100%;
    max-width: 200px;
  }
}

@media (max-width: 480px) {
  #modal-auth {
    padding: 10px;
  }

  #modal-auth form input {
    max-width: 100%;
  }

  #modal-auth form button {
    width: 100%;
    max-width: 150px;
  }

  #modal-auth h2,
  #modal-auth h3 {
    text-align: center;
  }
}
</style>
