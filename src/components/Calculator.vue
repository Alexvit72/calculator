<template>
  <div class="calculator flex flex-col justify-between h-full">
    <div v-show="showedHistory" class="history flex items-start h-56">
      <div class="cursor-pointer my-0 mx-2 text-4xl leading-5 dark:text-gray-400" @click="closeHistory">
        &#215;
      </div>
      <div v-show="!!history.length" class="cursor-pointer my-1 mx-2" @click="clearHistory">
        <img src="../assets/icons/delete.svg" alt="">
      </div>
      <div class="history_content w-full overflow-y-auto">
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
        <div class="expression flex flex-col justify-end w-full sm:h-32">
          <p class="max-h-full overflow-y-auto">{{ expression }}</p>
        </div>
      </div>
      <div class="current_result flex justify-end mb-4 text-green-600 overflow-hidden text-6xl sm:text-7xl">
        {{ result }}
      </div>
    </div>
    <ControlPad :isDark="isDark" tool="calculator" :onClick="onPressKey" />
    <Message v-if="!!message" :message="message" />
  </div>
</template>

<script>
import { evaluate } from 'mathjs';
import { formatResult } from '../utils';
import ControlPad from './ControlPad.vue';
import Message from './Message.vue';

export default {
  name: 'Calculator',
  props: {
    isDark: Boolean
  },
  components: {
    ControlPad,
    Message
  },
  data() {
    return {
      result: '',
      history: [],
      expression: '',
      lastBracket: null,
      message: '',
      operations: ['%', '*', '/', '+', '-'],
      isCalculated: false,
      showedHistory: false
    }
  },
  mounted() {
    document.addEventListener('keydown', (e) => this.onPressKey(e.key));
  },
  methods: {
    onPressKey(value) {
      if (value === 'back' || value === 'Backspace') {
        if (this.result.at(-1) === '(' || this.result.at(-1) === ')') {
          this.lastBracket = null;
        }
        this.result = this.result.slice(0, this.result.length - 1);
        if (this.isCalculated) {
          this.expression = '';
          this.isCalculated = false;
        }
      } else if (value === 'c') {
        this.result = '';
        this.expression = '';
        this.lastBracket = null;
        this.isCalculated = false;
      } else if (value === '=' || value === 'Enter') {
        if (this.result) this.expression += this.result;
        this.calculate(this.expression);
        if (!this.message) {
          this.history.push(this.expression);
        }
        this.isCalculated = true;
      } else if (this.operations.includes(value)) {
        if (this.isCalculated) {
          this.expression = this.result + ` ${value} `;
          this.isCalculated = false;
        } else {
          this.expression += this.result + ` ${value} `;
        }
        this.result = '';
      } else {
        if (isFinite(value)) {
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
            if (this.lastBracket === '(') {
              this.lastBracket = ')';
              this.result += ')';
            } else {
              this.lastBracket = '(';
              this.result += '(';
            }
          } else if (value === '(' || value === ')') {
            this.lastBracket = value;
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

    calculate(expression) {
      if (expression) {
        try {
          this.result = formatResult(evaluate(expression).toString(), 2, 8);
          this.message = '';
        }
        catch {
          this.result = '';
          this.lastBracket = null;
          this.message = 'Некорректное выражение';
          setTimeout(() => { this.message = '' }, 1300);
        }
      }
    },

    showHistory() {
      this.showedHistory = true;
    },

    closeHistory() {
      this.showedHistory = false;
    },

    onClickHistoryItem(item) {
      this.calculate(item);
      this.expression = '';
      this.closeHistory();
    },

    clearHistory() {
      this.history = [];
      this.closeHistory();
    }
  }
}
</script>

<style lang="scss">
.calculator {
  .history {
    &_content {
      max-height: calc(100% - 1.5rem);
    }
    @media (max-width: 600px) {
      height: calc(100vh - ((100vw - 5.5rem) / 4 * 5 + 4rem) - 7rem);
      @media screen and (min-device-aspect-ratio: 5/9) {
        height: calc(100vh - ((100vw - 5.5rem) / 4 * 5 + 4rem) - 4rem);
        &_content {
          font-size: .8rem;
        }
      }
    }
  }
  .current {
    &_data {
      .expression {
        @media (max-width: 600px) {
          height: calc(100vh - ((100vw - 5.5rem) / 4 * 5 + 4rem) - 13rem);
          @media screen and (min-device-aspect-ratio: 5/9) {
            height: calc(100vh - ((100vw - 5.5rem) / 4 * 5 + 4rem) - 7rem);
            &_result {
              margin-bottom: .5rem;
              font-size: 3rem;
            }
          }
        }
      }
    }
  }
}
</style>
