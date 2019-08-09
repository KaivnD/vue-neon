export default {
  props: {
    index: Number,
    name: String,
    pos: Object,
    task: Object,
    input: Array,
    output: Array,
    platform: String,
    uuid: String,
    version: String,
    ext: String,
    table: Array,
    options: Object
  },
  data () {
    return {
      loc: this.pos,
      selected: false
    }
  },
  computed: {
    taskInColor: {
      get: function () {
        return (this.task.in === undefined || this.task.in === null)
                ? 'white' : '#EE7434'
      },
      set: function (nv) {
        return nv
      }
    },
    taskOutColor: {
      get: function () {
        return (this.task.out === undefined || this.task.out === null)
                ? 'white' : '#EE7434'
      },
      set: function (nv) {
        return nv
      }
    }
  },
  watch: {
    task: function (nV, oV) {
      if (nV.in !== null) this.taskInColor = '#EE7434'
      else this.taskInColor = 'white'
      if (nV.out !== null) this.taskOutColor = '#EE7434'
      else this.taskOutColor = 'white'
    },
    output: {
      // 监听输出端变化， 有新的变化就通知编辑器刷新链接
      handler (nV, oV) {
        this.$emit('on-comp-output-change', {
          index: this.index,
          value: nV
        })
      },
      deep: true
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
        pos: { x: e.pageX, y: e.pageY },
        offset: { x: e.offsetX, y: e.offsetY }
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
        pos: { x: e.pageX, y: e.pageY },
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
        pos: { x: e.pageX, y: e.pageY },
        g: this.index
      })
    },
    onTaskOutUp (e) {
      e.stopPropagation()
      this.$emit('task-out-up', {
        g: this.index
      })
    }
  }
}
