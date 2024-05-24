<script setup>
//We import the main methods of vue for this component

import { ref } from 'vue'
import { useUserStore } from '@/stores/user'
import router from '@/router/index'
import { useTaskStore } from '@/stores/tasks.js'
import { storeToRefs } from 'pinia'
import { useProfileStore } from '@/stores/profiles'

const email = ref('')
const password = ref('')

//We import the main stores to use shared functions across the components

const userStore = useUserStore()
const taskStore = useTaskStore()
const profileStore = useProfileStore()

//We import the main reactive objects we need from store, already fetched and ready

const { user } = storeToRefs(userStore)

//Main function for sign in

const handleSignIn = async () => {
  try {
    await userStore.signIn(email.value, password.value)
    await userStore.fetchUser()
    if (user.value) {
      console.log('Usuario después de fetchUser:', user.value)
      await taskStore.fetchTasks(user.value.id)
      await profileStore.fetchProfiles(user.value.id)
      router.push('/')
      alert('¡Inicio de sesión exitoso!')
    } else {
      throw new Error('No se pudo obtener el usuario después del inicio de sesión')
    }
  } catch (error) {
    console.error('Error en el inicio de sesión:', error)
    alert('Error en el inicio de sesión: ' + error.message)
  }
}
</script>

<!--Here we define with HTML the main structure and embedded functions to it-->

<template>
  <div id="modal-auth-wrapper">
    <div id="modal-auth">
      <img src="../assets/auth-icon.png" />
      <h2>Inicia sesión para acceder</h2>
      <h3>Logueate en la aplicación usando tu usuario y contraseña</h3>
      <form @submit.prevent="handleSignIn">
        <input v-model="email" placeholder="Correo electrónico" />
        <input type="password" v-model="password" placeholder="Contraseña" />
        <button type="submit">INICIAR SESIÓN</button>
      </form>
      <p>
        ¿No estás registrado?
        <router-link :to="'/signup'">Haz click aquí para registrarte.</router-link>
      </p>
    </div>
  </div>
</template>

<!--Here we define with CSS the main styles and responsive elements-->

<style scoped>
#modal-auth-wrapper {
  display: flex;
  align-items: center;
  align-content: center;
  justify-content: center;
  height: 100vh;
}

#modal-auth {
  max-width: 640%;
  min-width: 640px;
  border-radius: 10px;
  background-color: #fff;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  align-items: center;
  height: 500px;
  gap: 30px;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  border-top: 20px solid rgba(59, 126, 195, 1);
  border-bottom: 20px solid rgba(59, 126, 195, 1);
}

#modal-auth h2 {
  font-weight: 900;
}

#modal-auth h3 {
  font-weight: 500;
}

#modal-auth form {
  display: flex;
  flex-direction: column;
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
  width: 400px;
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
</style>
