<template>
  <div class="input-block">
    <select :value="unit" class="input-block_select" @change="$emit('update:unit', $event.target.value)">
      <option v-for="unit in units" :key="unit.symbol" :value="unit.symbol">
        {{ unit.name }}
      </option>
    </select>
    <div class="value">
      <p v-show="isFocused">Введите значение:</p>
      <p :class="`text ${isFocused ? 'focused' : ''}`">{{ value }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'InputBlock',
  props: {
    unit: String,
    value: String,
    units: Array,
    isFocused: Boolean
  },
  emits: [ 'update:unit' ]
}
</script>

<style lang="scss">
.input-block {
  flex-grow: 1;
  padding-bottom: 1rem;
  border-bottom: 1px solid $light-gray-color;
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  .value {
    width: 100%;
    font-size: .8rem;
    @media screen and (min-device-aspect-ratio: 5/9) {
      font-size: .6rem;
    }
    .text {
      height: 30px;
      margin-top: .5rem;
      padding: 0 5px;
      font-size: 1.5rem;
      border: 1px solid #fff;
      border-radius: 4px;
      &.focused {
        border-color: $primary-color;
      }
    }
  }
  select, select:focus, select:hover {
    border: none;
    outline: none;
  }
  select {
    background: none;
    font-size: 1rem;
    color: $default-color;
    @media screen and (min-device-aspect-ratio: 5/9) {
      font-size: .8rem;
    }
  }
}
.dark {
  .input-block {
    border-color: $dark-gray-color;
    select, input {
      color: $light-gray-color;
    }
    option {
      background: $dark-background-color;
    }
    .text {
      border: 1px solid $dark-background-color;
    }
  }
}
</style>
