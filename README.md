# Dialog

[![npm package](https://img.shields.io/npm/v/@_nu/vue-dialog.svg)](https://www.npmjs.org/package/@_nu/vue-dialog)
[![github](https://img.shields.io/github/stars/nu-system/vue-dialog.svg?style=social)](https://github.com/nu-system/vue-dialog)

<iframe src="https://codesandbox.io/embed/nudialogvue-phc9q?autoresize=1&fontsize=14&hidenavigation=1&view=preview" title="nu-dialog-vue" allow="geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>

组件库母版系统 [NU-system](https://nu-system.github.io/) 弹窗组件 VUE 实现。

`nu-vue-dialog` 本身不会输出任何样式，基础样式来自于 [nu-dialog](https://nu-system.github.io/vanilla/dialog/) , 

## 怎么用？

```bash
$ yarn add @_nu/vue-dialog @_nu/vanilla-dialog
```

### 二次封装

```vue

<script>
  import NuDialog from "@_nu/vue-dialog"
  export default NuDialog;
</script>

<!--样式引用-->
<style src="@_nu/vanilla-dialog"></style>
<style src="@_nu/vanilla-dialog/css/position/middle.css"></style>
<!-- 
<style src="@_nu/vanilla-dialog/css/position/top.css"></style>
<style src="@_nu/vanilla-dialog/css/position/left.css"></style>
<style src="@_nu/vanilla-dialog/css/position/right.css"></style>
<style src="@_nu/vanilla-dialog/css/position/bottom.css"></style> 
-->
```


### 使用

```vue
<template>
  <div id="app">    
    <button type="button" @click="dialogOpen = true">打开弹窗</button>            
    <Dialog :open.sync="dialogOpen" :position="dialogPosition">
      <select @change="handlePosition">
        <option value="middle">居中显示</option>
        <option value="top">居上显示</option>
        <option value="left">居左显示</option>
        <option value="right">居右显示</option>
        <option value="bottom">居下显示</option>
      </select>
    </Dialog>
  </div>
</template>

<script>
  import Dialog from "@components/Dialog";
  
  export default {
    name: 'app',
    data() {
      return {
        dialogOpen: false,
        dialogPosition: 'middle'
      }
    },
    components: {
      Dialog
    },
    methods: {
        handlePosition(e) {
         this.dialogPosition = e.target.value;
        }
    }
}
</script>
```

nu-dialog-vue 会动态的把弹窗添加到 `body` 标签之后。

## Api

| props   |      类型      | 默认值  |功能 |
|:----------|:-------------|:------:|------:|
| :open.sync |  boolean | - | 显示弹窗|
| :position |  strong | 'middle' | 弹窗位置|
| :beforeClose |  Func | - | 在关闭之前要做的事 |
| :isPortal | boolean | 'true' | 是否需要传送门 |
| :speed | Number | 200 | 动画时长 |

**position 可选值**: `middle`,`top`,`right`,`left`,`bottom`;

**beforeClose**: 如果返回值为 `false` 那么弹窗不会关闭;

## Dom 结构

```vue
<div v-if="render" class="nu_dialog_wrap" :class="computedClass">
  <slot name="mask">
    <label class="nu_dialog_mask" @click="handleClickMask"/>
  </slot>
  <slot name="dialog">
    <div class="nu_dialog">
      <slot name="close">
        <label class="nu_dialog_close" @click="handleClickClose">
          <slot name="close-icon">&times;</slot>
        </label>
      </slot>
      <slot></slot>
    </div>
  </slot>
</div>
```

`nu-dialog-vue` 几乎所有都子组件都可以用 `slot` 重写。
