<template>
  <div :class="`bg ${isDark ? 'dark' : ''}`">
    <div class="menu">
      <div class="menu_tool">
        <button
          :class="tool === 'calculator' ? 'active' : ''"
          @click="changeTool('calculator')"
        >
          Calculator
        </button>
        <button
          :class="tool === 'converter' ? 'active' : ''"
          @click="changeTool('converter')"
        >
          Converter
        </button>
      </div>
      <button class="menu_theme" @click="isDark = !isDark">
        <img v-show="isDark" src="./assets/icons/sun.svg" alt="">
        <img v-show="!isDark" src="./assets/icons/moon.svg" alt="">
      </button>
    </div>
    <div class="main">
      <Calculator v-show="tool === 'calculator'" :isDark="isDark" />
      <Converter v-show="tool === 'converter'" :isDark="isDark" />
    </div>
  </div>
</template>

<script>
import Calculator from './components/Calculator.vue';
import Converter from './components/Converter.vue';

export default {
  name: 'App',
  components: {
    Calculator,
    Converter
  },
  data() {
    return {
      isDark: false,
      tool: 'calculator'
    };
  },
  methods: {
    changeTool(tool) {
      this.tool = tool;
    }
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
}

.bg {
  display: flex;
  flex-direction: column;
  background: #fff;
  width: 100%;
  height: 100%;
  max-width: 400px;
  max-height: 800px;
  padding: 0 1.25rem 2rem;
  border-radius: 20px;
  @media (max-width: 600px) {
    max-width: 100vw;
    max-height: 100vh;
    border-radius: 0;
  }
  @media (max-height: 650px) {
    padding-bottom: 1.5rem;
  }
  .menu {
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin: 2rem 0 1rem;
    @media (max-height: 650px) {
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
        @media (max-height: 650px) {
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
      @media (max-height: 650px) {
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
  }
}
</style>
