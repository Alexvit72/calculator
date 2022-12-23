<template>
  <div class="absolute left-0 right-0 bottom-1/4 bg-red-300 text-white text-center p-4 rounded-xl">
    {{ message }}
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Message',
  props: {
    message: String
  }
});
</script>
