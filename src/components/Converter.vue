<template>
  <div class="converter flex flex-col justify-between h-full divide-y divide-gray-200 dark:divide-gray-500">
    <div class="converter_menu flex justify-between w-full overflow-x-auto pb-4">
      <button
        v-for="item in menuItems" :key="item"
        :class="`converter_menu_button py-1 px-2.5 bg-opacity-0 text-xs text-gray-400 border border-gray-400 border-opacity-${currentBase === item ? '100' : '0'} rounded-3xl`"
        @click="changeBase(item)"
      >
        {{ item }}
      </button>
    </div>
    <InputBlock
      ref="up"
      :units="units"
      :isFocused="this.currentFocus === 'up'"
      v-model:unit="blocks.up.unit"
      @update:unit="convert"
      :value="blocks.up.value"
    />
    <InputBlock
      ref="down"
      :units="units"
      :isFocused="this.currentFocus === 'down'"
      v-model:unit="blocks.down.unit"
      @update:unit="convert"
      :value="blocks.down.value"
    />
    <ControlPad tool='converter' :disabledButtons="disabledButtons" :onClick="onPressKey" />
  </div>
</template>

<script>
import { evaluate } from 'mathjs';
import ControlPad from './ControlPad.vue';
import InputBlock from './InputBlock.vue';
import { bases } from '../utils';

export default {
  name: 'Converter',
  props: {
    setMessage: Function
  },
  components: {
    ControlPad,
    InputBlock
  },
  data() {
    return {
      currentBase: '',
      blocks: {
        up: { value: '', unit: '' },
        down: { value: '', unit: '' }
      },
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
      return this.blocks[this.currentFocus];
    },
    targetBlock() {
      return this.blocks[Object.keys(this.blocks).filter((key) => key !== this.currentFocus)];
    },
    disabledButtons() {
      let arr = [];
      if (this.currentBase !== 'Температура') {
        arr.push('negate');
      }
      arr.push(this.currentFocus);
      return arr;
    }
  },
  mounted() {
    this.changeBase(Object.keys(bases)[0]);
    document.addEventListener('keydown', (e) => this.onPressKey(e.key));
  },
  methods: {
    changeBase(base) {
      this.currentBase = base;
      this.blocks.up.unit = this.units[0].symbol;
      this.blocks.down.unit = this.units[1].symbol;
      this.clearInputs();
      this.currentFocus = 'up';
    },

    clearInputs() {
      this.blocks.up.value = '';
      this.blocks.down.value = '';
    },

    onPressKey(value) {
      if (value === 'up' || value === 'down') {
        this.currentFocus = value;
      } else if (value === 'back' || value === 'Backspace') {
        this.currentBlock.value = this.currentBlock.value.slice(0, this.currentBlock.value.length - 1);
      } else if (value === 'c') {
        this.clearInputs();
      } else if (value === 'negate') {
        if (this.currentBlock.value.startsWith('-')) {
          this.currentBlock.value = this.currentBlock.value.slice(1);
        } else {
          this.currentBlock.value = '-' + this.currentBlock.value;
        }
      } else {
        if (value === '.') {
          if (this.currentBlock.value) {
            this.currentBlock.value += value;
          } else {
            this.currentBlock.value = '0.';
          }
        } else {
          this.currentBlock.value += value;
        }
        if (this.currentBlock.value.length > 20) {
          this.currentBlock.value = this.currentBlock.value.slice(0, this.currentBlock.value.length - 1);
          this.setMessage('Нельзя ввести больше 20 знаков');
        }
      }
      this.convert();
    },

    convert() {
      try {
        this.targetBlock.value = this.currentBlock.value ? evaluate(`number(${this.currentBlock.value} ${this.currentBlock.unit}, ${this.targetBlock.unit})`).toString() : '';
      }
      catch {
        this.setMessage('Некорректное выражение');
      }
    }
  }
}
</script>
