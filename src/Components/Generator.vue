<template>
  <div
  @mousedown.left="onMouseDn"
  @mouseup.left="onMouseUp"
  :style="`position: absolute; touch-action: none; transform: translate(${loc.x}px, ${loc.y}px);`">
    <div class="node">
      <div class="name" ref="name">
        <span class="in"
          :style="`--task-in-stat: ${taskInColor}`"
          @mousedown.left="onTaskInDn"
          @mouseup.left="onTaskInUp"
        ></span>
        {{name}}
        <span class="out"
        :style="`--task-out-stat: ${taskOutColor}`"
          @mousedown.left="onTaskOutDn"
          @mouseup.left="onTaskOutUp"
        ></span>
      </div>
      <div class="content">
        <div class="column">
          <Input
            ref="input"
            v-for="(item, index) in input"
            :key="index"
            :index="index"
            :name="item.name"
            :connection="item.connection"
            @click-r="onNodeClickR"
            @mouse-dn="onNodeMouseDn"
            @mouse-up="onNodeMouseUp"
          />
        </div>
        <div class="column">
          <Output
            ref="output"
            v-for="(item, index) in output"
            :key="index"
            :index="index"
            :name="item.name"
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
import Input from '../modules/Input'
import Output from '../modules/Output'
import Component from '../libs/Component'
export default {
  name: 'n-generator',
  mixins: [Component],
  components: { Input, Output }
}
</script>

<style lang="scss" scoped>
@import '../styles/main.scss';
</style>
