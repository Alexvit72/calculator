<template>
  <div class="message">
    {{ message }}
  </div>
</template>

<script>
export default {
  name: 'Message',
  props: {
    message: String
  }
}
</script>

<style lang="scss">
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
</style>
