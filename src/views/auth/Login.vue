<template>
  <div>
    <form class="pt-6 pb-8 mb-4" @submit.prevent="login">
      <div class="mb-4">
        <label class="block mb-2" for="username">Username</label>
        <input type="text" name="username" v-model="username">
      </div>
      <div class="mb-4">
        <label class="block mb-2" for="password">Password</label>
        <input type="password" v-model="password">
      </div>
      <button class="btn btn-blue" type="submit">Login</button>
    </form>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useStore } from '@/store/index'

export default defineComponent({
  name: 'Login',
  setup () {
    const username = ref('')
    const password = ref('')
    const store = useStore()

    const login = () => {
      const loginData = { username: username.value, password: password.value }
      console.log(loginData)
      store.dispatch('auth/login', loginData)
    }
    return {
      username,
      password,
      login
    }
  }
})
</script>
