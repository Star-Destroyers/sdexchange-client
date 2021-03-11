<template>
  <p>
    <strong>Name:</strong> {{ data.name }}
    <strong>Id:</strong> <a :href="data.url">{{ data.broker_id }}</a>
    <strong></strong>
  </p>
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
