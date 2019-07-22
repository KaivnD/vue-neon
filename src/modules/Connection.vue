<template>
    <path :d="`M${s.x},${s.y}C${s.x + 66},${s.y},${e.x - 66},${e.y},${e.x},${e.y}`"
    :stroke-dasharray="dash ? '1, 10' : '0'"
    stroke-linecap="round"
    @dblclick="onClickDB"
    :stroke="color" fill="none" :stroke-width="width" stroke-miterlimit="10"/>
</template>

<script>
export default {
  name: 'wries',
  props: {
    index: Number,
    task: Boolean,
    dash: Boolean,
    width: Number,
    color: String,
    start: Object,
    end: Object
  },
  computed: {
    s: function () {
      return this.task ? this.getTaskPos(this.start.g, 'out') : this.getNodePos(this.start)
    },
    e: function () {
      return this.task ? this.getTaskPos(this.end.g, 'in') : this.getNodePos(this.end)
    }
  },
  data: function () {
    return {
      genComps: this.$parent.$parent.$refs.gen
    }
  },
  methods: {
    onClickDB () {
      console.log(123)
      this.$emit('click-db', this.index)
    },
    getNodePos (args) {
      let comp = this.$parent.comps[args.g]
      let el = comp.$refs[args.io][args.n].$el
      let pos = {
        x: comp.loc.x + el.offsetLeft + el.offsetWidth - 9.5,
        y: comp.loc.y + el.offsetTop + el.offsetHeight/2 + 2
      }
      if (args.io === 'input') {
        pos.x = comp.loc.x + el.offsetLeft + 10
      }
      return pos
    },
    getTaskPos (g, io) {
      let comp = this.$parent.comps[g]
      let el = comp.$refs['name']
      let pos = {
        x: comp.loc.x + el.offsetLeft + el.offsetWidth + 3,
        y: comp.loc.y + el.offsetTop + el.offsetHeight
      }
      let pos2 = {
        x: comp.loc.x,
        y: comp.loc.y + el.offsetHeight
      }
      return (io === 'in') ? pos2 : pos
    }
  }
}
</script>

