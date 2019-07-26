<template>
  <div id="app">
    <div class="wrap">
      <button type="button" @click="dialogOpen = true">打开弹窗</button>
      <Dialog :isPortal="false" :open.sync="dialogOpen" :position="dialogPosition">
        <select @change="handlePosition">
          <option value="middle">居中显示</option>
          <option value="top">居上显示</option>
          <option value="left">居左显示</option>
          <option value="right">居右显示</option>
          <option value="bottom">居下显示</option>
        </select>
      </Dialog>
    </div>
    <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>


  </div>
</template>

<style>
  .wrap{
    background-color: red;
  }
</style>


<script>
import HelloWorld from './components/HelloWorld.vue'
import Dialog from './components/Dialog/index.vue';

export default {
  name: 'app',
  components: {
    HelloWorld,
    Dialog
  },
  data() {
    return {
      dialogOpen: false,
      dialogPosition: 'middle'
    }
  },
  methods: {
    handlePosition(e) {
      this.dialogPosition = e.target.value;
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
