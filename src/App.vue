<template>
  <Navbar></Navbar>
  <router-view/>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import Navbar from '@/layout/Navbar.vue'

export default defineComponent({
  components: {
    Navbar
  },
  setup () {
    return {}
  }
})
</script>
