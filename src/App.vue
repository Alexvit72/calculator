<template>
  <div :class="`my_calculator_bg ${isDark ? 'dark' : ''} w-screen h-screen`">
    <div class="flex flex-col w-full h-full sm:rounded-3xl bg-white dark:bg-gray-800 pt-0 px-5 pb-8">
      <div class="menu flex justify-between w-full mt-8 mx-0 mb-4">
        <div class="menu_tool">
          <button
            :class="`${tool === 'calculator' ? 'bg-green-400 dark:bg-white text-white dark:text-green-400' : 'text-gray-400 bg-opacity-0'} mx-2 my-0 pt-1 pb-2 px-2.5 text-xs font-bold rounded-2xl border-0`"
            @click="changeTool('calculator')"
          >
            Калькулятор
          </button>
          <button
            :class="`${tool === 'converter' ? 'bg-green-400 text-white dark:bg-white dark:text-green-400' : 'text-gray-400 bg-opacity-0'} mx-2 my-0 pt-1 pb-2 px-2.5 text-xs font-bold rounded-2xl border-0`"
            @click="changeTool('converter')"
          >
            Конвертер
          </button>
        </div>
        <button class="menu_theme border-0 bg-opacity-0 ml-4 pt-1" @click="changeDarkMode">
          <img v-show="isDark" src="./assets/icons/sun.svg" alt="">
          <img v-show="!isDark" src="./assets/icons/moon.svg" alt="">
        </button>
      </div>
      <div class="main flex-grow w-full relative text-gray-400 text-right">
        <CalculatorTool v-if="tool === 'calculator'" @update-message="setMessage($event)" />
        <ConverterTool v-if="tool === 'converter'" @update-message="setMessage($event)" />
        <ErrorMessage v-if="!!message" :message="message" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import CalculatorTool from './components/CalculatorTool.vue';
import ConverterTool from './components/ConverterTool.vue';
import ErrorMessage from './components/ErrorMessage.vue';

export default defineComponent({
  name: 'App',
  components: {
    CalculatorTool,
    ConverterTool,
    ErrorMessage
  },
  data() {
    return {
      isDark: false,
      tool: 'calculator',
      message: ''
    };
  },
  mounted() {
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      this.isDark = true;
    } else {
      this.isDark = false;
    }
  },
  methods: {
    changeTool(tool: string) {
      this.tool = tool;
    },
    setMessage(message: string) {
      this.message = message;
      setTimeout(() => {
        this.message = '';
      }, 1300);
    },
    changeDarkMode() {
      if (this.isDark) {
        localStorage.theme = 'light';
      } else {
        localStorage.theme = 'dark';
      }
      this.isDark = !this.isDark;
    }
  }
});
</script>

<style lang="scss">
* {
  -webkit-tap-highlight-color: transparent;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    width: 0;
  }
  &:focus {
    outline: none;
  }
}

#app {
  .my_calculator_bg {
    @media (min-width: 601px) {
      width: 400px;
      height: 800px;
    }
    @media (max-width: 600px) {
      @media screen and (min-device-aspect-ratio: 5/9) {
        & > div {
          padding-bottom: 1.5rem;
        }
        .menu {
          margin: 1.5rem 0 .8rem;
          &_theme {
            padding-top: 0;
          }
        }
      }
    }
  }
}
</style>
