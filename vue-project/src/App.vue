<script setup>
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import { useUserStore } from './stores/user.js'
import { useTaskStore } from './stores/tasks.js'
 
const router = useRouter()
const userStore = useUserStore()
const taskStore = useTaskStore()
const { user } = storeToRefs(userStore)

onMounted(async () => {
  try {
    await userStore.fetchUser() // here we call fetch user
    if (!user) {
      // redirect them to logout if the user is not there
      router.push({ path: '/auth' });
    } else {
      // continue to dashboard
      router.push({ path: '/' });
      taskStore.fetchTasks(user.value.user.id);
      alert("Datos cargados correctamente, el id es " + user.value.user.id);
    }
  } catch (e) {
    console.error(e)
  }
})
</script>
 

<template>
  <section>
    <router-view />
  </section>
</template>
 
