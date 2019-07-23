<template>
  <div
  @mousedown.left="onMouseDn"
  @mouseup.left="onMouseUp"
  :style="`position: absolute; touch-action: none; transform: translate(${loc.x}px, ${loc.y}px);`"
  >
    <div class="node" style="padding-bottom: 2px;">
      <div class="content mt0">
        <div class="column">
          <div class="nickName">
            <i class="material-icons">content_paste</i>
            <p class="m0" @mousedown.left="onEdit" contenteditable="true" style="caret-color: white;outline:0px;">用地红线</p>
          </div>
        </div>
        <div class="column">
          <Output
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
  name: 'n-inputer',
  methods: {
    onEdit (e) {
      e.stopPropagation()
    }
  },
  mixins: [Component],
  components: { Output }
}
</script>

<style lang="scss" scoped>
@import '../styles/main.scss';
</style>
