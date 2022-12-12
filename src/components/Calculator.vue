<template>
  <div class="calculator">
    <div v-if="showedHistory" class="history">
      <p
        v-for="item in history"
        :key="item"
        @click="onClickHistoryItem(item)"
      >
        {{ item }}
      </p>
    </div>
    <div v-if="!showedHistory" class="expression">
      {{ expression }}
    </div>
    <div class="result">
      {{ result }}
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

export default {
  name: 'Calculator',
  props: {
    isDark: Boolean,
    showedHistory: Boolean
  },
  data() {
    return {
      buttons: [
        { sign: 'C', type: 'delete', value: 'c' },
        { sign: '&#8676;', type: 'delete', value: 'back' },
        { sign: '&#37;', type: 'operation', value: ' % ' },
        { sign: '&#247;', type: 'operation', value: ' / ' },

        { sign: '7', type: 'number', value: '7' },
        { sign: '8', type: 'number', value: '8' },
        { sign: '9', type: 'number', value: '9' },
        { sign: '&#215;', type: 'operation', value: ' * ' },

        { sign: '4', type: 'number', value: '4' },
        { sign: '5', type: 'number', value: '5' },
        { sign: '6', type: 'number', value: '6' },
        { sign: '&#8722;', type: 'operation', value: ' - ' },

        { sign: '1', type: 'number', value: '1' },
        { sign: '2', type: 'number', value: '2' },
        { sign: '3', type: 'number', value: '3' },
        { sign: '&#43;', type: 'operation', value: ' + ' },

        { sign: '&#40;&#41;', type: 'number', value: '()' },
        { sign: '0', type: 'number', value: '0' },
        { sign: '&#183;', type: 'number', value: '.' },
        { sign: '&#61;', type: 'operation', value: ' = ' }
      ],
      result: '',
      history: [],
      expression: '',
      lastBracket: null,
      message: '',
      operations: [' % ', ' * ', ' / ', ' + ', ' - '],
      isCalculated: false
    }
  },
  methods: {
    onPressKey(value) {
      if (value === 'back') {
        this.result = String(this.result).slice(0, this.result.length - 1);
        if (this.isCalculated) {
          this.expression = '';
          this.isCalculated = false;
        }
      } else if (value === 'c') {
        this.result = '';
        this.expression = '';
      } else if (value === ' = ') {
        if (this.result) this.expression += this.result;
        this.calculate(this.expression);
        this.history.push(this.expression);
      } else if (this.operations.includes(value)) {
        if (this.isCalculated) {
          this.expression = this.result + value;
          this.isCalculated = false;
        } else {
          this.expression += this.result + value;
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
              this.expression += this.result + ')';
              this.result = '';
            } else {
              this.lastBracket = '(';
              this.result += '(';
            }
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
      try {
        this.result = evaluate(expression);
        this.isCalculated = true;
      }
      catch {
        this.result = '';
        this.message = 'Некорректное выражение';
        setTimeout(() => {this.message = ''}, 1500);
      }
    },

    onClickHistoryItem(item) {
      this.calculate(item);
    }
  }
}
</script>

<style lang="scss">
.calculator {
  position: relative;
  margin-bottom: 2rem;
  text-align: right;
  @media (max-height: 650px) {
    margin-bottom: 1.5rem;
  }
  .history, .expression {
    color: #979797;
  }
  .history {
    height: calc((1rem + 10px) * 3);
    overflow-y: auto;
    @media (max-height: 650px) {
      height: calc((.8rem + 10px) * 3);
      font-size: .8rem;
    }
    p {
      margin-top: .5rem;
      cursor: pointer;
      @media (max-height: 650px) {
        margin-top: .3rem;
      }
    }
  }
  .result {
    display: flex;
    justify-content: flex-end;
    margin: 1rem 0 2rem;
    font-size: 5rem;
    color: #03ab95;
    height: calc(5rem + 10px);
    white-space: nowrap;
    @media (max-width: 600px) {
      margin: 1rem 0 1rem;
      font-size: 4rem;
      height: calc(4rem + 10px);
    }
    @media (max-height: 650px) {
      margin: .5rem 0 .5rem;
      font-size: 3rem;
      height: calc(3rem + 10px);
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
      color: #979797;
      cursor: pointer;
      @media (max-width: 400px) {
        width: calc((100vw - 5.5rem) / 4);
        height: calc((100vw - 5.5rem) / 4);
      }
      &.operation {
        color: #03ab95;
        &.dark {
          background: #fff;
        }
      }
      &.delete {
        color: #515c58;
        &.dark {
          color: #fff;
          background: #979797;
        }
      }
    }
  }
  .message {
    position: absolute;
    bottom: 20%;
    left: 0;
    right: 0;
    background: #979797;
    color: #fff;
    text-align: center;
    padding: 1rem;
    border-radius: 10px;
  }
}
</style>
