<script setup>
import { ref, watchEffect } from 'vue'
import { storeToRefs } from 'pinia'
import { useProfileStore } from '@/stores/profiles'
import { useUserStore } from '@/stores/user'

const profileStore = useProfileStore()
const { profile } = storeToRefs(profileStore)

const userStore = useUserStore()
const { user } = storeToRefs(userStore)

const profileName = ref('')
const profileUser = ref('')
const profileMail = ref('')

const createProfileButton = ref(true);
const updateProfileButton = ref(false);

watchEffect(() => {
    console.log(profile);
  if (profile.value) {
    profileName.value = profile.value.name
    profileUser.value = profile.value.user_name
    profileMail.value = profile.value.email
    createProfileButton.value = false; 
    updateProfileButton.value = true;
  }
})

const handleProfile = async () => {
  if (
    !profileName.value ||
    !profileUser.value ||
    !profileMail.value ||
    !profileMail.value.includes('@') ||
    !profileMail.value.includes('.')
  ) {
    alert('Por favor, completa todos los campos del formulario correctamente.')
    return
  }

  const profileData = {
    name: profileName.value,
    user_name: profileUser.value,
    email: profileMail.value,
    user_id: user.value.user.id
  }

  try {
    await profileStore.createProfile(user.value.user.id, profileData)
    alert('Tu perfil se ha actualizado correctamente.')
  } catch (error) {
    alert('Hubo un error al crear tu perfil: ' + error.message)
  }
}

const updateDataProfile = async () => {
  if (
    !profileName.value ||
    !profileUser.value ||
    !profileMail.value ||
    !profileMail.value.includes('@') ||
    !profileMail.value.includes('.')
  ) {
    alert('Por favor, completa todos los campos del formulario correctamente.')
    return
  }

  const profileData = {
    name: profileName.value,
    user_name: profileUser.value,
    email: profileMail.value,
    user_id: user.value.user.id
  }

  try {
    await profileStore.updateProfile(user.value.user.id, profileData)
    alert('Tu perfil se ha actualizado correctamente.')
  } catch (error) {
    alert('Hubo un error al actualizar tu perfil: ' + error.message)
  }
}
</script>

<template>
  <div id="modal-profile-wrapper">
    <div id="modal-profile">
      <h2>Configura tu perfil</h2>
      <h3>Personaliza tu perfil con tu información</h3>
      <form v-if='createProfileButton' @submit.prevent="handleProfile">
        <input v-model="profileName" placeholder="Escribe aquí tu nombre ..."/>
        <input v-model="profileUser" placeholder="Escribe aquí tu usuario ..."/>
        <input v-model="profileMail" placeholder="Escribe aquí tu correo ..."/>
        <button type="submit">CREAR PERFIL</button>
      </form>
      <form v-if='updateProfileButton' @submit.prevent="updateDataProfile">
        <input v-model="profileName" placeholder="Escribe aquí tu nombre ..."/>
        <input v-model="profileUser" placeholder="Escribe aquí tu usuario ..."/>
        <input v-model="profileMail" placeholder="Escribe aquí tu correo ..."/>
        <button type="submit">ACTUALIZAR PERFIL</button>
      </form>
    </div>
  </div>
</template>

<style scoped>
#modal-profile-wrapper {
  display: flex;
  align-items: center;
  align-content: center;
  justify-content: center;
  height: 100vh;
}

.file-input-wrapper {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
  height: 150px;
  width: 150px;
}

input[type='file'] {
  display: none;
}

.file-input-label {
  background: cornflowerblue;
  color: white;
  padding: 10px 20px;
  cursor: pointer;
  border-radius: 500px;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  padding-bottom: 20px;
  background-image: url('../assets/profile-icon.png');
  background-repeat: no-repeat;
  background-position: center 20px;
  background-size: 60px;
}

#modal-profile {
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
  height: auto;
  gap: 30px;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  border-top: 20px solid rgba(59, 126, 195, 1);
  border-bottom: 20px solid rgba(59, 126, 195, 1);
}

#modal-profile h2 {
  font-weight: 900;
}

#modal-profile h3 {
  font-weight: 500;
}

#modal-profile form {
  display: flex;
  flex-direction: column;
  max-width: 300px;
  text-align: center;
  justify-content: center;
  align-items: center;
  gap: 15px;
}

#modal-profile form input {
  border: none;
  border-radius: 20px;
  background-color: #f8f8f8;
  height: 30px;
  text-align: center;
  width: 400px;
}

#modal-profile form input:button {
  display: block;
  margin-top: 20px;
}

#modal-profile form input:focus {
  outline: none;
  border: 3px solid rgba(59, 126, 195, 1);
  background-color: rgb(239, 247, 255);
}

#modal-profile form button {
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

#modal-profile img {
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
