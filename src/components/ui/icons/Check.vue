<template>
  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mt-5 inline-block" :class="textColor" viewBox="0 0 20 20" fill="currentColor">
  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
  </svg>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    color: {
      required: false,
      type: String,
      default: 'text-green-300'
    }
  },
  setup (props) {
    return {
      textColor: props.color
    }
  }
})
</script>
