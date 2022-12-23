<template>
  <div class="control grid grid-cols-4 gap-4 place-items-center pt-4">
    <button
      v-for="button in buttons" :key="button.sign"
      v-html="button.sign"
      :class="`control_button bg-transparent border-0 rounded-full text-2xl xs:text-3xl sm:text-4xl disabled:text-gray-200 ${button.type === 'operation' ? 'pb-1 text-green-400 dark:bg-white dark:disabled:text-gray-200' : (button.type === 'delete' ? 'pb-1 text-gray-500 dark:text-white dark:bg-gray-400' : 'text-gray-400  dark:disabled:text-gray-500')}`"
      :disabled="getDisabled(button.value)"
      @click="$emit('click', button.value)"
    >
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { buttons } from '../utils';

export default defineComponent({
  name: 'ControlPad',
  props: {
    tool: {
      type: String,
      required: true
    },
    disabledButtons: Array
  },
  emits: ['click'],
  computed: {
    buttons() {
      return buttons[this.tool];
    }
  },
  methods: {
    getDisabled(value: string) {
      if (this.tool === 'converter') {
        return (this.disabledButtons ? this.disabledButtons.includes(value) : false);
      } else return false;
    }
  }
});
</script>

<style lang="scss">
.control_button {
  width: calc((400px - 5.5rem) / 4);
  height: calc((400px - 5.5rem) / 4);
  @media (max-width: 400px) {
    width: calc((100vw - 5.5rem) / 4);
    height: calc((100vw - 5.5rem) / 4);
  }
  @media (max-height: 650px) {
    width: calc((90vw - 5.5rem) / 4);
    height: calc((90vw - 5.5rem) / 4);
  }
}
</style>
