<template>
  <div id="app">
    <button class="demo-button" type="button" @click="dialogOpen = true">打开弹窗</button>
    <Dialog :open.sync="dialogOpen" v-on:clickmask="dialogOpen = false"></Dialog>
  </div>
</template>

<script>
import Dialog from '../src'

export default {
  name: "app",
  data() {
    return {
      dialogOpen: false
    };
  },
  components: {
    Dialog
  }
};
</script>