<template>
  <div
  @dblclick="onClickDB"
  @mousedown.left="onMouseDn"
  @mouseup.left="onMouseUp"
  :style="`position: absolute; touch-action: none; transform: translate(${loc.x}px, ${loc.y}px);`"
  >
    <div class="node p0">
      <div class="content mt0 pt0">
        <div class="column">
          <div class="nickName">
            <i class="material-icons">attach_file</i>
            <p class="m0" ref="fileinput"
            style="caret-color: white;outline:0px;" v-text="(value === null) ? '双击指定文件' : value">
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
import Component from '../libs/Component'
import Output from '../modules/Output'
export default {
  name: 'n-file-input',
  data () {
    return {
      value: this.output[0].value
    }
  },
  watch: {
    output (val) {
      this.value = this.output[0].value
    }
  },
  methods: {
    onClickDB (e) {
      e.stopPropagation()
      this.$emit('comp-click-db', {
        name: 'n-file-input',
        index: this.index
      })
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
  mixins: [Component],
  components: { Output }
}
</script>

<style lang="scss" scoped>
@import '../styles/main.scss';

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
