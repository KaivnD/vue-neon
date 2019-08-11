<template>
  <div
  @mousedown.left="onMouseDn"
  @mouseup.left="onMouseUp"
  :style="`position: absolute; touch-action: none; transform: translate(${loc.x}px, ${loc.y}px);`"
  >
   <div class="border" v-if="selected"></div>
    <div class="node p0">
      <div class="content mt0 pt0">
        <div class="column">
          <div class="nickName">
            <i class="material-icons">content_paste</i>
            <p class="m0" ref="inputer" @focus="onFocus" @blur="onBlur" @mousedown.left="onEdit" contenteditable="true"
            style="caret-color: white;outline:0px;" v-text="(value === null) ? '点击输入内容' : value">
            </p>
          </div>
        </div>
        <div class="column">
          <Output
            style="margin-bottom: 3px;"
            ref="output"
            v-for="(item, index) in output"
            :key="index"
            :index="index"
            :connection="item.connection"
            @click-r="onNodeClickR"
            @mouse-dn="onNodeMouseDn"
            @mouse-up="onNodeMouseUp"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { CompMixin, Output } from '../../src'
export default {
  name: 'n-inputer',
  data () {
    return {
      value: null
    }
  },
  created () {
    this.value = this.output[0].value
  },
  watch: {
    value: function (val) {
      this.output[0].value = val
    }
  },
  methods: {
    onEdit (e) {
      e.stopPropagation()
    },
    onFocus () {
      if (this.value === null) {
        this.value = ''
      }
    },
    onBlur () {
      if (this.value === null) {
        this.value = '点击输入内容'
      } else {
        this.value = this.$refs.inputer.textContent
      }
    }
  },
  mixins: [CompMixin],
  components: { Output }
}
</script>

<style lang="scss" scoped>
@import './main.scss';

.column {
  vertical-align: middle;
}

.nickName {
  color: white;

  > i {
    padding: 5px;
  }

  > p {
    font-size: 12px;
    display: inline-block;
    min-width: 100px;
    position: relative;
    top: -8px;
  }
}
</style>
