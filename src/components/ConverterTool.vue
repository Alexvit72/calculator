<template>
  <div class="flex flex-col justify-between h-full divide-y divide-gray-200 dark:divide-gray-500">
    <div id="converter_menu" class="flex justify-between w-full overflow-x-auto pb-4">
      <button
        v-for="item in menuItems" :key="item"
        :class="getMenuButtonClass(item)"
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
    <ControlPad tool='Конвертер' :disabledButtons="disabledButtons" @click="onPressKey($event)" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { evaluate } from 'mathjs';
import ControlPad from './ControlPad.vue';
import InputBlock from './InputBlock.vue';
import { bases } from '../utils';

type Block = {
  [key: string]: string;
};

type Blocks = {
  [key: string]: Block;
};

export default defineComponent({
  name: 'ConverterTool',
  components: {
    ControlPad,
    InputBlock
  },
  emits: [ 'update-message' ],
  data() {
    const blocks: Blocks = {
      up: { value: '', unit: '' },
      down: { value: '', unit: '' }
    };
    return {
      currentBase: '',
      blocks: blocks,
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
      return this.blocks[Object.keys(this.blocks).filter((key) => key !== this.currentFocus)[0]];
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
    getMenuButtonClass(item: string) {
      return `py-1 px-2.5 bg-opacity-0 text-xs text-gray-400 rounded-3xl ${this.currentBase === item ? 'border border-gray-400' : ''}`;
    },

    changeBase(base: string) {
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

    onPressKey(value: string) {
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
          this.$emit('update-message' ,'Нельзя ввести больше 20 знаков');
        }
      }
      this.convert();
    },

    convert() {
      try {
        this.targetBlock.value = this.currentBlock.value ? evaluate(`number(${this.currentBlock.value} ${this.currentBlock.unit}, ${this.targetBlock.unit})`).toString() : '';
      }
      catch {
        this.$emit('update-message' ,'Некорректное выражение');
      }
    }
  }
});
</script>
