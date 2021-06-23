<template>
  <Navbar></Navbar>
  <Alert></Alert>
  <router-view/>
</template>
<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import { useStore } from '@/store/index'
import Navbar from '@/layout/Navbar.vue'
import Alert from '@/layout/Alert.vue'

export default defineComponent({
  components: {
    Navbar,
    Alert
  },
  setup () {
    const store = useStore()
    onMounted(() => {
      store.dispatch('auth/initialize')
    })
    return {}
  }
})
</script>
