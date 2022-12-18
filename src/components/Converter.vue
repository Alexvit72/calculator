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
      <select v-model="unitOne" class="input-block_select" @change="setFocus">
        <option v-for="unit in units" :key="unit.symbol" :value="unit.symbol">
          {{ unit.name }}
        </option>
      </select>
      <input
        type="text"
        ref="up"
        :value="valueOne"
        @input="changeValue($event.target.value)"
        @focus="onFocus('up', 'down')"
      />
    </div>
    <div class="input-block">
      <select v-model="unitTwo" class="input-block_select" @change="setFocus">
        <option v-for="unit in units" :key="unit.symbol" :value="unit.symbol">
          {{ unit.name }}
        </option>
      </select>
      <input
        type="text"
        ref="down"
        :value="valueTwo"
        @input="changeValue($event.target.value)"
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
import { bases } from '../utils';

const blocks = {
  up: { value: 'valueOne', unit: 'unitOne' },
  down: { value: 'valueTwo', unit: 'unitTwo' }
};

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
      currentBase: '',
      disabledButtons: ['negate', 'up'],
      unitOne: '',
      unitTwo: '',
      valueOne: '',
      valueTwo: '',
      message: '',
      currentFocus: 'up'
    }
  },
  computed: {
    menuItems() {
      return Object.keys(bases);
    },
    units() {
      return bases[this.currentBase] || [];
    },
    currentBlock() {
      return blocks[this.currentFocus];
    },
    targetBlock() {
      return blocks[Object.keys(blocks).filter((key) => key !== this.currentFocus)];
    }
  },
  watch: {
    isDark: 'setFocus'
  },
  mounted() {
    this.changeBase(Object.keys(bases)[0]);
    this.setFocus();
  },
  methods: {
    changeBase(base) {
      this.currentBase = base;
      this.unitOne = this.units[0].symbol;
      this.unitTwo = this.units[1].symbol;
      this.clearInputs();
      if (this.currentBase !== 'Temperature') {
        if (!this.disabledButtons.includes('negate')) this.disabledButtons.push('negate');
      } else {
        this.disabledButtons.splice(this.disabledButtons.indexOf('negate'), 1);
      }
      this.currentFocus = 'up';
      this.setFocus();
    },

    clearInputs() {
      this.valueOne = '';
      this.valueTwo = '';
    },

    setMessage(message) {
      this.message = message;
      this.$refs[this.currentFocus].blur();
      setTimeout(() => {
        this.message = '';
        this.setFocus();
      }, 1300);
    },

    onPressKey(value) {
      if (value === 'up' || value === 'down') {
        this.currentFocus = value;
      } else if (value === 'negate') {
        if (this[this.currentBlock.value].startsWith('-')) {
          this[this.currentBlock.value] = this[this.currentBlock.value].slice(1);
        } else {
          this[this.currentBlock.value] = '-' + this[this.currentBlock.value];
        }
      } else if (value === 'back') {
        this[this.currentBlock.value] = this[this.currentBlock.value].slice(0, this[this.currentBlock.value].length - 1);
      } else if (value === 'c') {
        this.clearInputs();
      } else if (value === '.') {
        if (this[this.currentBlock.value]) {
          this[this.currentBlock.value] += value;
        } else {
          this[this.currentBlock.value] = '0.';
        }
      } else {
        this[this.currentBlock.value] += value;
      }
      if (this[this.currentBlock.value].length > 20) {
        this[this.currentBlock.value] = this[this.currentBlock.value].slice(0, this[this.currentBlock.value].length - 1);
        this.setMessage('Нельзя ввести больше 20 знаков');
      } else {
        this.convert(this[this.currentBlock.value], this[this.currentBlock.unit], this[this.targetBlock.unit]);
        this.setFocus();
      }
    },

    setFocus() {
      this.$refs[this.currentFocus].focus();
    },

    convert(value, sourceUnit, targetUnit) {
      try {
        this[this.targetBlock.value] = value ? evaluate(`number(${value} ${sourceUnit}, ${targetUnit})`) : '';
        this.message = '';
      }
      catch {
        this.setMessage('Некорректное выражение');
      }
    },

    changeValue(value) {
      if (value.length > 20) {
        this.setMessage('Нельзя ввести больше 20 знаков');
      } else {
        this[this.currentBlock.value] = value;
        this.convert(this[this.currentBlock.value], this[this.currentBlock.unit], this[this.targetBlock.unit]);
      }
    },

    onFocus(value, alternateValue) {
      this.currentFocus = value;
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
    overflow-x: auto;
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
    option {
      background: $dark-background-color;
      &:hover {
        background: $primary-color;
      }
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
