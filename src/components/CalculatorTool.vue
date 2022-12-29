<template>
  <div class="calculator flex flex-col justify-between h-full">
    <div v-show="showedHistory" class="history flex items-start">
      <div class="cursor-pointer my-0 mx-2 text-4xl leading-5 dark:text-gray-400" @click="closeHistory">
        &#215;
      </div>
      <div v-show="!!history.length" class="cursor-pointer my-1 mx-2" @click="clearHistory">
        <img src="../assets/icons/delete.svg" alt="">
      </div>
      <div class="history_content w-full max-h-full overflow-y-auto">
        <p
          v-for="item in history"
          :key="item"
          class="mt-2 cursor-pointer"
          @click="onClickHistoryItem(item)"
        >
          {{ item }}
        </p>
      </div>
    </div>
    <div v-show="!showedHistory" class="current flex flex-col flex-grow justify-between">
      <div class="current_data flex">
        <div class="cursor-pointer my-0 mx-2" @click="showHistory">
          <img src="../assets/icons/clock.svg" alt="">
        </div>
        <div class="expression flex flex-col justify-end w-full sm:h-36 sm:text-xl">
          <p class="max-h-full overflow-y-auto">{{ expression }}</p>
        </div>
      </div>
      <div class="current_result flex justify-end text-green-400 overflow-x-hidden text-6xl sm:text-7xl">
        {{ result }}
      </div>
    </div>
    <ControlPad tool="Калькулятор" @click="onPressKey($event)" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { evaluate } from 'mathjs';
import { formatResult } from '../utils';
import ControlPad from './ControlPad.vue';

export default defineComponent({
  name: 'CalculatorTool',
  components: {
    ControlPad
  },
  emits: [ 'update-message' ],
  data() {
    const history: string[] = [];
    return {
      result: '',
      history: history,
      expression: '',
      isOpenBracket: false,
      operations: ['%', '*', '/', '+', '-'],
      isCalculated: false,
      showedHistory: false
    }
  },
  mounted() {
    document.addEventListener('keydown', (e) => this.onPressKey(e.key));
  },
  methods: {
    onPressKey(value: string) {
      if (value === 'back' || value === 'Backspace') {
        if (this.result[this.result.length - 1] === '(' || this.result[this.result.length - 1] === ')') {
          this.isOpenBracket = false;
        }
        this.result = this.result.slice(0, this.result.length - 1);
        if (this.isCalculated) {
          this.expression = '';
          this.isCalculated = false;
        }
      } else if (value === 'c') {
        this.result = '';
        this.expression = '';
        this.isOpenBracket = false;
        this.isCalculated = false;
      } else if (value === '=' || value === 'Enter') {
        if (this.result) this.expression += this.result;
        this.calculate(this.expression);
      } else if (this.operations.includes(value)) {
        if (this.isCalculated) {
          this.expression = this.result + ` ${value} `;
          this.isCalculated = false;
        } else {
          this.expression += this.result + ` ${value} `;
        }
        this.result = '';
      } else {
        if (isFinite(+value)) {
          if (this.result) {
            this.result += value;
          } else {
            this.result = value;
          }
          if (this.isCalculated) {
            this.expression = '';
            this.isCalculated = false;
          }
        } else {
          if (value === '()') {
            if (this.isOpenBracket) {
              this.isOpenBracket = false;
              this.result += ')';
            } else {
              this.isOpenBracket = true;
              this.result += '(';
            }
          } else if (value === '(') {
            this.isOpenBracket = true;
            this.result += value;
          } else if (value === ')') {
            this.isOpenBracket = false;
            this.result += value;
          } else if (value === '.') {
            if (this.result) {
              this.result += value;
            } else {
              this.result = '0.';
            }
          }
        }
      }
    },

    calculate(expression: string) {
      if (expression) {
        try {
          this.result = formatResult(evaluate(expression).toString(), 2, 8);
          this.history.push(expression);
          this.isCalculated = true;
          this.$emit('update-message', '');
        }
        catch {
          this.result = '';
          this.expression = '';
          this.isOpenBracket = false;
          this.$emit('update-message' ,'Некорректное выражение');
        }
      }
    },

    showHistory() {
      this.showedHistory = true;
    },

    closeHistory() {
      this.showedHistory = false;
    },

    onClickHistoryItem(item: string) {
      this.calculate(item);
      this.expression = '';
      this.closeHistory();
    },

    clearHistory() {
      this.history = [];
      this.closeHistory();
    }
  }
});
</script>

<style lang="scss">
.history {
  height: calc(800px - ((400px - 6rem) / 4 * 5 + 5rem) - 7rem);
}
@media (max-width: 600px) {
  .history {
    height: calc(100vh - ((100vw - 6rem) / 4 * 5 + 5rem) - 7rem);
  }
  .expression {
    height: calc(100vh - ((100vw - 6rem) / 4 * 5 + 5rem) - 12rem);
  }
  @media screen and (min-device-aspect-ratio: 5/9) {
    .history {
      height: calc(100vh - ((90vw - 6rem) / 4 * 5 + 5rem) - 8rem);
      &_content {
        font-size: .8rem;
      }
    }
    .expression {
      height: calc(100vh - ((90vw - 6rem) / 4 * 5 + 5rem) - 12rem);
    }
    .current_result {
      font-size: 3rem;
      line-height: 1;
    }
  }
}
</style>
