<template>
  <div class="converter">
    <ControlPad :isDark="isDark" :onClick="onPressKey" />
    <div v-if="!!message" class="message">
      {{ message }}
    </div>
  </div>
</template>

<script>
//import { evaluate } from 'mathjs';
import ControlPad from './ControlPad.vue';

export default {
  name: 'Converter',
  props: {
    isDark: Boolean
  },
  components: {
    ControlPad
  },
  data() {
    return {
      result: '',
      message: '',
      operations: ['%', '*', '/', '+', '-']
    }
  },
  mounted() {
    document.addEventListener('keydown', (e) => this.onPressKey(e.key));
  },
  methods: {
    onPressKey(value) {
      console.log('value', value);
    },

  }
}
</script>
