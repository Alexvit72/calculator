<template>
  <div class="input-block">
    <select v-model="unit" class="input-block_select" @change="setFocus">
      <option v-for="unit in units" :key="unit.symbol" :value="unit.symbol">
        {{ unit.name }}
      </option>
    </select>
    <input
      type="text"
      ref="up"
      :value="value"
      @input="changeValue"
      @focus="onFocus('up', 'down')"
    />
  </div>
</template>

<script>
export default {
  name: 'InputBlock',
  props: {
    isDark: Boolean
  },
  data() {
    return {
    }
  },
  computed: {
  },
  methods: {
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
</style>
