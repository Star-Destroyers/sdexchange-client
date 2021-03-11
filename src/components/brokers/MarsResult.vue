<template>
  <p><pre>{{ dataDisplay }}</pre></p>
</template>
<script lang="ts">
import { defineComponent, computed } from 'vue'

export default defineComponent({
  props: {
    result: {
      type: Object
    }
  },
  setup (props) {
    const dataDisplay = computed(() => {
      return JSON.stringify(props.result, null, 2)
    })

    return { data: props.result, dataDisplay: dataDisplay }
  }
})
</script>
