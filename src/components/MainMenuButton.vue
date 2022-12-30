<template>
  <button
    :class="`${isActive ? 'bg-green-400 dark:bg-white text-white dark:text-green-400' : 'text-gray-400 bg-opacity-0'} mx-2 my-0 py-1 sm:py-2 px-2.5 text-xs font-bold rounded-2xl border-0`"
    @click="$emit('click', title)"
  >
    {{ title }}
  </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'MainMenuButton',
  props: {
    title: {
      type: String,
      required: true
    },
    isActive: Boolean
  },
  emits: ['click']
});
</script>
