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
    <InputBlock
      ref="up"
      :units="units"
      :onFocus="() => onFocus('up', 'down')"
      v-model:unit="unitOne"
      @update:unit="setFocus"
      v-model:value="valueOne"
      @update:value="changeValue"
    />
    <InputBlock
      ref="down"
      :units="units"
      :onFocus="() => onFocus('down', 'up')"
      v-model:unit="unitTwo"
      @update:unit="setFocus"
      v-model:value="valueTwo"
      @update:value="changeValue"
    />
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
import InputBlock from './InputBlock.vue';
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
    Message,
    InputBlock
  },
  data() {
    return {
      currentBase: '',
      disabledButtons: ['negate', 'up'],
      unitOne: '',
      unitTwo: '',
      valueOne: '1',
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
    document.addEventListener('click', this.outClickHandler);
  },
  unmounted() {
    document.removeEventListener('click', this.outClickHandler);
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
      }
    },

    setFocus() {
      this.$refs[this.currentFocus].focusInput();
    },

    outClickHandler(e) {
      if (!e.target.closest('.input-block_select')) {
        this.setFocus();
      }
    },

    convert(value, sourceUnit, targetUnit) {
      try {
        this[this.targetBlock.value] = value ? evaluate(`number(${value} ${sourceUnit}, ${targetUnit})`).toString() : '';
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
  }
}
</style>
