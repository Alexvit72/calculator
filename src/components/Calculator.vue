<template>
  <div class="calculator">
    <div v-show="showedHistory" class="history">
      <div class="action close" @click="closeHistory">
        &#215;
      </div>
      <div v-show="!!history.length" class="action" @click="clearHistory">
        <img src="../assets/icons/delete.svg" alt="">
      </div>
      <div class="history_content">
        <p
          v-for="item in history"
          :key="item"
          @click="onClickHistoryItem(item)"
        >
          {{ item }}
        </p>
      </div>
    </div>
    <div v-show="!showedHistory" class="current">
      <div class="current_data">
        <div class="action" @click="showHistory">
          <img src="../assets/icons/clock.svg" alt="">
        </div>
        <div class="expression">
          <p>{{ expression }}</p>
        </div>
      </div>
      <div class="current_result">
        {{ result }}
      </div>
    </div>
    <div class="control">
      <button
        v-for="button in buttons" :key="button.sign"
        v-html="button.sign"
        :class="`control_button ${button.type} ${isDark ? 'dark' : ''}`"
        @click="onPressKey(button.value)"
      >
      </button>
    </div>
    <div v-if="!!message" class="message">
      {{ message }}
    </div>
  </div>
</template>

<script>
import { evaluate } from 'mathjs';
import { formatResult } from '../utils';
import { calculatorButtons } from '../utils';

export default {
  name: 'Calculator',
  props: {
    isDark: Boolean
  },
  data() {
    return {
      buttons: calculatorButtons,
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
        catch(error) {
          this.result = '';
          this.lastBracket = null;
          this.message = 'Некорректное выражение';
          setTimeout(() => {this.message = ''}, 1300);
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
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  .history {
    height: 230px;
    display: flex;
    align-items: flex-start;
    @media (max-width: 600px) {
      height: calc(100vh - ((100vw - 5.5rem) / 4 * 5 + 4rem) - 7rem);
    }
    @media (max-height: 650px) {
      height: calc(100vh - ((100vw - 5.5rem) / 4 * 5 + 4rem) - 4rem);
    }
    &_content {
      width: 100%;
      max-height: calc(100% - 1.5rem);
      overflow-y: auto;
      @media (max-height: 650px) {
        font-size: .8rem;
      }
      p {
        margin-top: .5rem;
        cursor: pointer;
      }
    }
  }
  .current {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    &_data {
      display: flex;
      .expression {
        width: 100%;
        height: 120px;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        @media (max-width: 600px) {
          height: calc(100vh - ((100vw - 5.5rem) / 4 * 5 + 4rem) - 13rem);
        }
        @media (max-height: 650px) {
          height: calc(100vh - ((100vw - 5.5rem) / 4 * 5 + 4rem) - 7rem);
        }
        p {
          max-height: 100%;
          overflow-y: auto;
        }
      }
    }
    &_result {
      display: flex;
      justify-content: flex-end;
      margin-bottom: 1rem;
      font-size: 5rem;
      color: $primary-color;
      overflow: hidden;
      @media (max-width: 600px) {
        font-size: 4rem;
      }
      @media (max-height: 650px) {
        margin-bottom: .5rem;
        font-size: 3rem;
      }
    }
  }
  .action {
    cursor: pointer;
    margin: 0 .5rem;
    &.close {
      font-size: 2.8rem;
      line-height: 0.63;
    }
  }
  .control {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 1rem;
    place-items: center;
    &_button {
      width: calc((400px - 5.5rem) / 4);
      height: calc((400px - 5.5rem) / 4);
      border: none;
      border-radius: 50%;
      background: none;
      font-size: 2rem;
      color: $default-color;
      cursor: pointer;
      @media (max-width: 400px) {
        width: calc((100vw - 5.5rem) / 4);
        height: calc((100vw - 5.5rem) / 4);
      }
      @media (max-height: 650px) {
        width: calc((90vw - 5.5rem) / 4);
        height: calc((90vw - 5.5rem) / 4);
      }
      &.operation {
        color: $primary-color;
        &.dark {
          background: #fff;
        }
      }
      &.delete {
        color: $dark-gray-color;
        &.dark {
          color: #fff;
          background: $default-color;
        }
      }
    }
  }
  .message {
    position: absolute;
    bottom: 20%;
    left: 0;
    right: 0;
    background: $default-color;
    color: #fff;
    text-align: center;
    padding: 1rem;
    border-radius: 10px;
  }
}
</style>
