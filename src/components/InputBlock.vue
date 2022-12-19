<template>
  <div class="input-block">
    <select :value="unit" class="input-block_select" @change="$emit('update:unit', $event.target.value)">
      <option v-for="unit in units" :key="unit.symbol" :value="unit.symbol">
        {{ unit.name }}
      </option>
    </select>
    <input
      type="text"
      ref="input"
      :value="value"
      @input="$emit('update:value', $event.target.value)"
      @focus="onFocus"
    />
  </div>
</template>

<script>
export default {
  name: 'InputBlock',
  props: {
    unit: String,
    value: String,
    units: Array,
    onFocus: Function
  },
  emits: [ 'update:unit', 'update:value' ],
  methods: {
    focusInput() {
      this.$refs.input.focus();
    }
  }
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
  input {
    text-align: right;
    width: 100%;
    font-size: 1.5rem;
    caret-color: $primary-color;
  }
  select, input, select:focus, select:hover, input:focus, input:hover {
    border: none;
    outline: none;
  }
  select, input {
    background: none;
    color: $default-color;
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
  }
}
</style>
