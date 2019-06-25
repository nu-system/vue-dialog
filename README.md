# nu-dialog-vue

<iframe src="https://codesandbox.io/embed/vue-template-phc9q?autoresize=1&fontsize=14&hidenavigation=1&module=%2Fsrc%2Fcomponents%2FDialog.vue&view=preview" title="nu-dialog-vue" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>

<ClientOnly>
<DialogDemo/>
</ClientOnly>

NU 「 no-ui 」 组件库系统 nu-system，弹窗组件 VUE 版本。

`@y-fe/nu-dialog-vue` 本身不会输出任何样式，基础样式来自于 [nu-dialog](https://yued-fe.github.io/nu-system/packages/dialog/) , 

## 怎么用？

```bash
$ npm i @y-fe/nu-dialog-vue @y-fe/nu-dialog

// or yarn
$ yarn add @y-fe/nu-dialog-vue @y-fe/nu-dialog
```

### 二次封装

```vue

<script>
  import NuDialog from "@y-fe/nu-dialog-vue"
  import "@y-fe/nu-dialog"
  import "@y-fe/nu-dialog/css/position/middle.css"
  // import "@y-fe/nu-dialog/css/position/top.css"
  // import "@y-fe/nu-dialog/css/position/left.css"
  // import "@y-fe/nu-dialog/css/position/right.css"
  // import "@y-fe/nu-dialog/css/position/bottom.css"

  export default NuDialog;
</script>

<style>
  /* 规避 position:fixed 的 bug 问题 */
  .nu_dialog_wrap{
    position: absolute;
  }
</style>
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

