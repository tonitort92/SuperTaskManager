<script setup>
//We import the main methods of vue for this component

import { ref, watchEffect, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useProfileStore } from '@/stores/profiles'
import { useUserStore } from '@/stores/user'

//We import the main stores to use shared functions across the components

const profileStore = useProfileStore()
const userStore = useUserStore()

//We import the main reactive objects we need from store, already fetched and ready

const { user } = storeToRefs(userStore)
const { profile } = storeToRefs(profileStore)

//We define our main reactive objects to work as variables

const profileName = ref('')
const profileUser = ref('')
const profileMail = ref('')
const createProfileButton = ref(true)

//We define the main function to fetch the profile data of the user

const fetchProfileData = async () => {
  if (user.value) {
    await profileStore.fetchProfiles(user.value.id)
  }
}

onMounted(fetchProfileData)

//We define a wtatcheffect to check constantly if there's any content change

watchEffect(() => {
  if (profile.value) {
    profileName.value = profile.value.name
    profileUser.value = profile.value.user_name
    profileMail.value = profile.value.email
    createProfileButton.value = false
  } else {
    profileName.value = ''
    profileUser.value = ''
    profileMail.value = ''
    createProfileButton.value = true
  }
})

//Main function to modify profile

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
    user_id: user.value.id
  }

  try {
    if (createProfileButton.value) {
      await profileStore.createProfile(profileData)
      alert('Tu perfil se ha creado correctamente.')
      createProfileButton.value = false
    } else {
      await profileStore.updateProfile(user.value.id, profileData)
      alert('Tu perfil se ha actualizado correctamente.')
    }

    // Fetch the profile data again to ensure state is updated
    await fetchProfileData()
  } catch (error) {
    alert('Hubo un error al guardar tu perfil: ' + error.message)
  }
}
</script>

<!--Here we define with HTML the main structure and embedded functions to it-->

<template>
  <div id="modal-profile-wrapper">
    <div id="modal-profile">
      <h2>Configura tu perfil</h2>
      <h3>Personaliza tu perfil con tu información</h3>
      <form @submit.prevent="handleProfile">
        <input v-model="profileName" placeholder="Escribe aquí tu nombre ..." />
        <input v-model="profileUser" placeholder="Escribe aquí tu usuario ..." />
        <input v-model="profileMail" placeholder="Escribe aquí tu correo ..." />
        <button type="submit">
          {{ createProfileButton ? 'CREAR PERFIL' : 'ACTUALIZAR PERFIL' }}
        </button>
      </form>
    </div>
  </div>
</template>

<!--Here we define with CSS the main styles and responsive elements-->

<style scoped>
#modal-profile-wrapper {
  display: flex;
  align-items: center;
  align-content: center;
  justify-content: center;
  height: 100vh;
  padding: 10px;
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

#modal-profile h2 {
  font-weight: 900;
}

#modal-profile h3 {
  font-weight: 500;
}

#modal-profile form {
  display: flex;
  flex-direction: column;
  width: 100%;
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
  width: 100%;
  max-width: 400px;
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

/* Media Queries for Responsive Design */
@media (max-width: 768px) {
  #modal-profile {
    padding: 15px;
  }

  #modal-profile form input {
    max-width: 100%;
  }

  #modal-profile form button {
    width: 100%;
    max-width: 200px;
  }
}

@media (max-width: 480px) {
  #modal-profile {
    padding: 10px;
  }

  #modal-profile form input {
    max-width: 100%;
  }

  #modal-profile form button {
    width: 100%;
    max-width: 150px;
  }

  #modal-profile h2,
  #modal-profile h3 {
    text-align: center;
  }
}
</style>
