export default {
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
