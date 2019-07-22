<template>
  <div 
  @mousedown.left="onMouseDn"
  @mouseup.left="onMouseUp"
  :style="`position: absolute; touch-action: none; transform: translate(${loc.x}px, ${loc.y}px);`"
  >
    <div class="node">
      <h1>Inputer</h1>
    </div>
  </div>
</template>

<script>
import Component from '../libs/Component'
import Output from '../modules/Output'
export default {
  name: 'n-inputer',
  mixins: [Component],
  components: { Output }
}
</script>

<style lang="scss" scoped>
@import '../styles/main.scss';
</style>
