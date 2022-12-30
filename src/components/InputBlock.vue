<template>
  <div class="flex-grow flex flex-col justify-between items-start py-2 px-0 xs:pb-4">
    <select
      :value="unit"
      class="bg-transparent text-sm sm:text-base text-gray-400 focus:outline-none cursor-pointer" @change="$emit('update:unit', $event.target.value)"
    >
      <option
        class="dark:bg-gray-800"
        v-for="unit in units"
        :key="unit.symbol"
        :value="unit.symbol"
      >
        {{ unit.name }}
      </option>
    </select>
    <div class="w-full text-xs sm:text-sm">
      <p v-show="isFocused">Введите значение:</p>
      <p :class="getInputClass()">
        {{ value }}
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'InputBlock',
  props: {
    unit: String,
    value: String,
    units: Array,
    isFocused: Boolean
  },
  emits: [ 'update:unit' ],
  methods: {
    getInputClass() {
      return `h-7 mt-2 px-1 text-xl leading-6 ${this.isFocused ? 'border border-green-400' : ''} rounded`;
    }
  }
});
</script>
