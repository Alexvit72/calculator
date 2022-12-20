<template>
  <div :class="`my_calculator_bg ${isDark ? 'dark' : ''}`">
    <div class="menu">
      <div class="menu_tool">
        <button
          :class="tool === 'calculator' ? 'active' : ''"
          @click="changeTool('calculator')"
        >
          Калькулятор
        </button>
        <button
          :class="tool === 'converter' ? 'active' : ''"
          @click="changeTool('converter')"
        >
          Конвертер
        </button>
      </div>
      <button class="menu_theme" @click="isDark = !isDark">
        <img v-show="isDark" src="./assets/icons/sun.svg" alt="">
        <img v-show="!isDark" src="./assets/icons/moon.svg" alt="">
      </button>
    </div>
    <div class="main">
      <Calculator v-if="tool === 'calculator'" :isDark="isDark" />
      <Converter v-if="tool === 'converter'" :isDark="isDark" :setMessage="setMessage" />
      <Message v-if="!!message" :message="message" />
    </div>
  </div>
</template>

<script>
import Calculator from './components/Calculator.vue';
import Converter from './components/Converter.vue';
import Message from './components/Message.vue';

export default {
  name: 'App',
  components: {
    Calculator,
    Converter,
    Message
  },
  data() {
    return {
      isDark: false,
      tool: 'calculator',
      message: ''
    };
  },
  methods: {
    changeTool(tool) {
      this.tool = tool;
    },
    setMessage(message) {
      this.message = message;
      setTimeout(() => {
        this.message = '';
      }, 1300);
    },

  }
}
</script>

<style lang="scss">
body {
  margin: 0;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    width: 0;
  }
  &:hover, &:focus, :active {
    background: none;
  }
}

#app {
  background: $light-gray-color;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  @media (max-width: 600px) {
    display: block;
  }
  .my_calculator_bg {
    display: flex;
    flex-direction: column;
    background: #fff;
    width: 400px;
    height: 800px;
    padding: 0 1.25rem 2rem;
    border-radius: 20px;
    @media (max-width: 600px) {
      width: 100vw;
      height: 100vh;
      border-radius: 0;
    }
    @media screen and (min-device-aspect-ratio: 5/9) {
      padding-bottom: 1.5rem;
    }
    .menu {
      display: flex;
      justify-content: space-between;
      width: 100%;
      margin: 2rem 0 1rem;
      @media screen and (min-device-aspect-ratio: 5/9) {
        margin: 1.5rem 0 .8rem;
      }
      &_tool {
        button {
          cursor: pointer;
          margin: 0 .5rem;
          padding: .5rem 0.8rem;
          background: none;
          color: $default-color;
          font-weight: 700;
          border: none;
          border-radius: 1.25rem;
          @media screen and (min-device-aspect-ratio: 5/9) {
            font-size: .8rem;
            padding: .3rem 0.6rem;
          }
          &.active {
            background: $primary-color;
            color: #fff;
          }
        }
      }
      &_theme {
        cursor: pointer;
        border: none;
        background: none;
        margin-left: 1rem;
        padding-top: 5px;
        @media screen and (min-device-aspect-ratio: 5/9) {
          padding-top: 0;
        }
      }
    }
    .main {
      width: 100%;
      flex-grow: 1;
      position: relative;
      text-align: right;
      color: $default-color;
    }
    &.dark {
      background: $dark-background-color;
      .menu_tool .active {
        background: #fff;
        color: $primary-color;
      }
      .main {
        color: $light-gray-color;
      }
    }
  }
}
</style>
