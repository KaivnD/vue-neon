<template>
  <div
  @mousedown.left="onMouseDn"
  @mouseup.left="onMouseUp"
  @dblclick="onClickDB"
  @click.right="onRightClick"
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
        <!-- <span>
          <svg class="play" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30">
            <title>运行{{name}}</title>
            <circle cx="15" cy="15" r="15"/>
            <path d="M12.16,23.25l11.25-6.49a2,2,0,0,0,.81-2.71,2.1,2.1,0,0,0-.81-.81L12.16,6.75a2,2,0,0,0-3,1.75V23.63" fill="none" stroke="#303030" stroke-linecap="round" stroke-width="2"/>
            <path d="M12.16,23.25l11.25-6.49a2,2,0,0,0,.81-2.71,2.1,2.1,0,0,0-.81-.81L12.16,6.75a2,2,0,0,0-3,1.75V23.63" fill="none" stroke="#fff" stroke-linecap="round" stroke-width="2"/>
          </svg>
        </span> -->
      </div>
      <div class="menu">
        <div class="item" 
        v-for="(item, index) in menuItems" 
        :key="index"
        :style="`left:${0}px;`"
        ></div>
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
  data () {
    return {
      menu: false,
      menuItems: [
        {
          name: '运行'
        },
        {
          name: '选项'
        },
        {
          name: '参数'
        }
      ],
      running: false
    }
  },
  methods: {
    onClickDB (e) {
      e.stopPropagation()
      this.$emit('comp-click-db', {
        name: 'n-generator',
        index: this.index
      })
    },
    onRightClick (e) {
      // e.stopPropagation()
      this.menu = true
      console.log(this.name)
    }
  },
  mixins: [Component],
  components: { Input, Output }
}
</script>

<style lang="scss" scoped>
@import '../styles/main.scss';

.runIcon {
  stroke-dasharray: 340;
  stroke-dashoffset: 40;
  animation: dash 1s ease-in-out alternate infinite;
}

@keyframes dash {
  from {
    stroke-dashoffset: 360;
  }

  to {
    stroke-dashoffset: 40;
  }
}

.menu {
  position: absolute;
  top: 0;
  left: 50%;

  .item {
    width: 30px;
    height: 30px;
    left: -15px;
    position: absolute;
    border-radius: 50%;
    background-color: slategrey;
  }
}

</style>
