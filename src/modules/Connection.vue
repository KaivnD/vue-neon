<template>
    <path :d="`M${s.x},${s.y}C${s.x + 66},${s.y},${e.x - 66},${e.y},${e.x},${e.y}`"
    :stroke-dasharray="dash ? '1, 10' : '0'"
    stroke-linecap="round"
    :stroke="color" fill="none" :stroke-width="width" stroke-miterlimit="10"/>
</template>

<script>
export default {
  name: 'wries',
  props: {
    index: Number,
    task: Boolean,
    value: String,
    dash: Boolean,
    width: Number,
    color: String,
    start: Object,
    end: Object,
    type: Number
  },
  watch: {
    value: function (nv, ov) {
      // 监听链接值端变化，变化后，通过编辑器告知其所连接端输入端抓取新的值
      this.$emit('on-conn-value-change', {
        v: nv,
        e: this.end
      })
    }
  },
  computed: {
    s: function () {
      return this.task ? this.getTaskPos(this.start, 'out') : this.getNodePos(this.start)
    },
    e: function () {
      return this.task ? this.getTaskPos(this.end, 'in') : this.getNodePos(this.end)
    }
  },
  data: function () {
    return {
      genComps: this.$parent.$parent.$refs.gen
    }
  },
  methods: {
    getNodePos (args) {
      const comp = args.comp
      const el = comp.$refs[args.io][args.n].$el
      const pos = {
        x: comp.loc.x + el.offsetLeft + el.offsetWidth - 9.5,
        y: comp.loc.y + el.offsetTop + el.offsetHeight / 2 + 2
      }
      if (args.io === 'input') {
        pos.x = comp.loc.x + el.offsetLeft + 10
      }
      return pos
    },
    getTaskPos (args, io) {
      const comp = args.comp
      const el = comp.$refs['name']
      const pos = {
        x: comp.loc.x + el.offsetLeft + el.offsetWidth + 3,
        y: comp.loc.y + el.offsetTop + el.offsetHeight
      }
      const pos2 = {
        x: comp.loc.x,
        y: comp.loc.y + el.offsetHeight
      }
      return (io === 'in') ? pos2 : pos
    }
  }
}
</script>

