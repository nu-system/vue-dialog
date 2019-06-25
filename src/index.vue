<template>
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
</template>

<script>
    export default {
        name: 'NuDialog',
        data() {
            return {
                show: false,
                render: this.open
            }
        },
        props: {
            isPortal: {
                type: Boolean,
                default: true
            },
            open: Boolean,
            position: {
                type: String,
                default: 'middle'
            },
            beforeClose: Function,
            speed: {
                type: Number,
                default: 200
            }
        },
        watch: {
            open(val) {
                val ? this.handleOpen() : this.handleClose();
            }
        },
        mounted() {
            this.open && this.handleOpen();
        },
        destroyed() {
            // if appendToBody is true, remove DOM node after destroy
            if (this.$el && this.$el.parentNode) {
                this.$el.parentNode.removeChild(this.$el);
            }
        },
        computed: {
            computedClass() {
                const ret = {};

                // 是否显示弹窗
                if (this.show) {
                    ret._on = true;
                }

                // 设置弹窗方向
                if (this.position) {
                    ret['_' + this.position] = true;
                }
                return ret;
            }
        },
        methods: {
            handleOpen() {
                this.render = true;
                document.body.appendChild(this.$el);
                // 动画的时间
                setTimeout(() => {
                    this.show = true;
                }, 16);
                document.body.classList.add('nu_dialog_open');
            },
            dialogClose() {
                this.show = false;
                // 动画的时间
                setTimeout(() => {
                    this.render = false;
                }, this.speed);
                document.body.classList.remove('nu_dialog_open');
            },
            handleClose() {
                if (typeof this.beforeClose === 'function') {
                    const ret = this.beforeClose();
                    /* 只有当用户的返回值为false 的时候才会阻止弹窗关闭 */
                    if (ret !== false) {
                        this.dialogClose();
                    }
                } else {
                    this.dialogClose();
                }
            },
            /**
             * 当遮罩点击当时候触发
             * @param e
             */
            handleClickMask(e) {
                e.preventDefault();
                this.$emit('onClickMask');
            },
            /**
             * 当关闭按钮点击的时候触发
             * @param e
             */
            handleClickClose(e) {
                e.preventDefault();
                this.$emit('update:open', false);
            }
        }
    }
</script>
