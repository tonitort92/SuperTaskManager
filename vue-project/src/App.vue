<script setup>
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import { useUserStore } from './stores/user.js'
import { useTaskStore } from './stores/tasks.js'
import { useProfileStore } from './stores/profiles'
 
const router = useRouter()
const userStore = useUserStore()
const taskStore = useTaskStore()
const profileStore = useProfileStore()
const { user } = storeToRefs(userStore)

onMounted(async () => {
  try {
    await userStore.fetchUser() // here we call fetch user
    if (!user) {
      // redirect them to logout if the user is not there
      router.push({ path: '/auth' });
    } else {
      // continue to dashboard
      await taskStore.fetchTasks(user.value.user.id);
      await profileStore.fetchProfiles(user.value.user.id);
      router.push({ path: '/' });
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
 
