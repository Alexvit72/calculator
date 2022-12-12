<template>
  <div :class="`bg ${isDark ? 'dark' : ''}`">
    <div class="menu">
      <button class="menu_history" @click="showedHistory = !showedHistory">
        <img :src="themeicon" alt="">
      </button>
      <button class="menu_theme" @click="isDark = !isDark">
        <img :src="themeicon" alt="">
      </button>
    </div>
    <div class="main">
      <Calculator :isDark="isDark" :showedHistory="showedHistory" />
    </div>
  </div>
</template>

<script>
import Calculator from './components/Calculator.vue';
import moon from './assets/moon.svg';
import sun from './assets/sun.svg';

export default {
  name: 'App',
  components: {
    Calculator
  },
  data() {
    return {
      isDark: false,
      showedHistory: false
    };
  },
  computed: {
    themeicon() {
      return (this.isDark ? sun : moon);
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
  background: #cccdcf;
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
  justify-content: space-between;
  align-items: center;
  background: #fff;
  width: 100%;
  height: 100%;
  max-width: 400px;
  max-height: 800px;
  padding: 0 1.25rem;
  border-radius: 20px;
  &.dark {
    background: #1c1c1c;
  }
  @media (max-width: 600px) {
    max-width: 100vw;
    max-height: 100vh;
    border-radius: 0;
  }
  .menu {
    display: flex;
    justify-content: flex-end;
    width: 100%;
    margin-top: 2rem;
    @media (max-height: 650px) {
      margin-top: 1.5rem;
    }
    &_theme, &_history {
      cursor: pointer;
      border: none;
      background: none;
      margin-left: 1rem;
    }
  }
  .main {
    width: 100%;
  }
}
</style>
