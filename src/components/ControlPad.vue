<template>
  <div class="control">
    <button
      v-for="button in buttons" :key="button.sign"
      v-html="button.sign"
      :class="`control_button ${button.type} ${isDark ? 'dark' : ''}`"
      @click="() => onClick(button.value)"
    >
    </button>
  </div>
</template>

<script>
import { converterButtons } from '../utils';

export default {
  name: 'ControlPad',
  props: {
    isDark: Boolean,
    onClick: Function
  },
  data() {
    return {
      buttons: converterButtons
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
  }
}
</style>
