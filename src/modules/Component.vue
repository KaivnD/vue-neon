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
import Input from './Input'
import Output from './Output'
export default {
  name: 'v-comp',
  props: {
    index: Number,
    name: String,
    pos: Object,
    task: Object,
    input: Array,
    output: Array
  },
  data () {
    return {
      loc: this.pos
    }
  },
  computed: {
    taskInColor () {
      return (this.task.in === null) ? 'white' : '#EE7434'
    },
    taskOutColor () {
      return (this.task.out === null) ? 'white' : '#EE7434'
    }
  },
  methods: {
    onNodeClickR (args) {
      this.$emit('node-click-r', {
        g: this.index,
        n: args.index,
        io: args.io
      })
    },
    onMouseDn (e) {
      e.stopPropagation()
      this.$emit('on-comp-mouse-dn', {
        i: this.index,
        pos: {x: e.pageX, y: e.pageY},
        offset: {x: e.offsetX, y: e.offsetY}
      })
    },
    onMouseUp (e) {
      e.stopPropagation()
      this.$emit('on-comp-mouse-up')
    },
    onNodeMouseDn (args) {
      this.$emit('node-mouse-dn', {
        pos: args.pos,
        g: this.index,
        n: args.index,
        io: args.io
      })
    },
    onNodeMouseUp (args) {
      this.$emit('node-mouse-up', {
        g: this.index,
        n: args.index,
        io: args.io
      })
    },
    onTaskInDn (e) {
      e.stopPropagation()
      this.$emit('task-in-dn', {
        pos: {x: e.pageX, y: e.pageY},
        g: this.index
      })
    },
    onTaskInUp (e) {
      e.stopPropagation()
      this.$emit('task-in-up', {
        g: this.index
      })
    },
    onTaskOutDn (e) {
      e.stopPropagation()
      this.$emit('task-out-dn', {
        pos: {x: e.pageX, y: e.pageY},
        g: this.index
      })
    },
    onTaskOutUp(e) {
      e.stopPropagation()
      this.$emit('task-out-up', {
        g: this.index
      })
    }
  },
  components: { Input, Output }
}
</script>

<style lang="scss" scoped>
.node {
  border: 1px solid #000;
  border-radius: 9px;
  display: inline-block;
  height: auto;
  padding-bottom: 6px;
  -webkit-box-sizing: content-box;
  box-sizing: content-box;
  -webkit-box-shadow: 4px 5px 9px rgba(0, 0, 0, 0.5);
  box-shadow: 4px 5px 9px rgba(0, 0, 0, 0.5);
  background: #595857;

  .name {
    border-top: 1px solid #ccc;
    color: #fff;
    text-align: center;
    font-size: 18px;
    border-radius: 9px 9px 0 0;
    padding: 2px 8px;
    overflow: hidden;
    background: #2d2f30;

    .in::before {
      content: "";
      cursor: pointer;
      display: inline-block;
      position: absolute;
      top: 22px;
      left: 1px;
      border-top: 9px solid transparent;
      border-bottom: 9px solid transparent;
      border-left: 12px solid var(--task-in-stat);
    }

    .out::after {
      content: "";
      cursor: pointer;
      display: inline-block;
      position: absolute;
      top: 22px;
      right: 1px;
      border-top: 9px solid transparent;
      border-bottom: 9px solid transparent;
      border-right: 12px solid var(--task-out-stat);
    }
  }

  .content {
    margin-top: 16px;
    display: table;
    width: 100%;
    min-width: 200px;

    .column {
      display: table-cell;
      white-space: nowrap;

      &:not(:last-child) {
        padding-right: 20px;
      }
    }
  }
}
</style>
