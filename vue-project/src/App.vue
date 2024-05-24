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
    await userStore.fetchUser() // fetch user data
    if (!user.value) {
      router.push({ path: '/auth' })
    } else {
      await taskStore.fetchTasks(user.value.id)
      await profileStore.fetchProfiles(user.value.id)
      router.push({ path: '/' })
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
