<template>
  <div class="converter">
    <div class="converter_menu">
      <button
        v-for="item in menuItems" :key="item"
        :class="`converter_menu_button ${currentBase === item ? 'active' : ''}`"
        @click="changeBase(item)"
      >
        {{ item }}
      </button>
    </div>
    <div class="input-block">
      <select v-model="unitOne" class="input-block_select">
        <option disabled value="">Выберите единицу</option>
        <option v-for="unit in units"  :key="unit.symbol" :value="unit.symbol">
          {{ unit.name }}
        </option>
      </select>
      <input
        type="text"
        ref="up"
        :value="valueOne"
        @input="changeValueOne"
        @focus="onFocus('up', 'down')"
      />
    </div>
    <div class="input-block">
      <select v-model="unitTwo" class="input-block_select">
        <option disabled value="">Выберите единицу</option>
        <option v-for="unit in units"  :key="unit.symbol" :value="unit.symbol">
          {{ unit.name }}
        </option>
      </select>
      <input
        type="text"
        ref="down"
        v-model="valueTwo"
        @input="changeValueTwo"
        @focus="onFocus('down' ,'up')"
      />
    </div>
    <ControlPad
      :isDark="isDark"
      tool='converter'
      :disabledButtons="disabledButtons"
      :onClick="onPressKey"
    />
    <Message v-if="!!message" :message="message" />
  </div>
</template>

<script>
import { evaluate } from 'mathjs';
import ControlPad from './ControlPad.vue';
import Message from './Message.vue';
//import InputBlock from './InputBlock.vue';
import { bases } from '../utils';

export default {
  name: 'Converter',
  props: {
    isDark: Boolean
  },
  components: {
    ControlPad,
    Message
  },
  data() {
    return {
      currentBase: 'Area',
      disabledButtons: ['negate', 'up'],
      unitOne: '',
      unitTwo: '',
      valueOne: '',
      valueTwo: '',
      message: '',
    }
  },
  computed: {
    menuItems() {
      return Object.keys(bases);
    },
    units() {
      return bases[this.currentBase] || [];
    }
  },
  updated() {
    this.$refs.up.focus();
  },
  methods: {
    changeBase(base) {
      this.currentBase = base;
      if (this.currentBase !== 'Temperature') {
        if (!this.disabledButtons.includes('negate')) this.disabledButtons.push('negate');
      } else {
        this.disabledButtons.splice(this.disabledButtons.indexOf('negate'), 1);
      }
    },

    onPressKey(value) {
      console.log('value', value);
      if (value === 'up' || value === 'down') {
        this.changeFocus(value);
      }
    },

    convert(value, sourceUnit, targetUnit) {
      return evaluate(`number(${value} ${sourceUnit}, ${targetUnit})`);
    },

    changeValueOne(e) {
      this.valueOne = e.target.value;
      this.valueTwo = this.convert(this.valueOne, this.unitOne, this.unitTwo);
    },

    changeValueTwo() {
      this.valueOne = this.convert(this.valueTwo, this.unitTwo, this.unitOne);
    },

    changeFocus(value) {
      this.$refs[value].focus();
    },

    onFocus(value, alternateValue) {
      this.disabledButtons.push(value);
      this.disabledButtons.splice(this.disabledButtons.indexOf(alternateValue), 1);
    }
  }
}
</script>

<style lang="scss">
.converter {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  &_menu {
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin-bottom: 1rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid $light-gray-color;
    &_button {
      cursor: pointer;
      padding: .5rem 0.8rem;
      background: none;
      color: $default-color;
      border: 1px solid rgba(0,0,0,0);
      border-radius: 1.25rem;
      @media (max-height: 650px) {
        font-size: .8rem;
        padding: .3rem 0.6rem;
      }
      &.active {
        border-color: $default-color;
      }
    }
  }
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
}
.dark {
  .converter {
    &_menu {
      border-color: $dark-gray-color;
      &_button {
        color: $light-gray-color;
        &.active {
          border-color: $light-gray-color;
        }
      }
    }
    .input-block {
      border-color: $dark-gray-color;
      select, input {
        color: $light-gray-color;
      }
    }
  }
}
</style>
