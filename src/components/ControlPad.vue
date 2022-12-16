<template>
  <div class="control">
    <button
      v-for="button in buttons" :key="button.sign"
      v-html="button.sign"
      :class="`control_button ${button.type} ${isDark ? 'dark' : ''}`"
      :disabled="getDisabled(button.value)"
      @click="() => onClick(button.value)"
    >
    </button>
  </div>
</template>

<script>
import { buttons } from '../utils';

export default {
  name: 'ControlPad',
  props: {
    isDark: Boolean,
    onClick: Function,
    tool: String,
    disabledButtons: Array
  },
  computed: {
    buttons() {
      return buttons[this.tool];
    }
  },
  methods: {
    getDisabled(value) {
      if (this.tool === 'converter') {
        return (this.disabledButtons ? this.disabledButtons.includes(value) : false);
      } else return false;
    }
  }
}
</script>

<style lang="scss">
.control {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 1rem;
  place-items: center;
  &_button {
    width: calc((400px - 5.5rem) / 4);
    height: calc((400px - 5.5rem) / 4);
    border: none;
    border-radius: 50%;
    background: none;
    font-size: 2rem;
    color: $default-color;
    cursor: pointer;
    &.dark {
      color: $light-gray-color;
    }
    @media (max-width: 400px) {
      width: calc((100vw - 5.5rem) / 4);
      height: calc((100vw - 5.5rem) / 4);
    }
    @media (max-height: 650px) {
      width: calc((90vw - 5.5rem) / 4);
      height: calc((90vw - 5.5rem) / 4);
    }
    &.operation {
      color: $primary-color;
      &.dark {
        background: #fff;
      }
    }
    &.delete {
      color: $dark-gray-color;
      &.dark {
        color: #fff;
        background: $default-color;
      }
    }
    &[disabled] {
      color: $light-gray-color;
      &.dark {
        color: $dark-gray-color;
        &.operation {
          color: $light-gray-color;
        }
      }
    }
  }
}
</style>
