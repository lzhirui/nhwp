<template>
  <div class="tc-toast" :class="['is-' + position]" :id="uuid" v-show="visible">
    <div class="tc-toast__content" v-if="$slots.default">
      <slot></slot>
    </div>
    <div class="tc-toast__content" v-else>
      <i v-if="icon" :class="iconsClass"></i>
      <div class="tc-toast__content--text" v-if="msg" v-text="msg"></div>
    </div>
  </div>
</template>

<script>
import Popup from '@/utils/popup'
import uuid from '@/utils/util'
export default {
  name: 'Toast',
  props: {
    modal: {
      default: true
    },
    icon: {
      type: String,
      default: ''
    },
    msg: {
      type: [String, Number],
      default: ''
    },
    duration: {
      type: Number,
      default: 0
    },
    position: {
      // top, left, bottom
      type: String,
      default: 'center'
    },
    callback: Function,
    visible: Boolean
  },
  mixins: [uuid, Popup],
  data() {
    return {
      // visible: false
    }
  },
  beforeDestroy() {
    if (this.$_timer) {
      clearTimeout(this.$_timer)
    }
    if (this.visible) {
      this.closeToast()
    }
  },
  computed: {
    iconsClass() {
      let _icon
      if (this.icon === 'loading') {
        _icon = 'tc-icon-' + this.icon
      } else {
        _icon = 'tc-toast__content--icon tc-icon-' + this.icon
      }
      return _icon
    }
  },
  methods: {
    fire() {
      if (this.$_timer) {
        clearTimeout(this.$_timer)
      }
      if (this.visible && this.duration) {
        this.$_timer = setTimeout(() => {
          this.closeToast()
        }, this.duration)
      }
    },
    showToast() {
      this.visible = true
      this.fire()
    },
    closeToast() {
      this.visible = false
      typeof this.callback == 'function' && this.callback()
    }
  }
}
</script>

<style lang="scss">
@import '../../../assets/scss/mixins/mixins';
@import '../../../assets/scss/common/var';

@include b(toast) {
  /*min-width: 7.6em;*/
  /*min-height: 7.6em;*/
  max-width: 80%;
  padding-top: 15px;
  box-sizing: border-box;
  border-radius: $--border-radius-small;
  overflow: hidden;
  backface-visibility: hidden;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: $--toast-background;
  color: $--color-white;
  pointer-events: none;
  z-index: $--index-popper;
  @include e(content) {
    padding: 0 15px 20px 15px;
    /*line-height: 0.44rem;*/
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    font-size: $--font-size-base;
    @include m(text) {
      padding-top: 20px;
    }
    @include m(icon) {
      font-size: 40px;
    }
  }
}
</style>
