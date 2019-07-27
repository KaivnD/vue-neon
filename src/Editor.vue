<template>
    <div ref="neon-warpper" class="neon-warpper"
      :class="{hand: isPan}"
      :style="`height: ${height}; width: ${width}`"
      @mousedown.right="onEditorMouseDown($event)"
      @mousemove="onEditorMouseMove($event)"
      @mouseup="onEditorMouseUp($event)"
      @contextmenu="onEditorCtxMenu($event)"
      @mousewheel.stop="onEditorMouseWell($event)"
    >
      <div ref="editor" class="neon-editor"
      :style="`transform: translate(${this.transform.x}px, ${this.transform.y}px) scale(${this.transform.z});transform-origin:0 0;`"
      >
        <Grid />
        <div style="position: absolute; z-index: -1;">
          <svg class="connection">
            <path
            v-if="ghostWrie !== null"
            :d="`M${ghostWrie.s.x},${ghostWrie.s.y}C${ghostWrie.s.x + 66},
            ${ghostWrie.s.y},${ghostWrie.e.x - 66},
            ${ghostWrie.e.y},${ghostWrie.e.x},${ghostWrie.e.y}`"
            stroke-width="2"
            stroke="#fff" fill="none" stroke-miterlimit="10"/>
            <Connection
              v-for="(item, index) in wires" :key="index"
              :index="index"
              :task="item.t"
              :dash="item.d"
              :width="item.w"
              :color="item.c"
              :start="item.s"
              :end="item.e"
            />
          </svg>
        </div>
        <component
        ref="comps"
        v-for="(gen, i) in gens" :key="i"
        :index="i"
        :is="gen.component"
        :name="gen.name"
        :pos="gen.pos"
        :task="gen.task"
        :input="gen.input"
        :output="gen.output"
        :platform="gen.platform"
        :uuid="gen.uuid"
        :ext="gen.file_ext"
        :table="gen.table"
        :version="gen.version"
        @on-comp-mouse-dn="onCompMouseDn"
        @on-comp-mouse-up="onCompMouseUp"
        @node-mouse-dn="onNodeMouseDn"
        @node-mouse-up="onNodeMouseUp"
        @task-in-up="onTaskInUp"
        @task-out-dn="onTaskOutDn"
        @node-click-r="onNodeClickR"
        @comp-click-db="onCompClickDB"
        @menu-item-click="onMenuItemClick"
        />
      </div>
    </div>
</template>

<script>
import Connection from './modules/Connection'
import Vector from './libs/Vector'
import Grid from './modules/Grid'
export default {
  name: 'n-editor',
  props: {
    width: String,
    height: String,
    sensitive: Number,
    state: Object,
    minZoom: Number,
    maxZoom: Number,
    generators: Array,
    components: {}
  },
  data () {
    return {
      isPan: false,
      isDrag: '',
      wires: [],
      ghostWrie: null,
      gens: this.generators,
      dragNode: null,
      dragComp: null,
      dragCompPos: null,
      dragCompOffset: null,
      pointerStart: [],
      startPosition: {},
      transform: this.state,
      selectedGen: null
    }
  },
  computed: {
    comps () {
      return this.$refs.comps
    }
  },
  mounted () {
    this.updateConnection()
    document.addEventListener('keydown', this.bindKey)
  },
  methods: {
    bindKey (e) {
      if (e.ctrlKey && e.keyCode === 83) {
        // Ctrl + S 保存功能
        this.$emit('ctrl-s')
      } else if (e.keyCode === 46) {
        this.removeConnection(this.gens[this.selectedGen])
        let tmp = []
        this.gens.forEach((gen, i) => {
          if (this.selectedGen !== i) {
            tmp.push(gen)
          }
        })
        this.gens = tmp
        this.updateConnection()
      } else if (e.keyCode === 27) {
        if (this.isDragging === 'Node') {
          this.ghostWrie = null
          this.isDrag = ''
        }
      } else if (e.keyCode === 192) {
        this.$emit('backquote')
      } else if (e.keyCode === 116) {
        this.$emit('f5')
      }
    },
    onEditorCtxMenu (e) {
      e.stopPropagation()
      if (e.button === 2) {
        e.preventDefault()
      }
    },
    onCompMouseDn (args) {
      this.isDrag = 'Comp'
      this.dragComp = this.comps[args.i]
      this.dragCompPos = this.comps[args.i].loc
      this.dragCompOffset = args.pos
      this.selectedGen = args.i
      this.comps.forEach(element => {
        element.selected = false
      })
      this.comps[args.i].selected = true
    },
    onCompMouseUp (args) {
      this.isDrag = null
      this.dragComp = null
      this.dragCompPos = null
      this.dragCompOffset = null
      this.ghostWrie = null
    },
    onCompClickDB (args) {
      this.$emit('comp-click-db', args)
    },
    onNodeMouseDn (args) {
      if (args.io === 'output') {
        this.isDrag = 'Node'
        this.dragNode = args
      }
    },
    onNodeMouseUp (args) {
      const cS = this.dragNode
      if (this.isDrag === 'Node' && cS.io !== args.io) {
        if (args.io === 'input') {
          this.gens[args.g].input[args.n].connection.push(cS)
          this.gens[cS.g].output[cS.n].connection.push(args)
        } else if (args.io === 'output') {
          this.gens[args.g].output[args.n].connection.push(cS)
          this.gens[cS.g].input[cS.n].connection.push(args)
        }

        this.ghostWrie = null
        this.isDrag = null
        this.updateConnection()
      }
    },
    onNodeClickR (args) {
      this.gens[args.g][args.io][args.n].connection.forEach(c => {
        this.gens[c.g][c.io][c.n].connection = []
      })
      this.gens[args.g][args.io][args.n].connection = []
      this.updateConnection()
    },
    onTaskInUp (args) {
      const cS = this.dragNode
      if (this.isDrag === 'Task') {
        this.gens[args.g].task.in = cS.g
        this.gens[cS.g].task.out = args.g
      }
      this.isDrag = null
      this.ghostWrie = null
      this.dragNode = null
      this.updateConnection()
    },
    onTaskOutDn (args) {
      this.isDrag = 'Task'
      this.dragNode = args
    },
    onEditorMouseDown (e) {
      e.preventDefault()
      e.stopPropagation()
      this.isPan = true
      this.isDrag = 'Editor'
      this.pointerStart = { x: e.pageX, y: e.pageY }
      this.startPosition = { ...this.transform }
    },
    onEditorMouseUp (e) {
      if (e.toElement.tagName === "rect" && this.comps !== undefined) {
        // 确保鼠标抬起瞬间不是生成器
        this.comps.forEach(element => {
          element.selected = false
        })
      }
      console.log(e)
      this.isPan = false
      this.isDrag = null
      this.dragNode = null
      this.dragComp = null
      this.dragCompPos = null
      this.dragCompOffset = null
      this.ghostWrie = null
      this.$emit('mouse-up', e)
    },
    onEditorMouseMove (e) {
      e.preventDefault()
      const mousePos = { x: e.pageX, y: e.pageY }
      let zoom = this.transform.z
      switch (this.isDrag) {
        case 'Editor': {
          let delta = Vector.sub(mousePos, this.pointerStart)
          zoom = Math.sqrt(zoom, 2)
          delta = Vector.mult(delta, zoom)
          const pos = Vector.add(this.startPosition, delta)

          this.transform.x = pos.x
          this.transform.y = pos.y
          break
        }
        case 'Comp': {
          let delta = Vector.sub(mousePos, this.dragCompOffset)
          delta = Vector.div(delta, zoom)
          this.dragComp.loc = Vector.add(this.dragCompPos, delta)
          break
        }
        case 'Node': {
          const comp = this.comps[this.dragNode.g]
          const el = comp.$refs[this.dragNode.io][this.dragNode.n].$el
          const pos = {
            x: comp.loc.x + el.offsetLeft + el.offsetWidth - 10,
            y: comp.loc.y + el.offsetTop + el.offsetHeight / 2
          }
          if (this.dragNode.io === 'input') {
            pos.x = comp.loc.x + el.offsetLeft + 10
          }
          let delta = Vector.sub(mousePos, this.dragNode.pos)
          delta = Vector.div(delta, zoom)
          this.ghostWrie = {
            s: pos,
            e: Vector.add(pos, delta)
          }
          break
        }
        case 'Task': {
          const comp = this.comps[this.dragNode.g]
          const el = comp.$refs['name']
          const pos = {
            x: comp.loc.x + el.offsetLeft + el.offsetWidth,
            y: comp.loc.y + el.offsetTop + el.offsetHeight
          }
          let delta = Vector.sub(mousePos, this.dragNode.pos)
          delta = Vector.div(delta, zoom)
          this.ghostWrie = {
            s: pos,
            e: Vector.add(pos, delta)
          }
          break
        }
      }
      this.$emit('mouse-move', e)
    },
    onEditorMouseWell (e) {
      // 来自rete.js
      e.preventDefault()
      const rect = this.$refs.editor.getBoundingClientRect()
      const wheelDelta = e.wheelDelta
      const delta = (wheelDelta ? wheelDelta / 120 : -e.deltaY / 3) * this.sensitive
      const ox = (rect.left - e.pageX) * delta
      const oy = (rect.top - e.pageY) * delta
      let zoom = this.transform.z * (1 + delta)
      zoom = (zoom < this.minZoom) ? this.minZoom : ((zoom > this.maxZoom) ? this.maxZoom : zoom)
      const z = this.transform.z

      const d = (z - zoom) / ((z - zoom) || 1)

      this.transform.z = zoom || 1
      this.transform.x += ox * d
      this.transform.y += oy * d
    },
    updateConnection () {
      this.wires = []
      this.gens.forEach((gen, i) => {
        if (gen.task !== undefined) {
          if (gen.task.in !== null) {
            this.wires.push({
              t: true,
              d: true,
              w: 6,
              c: '#141414',
              s: { g: gen.task.in },
              e: { g: i }
            })
          }
        }
        if (gen.input !== undefined) {
          gen.input.forEach((input, j) => {
            if (input.connection.length !== 0) {
              input.connection.forEach(cn => {
                this.wires.push({
                  t: false,
                  d: false,
                  w: 2,
                  c: '#eee',
                  s: cn,
                  e: { g: i, n: j, io: 'input' }
                })
              })
            }
          })
        }
      })
    },
    removeConnection (gen) {
      console.log(gen)
      this.wries = []
      if (gen.input instanceof Array) {
        gen.input.forEach(input => {
          if (input.connection.length !== 0) {
            input.connection.forEach(cn => {
              this.gens[cn.g].output[cn.n].connection = []
            })
          }
        })
      }
      if (gen.output instanceof Array) {
        gen.output.forEach((output, j) => {
          if (output.connection.length !== 0) {
            output.connection.forEach(cn => {
              this.gens[cn.g].input[cn.n].connection = []
            })
          }
        })
      }
    },
    onMenuItemClick (args) {
      this.$emit('menu-item-click', args)
    }
  },
  components: { Grid, Connection }
}
</script>

<style lang="scss" scoped>
  * {
    user-select: none;
    box-sizing: border-box;
  }

  .hand {
    cursor: pointer;
  }

  .neon-warpper {
    display: block;
    background-color: #303030;
    position: relative;
    overflow: hidden;

    .neon-editor {
      position: absolute;

      .connection {
        overflow: visible !important;
        position: absolute;
        z-index: -1;
        pointer-events: none;
      }

      & > * {
        position: absolute;
      }
    }
  }
</style>
