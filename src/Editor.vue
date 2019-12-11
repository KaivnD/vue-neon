<template>
  <div
    :key="refreshCnt"
    ref="neon-warpper"
    class="neon-warpper"
    :class="{hand: isPan}"
    :style="`height: ${height}; width: ${width}; background-color: ${dark ? theme.background.dark : theme.background.light};`"
    @mousedown.right="onEditorMouseDown($event)"
    @mousemove="onEditorMouseMove($event)"
    @mouseup="onEditorMouseUp($event)"
    @contextmenu="onEditorCtxMenu($event)"
    @mousewheel.stop="onEditorMouseWell($event)"
  >
    <div
      ref="editor"
      class="neon-editor"
      :style="`transform: translate(${this.transform.x}px, ${this.transform.y}px) scale(${this.transform.z});transform-origin:0 0;`"
    >
      <Grid />
      <div v-if="gens != null">
        <div style="position: absolute; z-index: -1;">
          <svg class="connection">
            <path
              v-if="ghostWrie !== null"
              :d="`M${ghostWrie.s.x},${ghostWrie.s.y}C${ghostWrie.s.x + 66},
            ${ghostWrie.s.y},${ghostWrie.e.x - 66},
            ${ghostWrie.e.y},${ghostWrie.e.x},${ghostWrie.e.y}`"
              stroke-width="2"
              :stroke="this.dark
                  ? this.theme.connection.dark
                  : this.theme.connection.light"
              fill="none"
              stroke-miterlimit="10"
            />
            <Connection
              v-for="(item, index) in wires"
              :key="`cn_${index}`"
              :index="index"
              :task="item.t"
              :dash="item.d"
              :width="item.w"
              :color="item.c"
              :start="item.s"
              :end="item.e"
              :value="item.v"
              :type="item.tp"
              @on-conn-value-change="onConnValueChange"
            />
          </svg>
        </div>
        <component
          ref="comps"
          v-for="gen in gens"
          :key="gen.guid"
          :guid="gen.guid"
          :is="gen.component"
          :name="gen.name"
          :pos="gen.pos"
          :task="gen.task"
          :input="gen.input"
          :output="gen.output"
          :platform="gen.platform"
          :uuid="gen.uuid"
          :ext="gen.ext"
          :table="gen.table"
          :version="gen.version"
          :options="gen.options"
          @on-comp-mouse-dn="onCompMouseDn"
          @on-comp-mouse-up="onCompMouseUp"
          @node-mouse-dn="onNodeMouseDn"
          @node-mouse-up="onNodeMouseUp"
          @task-in-up="onTaskInUp"
          @task-out-dn="onTaskOutDn"
          @task-click-r="onTaskClickR"
          @node-click-r="onNodeClickR"
          @comp-click-db="onCompClickDB"
          @menu-item-click="onMenuItemClick"
          @on-rand-generated="onRandGen"
          @on-comp-output-change="onCompOutputChange"
          @on-comp-input-change="onCompInputChange"
          @on-comp-table-change="onCompTableChange"
        />
      </div>
      <slot />
    </div>
  </div>
</template>

<script>
import Connection from './modules/Connection'
import Vector from './libs/Vector'
import Grid from './modules/Grid'
import uuid from 'uuid'
export default {
  name: 'n-editor',
  props: {
    dark: {
      type: Boolean,
      default: true
    },
    theme: {
      type: Object,
      default () {
        return {
          background: {
            dark: '#303030',
            light: '#fff'
          },
          connection: {
            dark: '#eee',
            light: '#333'
          },
          task: {
            light: '#999',
            dark: '#141414'
          }
        }
      }
    },
    width: String,
    height: String,
    sensitive: Number,
    state: Object,
    minZoom: Number,
    maxZoom: Number,
    generators: Array
  },
  data () {
    return {
      isPan: false,
      isDrag: '',
      wires: [],
      ghostWrie: null,
      gens: null,
      dragNode: null,
      dragComp: null,
      dragCompPos: null,
      dragCompOffset: null,
      pointerStart: [],
      startPosition: {},
      transform: this.state,
      refreshCnt: 0
    }
  },
  created () {
    this.gens = this.generators
  },
  watch: {
    generators (nV, oV) {
      this.gens = nV
      if (!this.$refs.comps) return
      this.updateConnection()
    },
    gens (nv) {
      if (this.gens === null || this.gens === undefined) return
      this.gens.forEach(el => {
        if (el.guid === undefined) {
          el.guid = uuid.v1()
        }
      })
      this.$emit('on-gens-change', nv)
    }
  },
  mounted () {
    this.updateConnection()
    document.addEventListener('keydown', this.bindKey)
  },
  // 不能使用 update钩子， 一旦使用就会卡死
  methods: {
    refresh () {
      ++this.refreshCnt
    },
    bindKey (e) {
      if (e.keyCode === 46) {
        // TO DO 删除功能
        if (this.$refs.comps !== undefined) {
          const index = this.$refs.comps.findIndex(el => el.selected === true)
          if (index < 0) return
          this.removeConnection(this.gens[index])
          this.gens = this.gens.splice(index, 1)
          this.updateConnection()
        }
      } else if (e.keyCode === 27) {
        if (this.isDragging === 'Node') {
          this.ghostWrie = null
          this.isDrag = ''
        }
      }
    },
    onEditorCtxMenu (e) {
      e.stopPropagation()
      if (e.button === 2) {
        e.preventDefault()
      }
    },
    getComp (guid) {
      return this.$refs.comps.find(el => el.guid === guid)
    },
    getGen (guid) {
      return this.gens.find(el => el.guid === guid)
    },
    onCompMouseDn (args) {
      this.isDrag = 'Comp'
      this.dragComp = this.getComp(args.g)
      this.dragCompPos = this.getComp(args.g).loc
      this.$refs.comps.forEach(el => (el.selected = false))
      this.getComp(args.g).selected = true
      this.dragCompOffset = args.pos
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
    onCompOutputChange (value) {
      this.updateConnection()
      this.$emit('on-comp-output-change', value)
    },
    onCompInputChange (value) {
      this.updateConnection()
      this.$emit('on-comp-input-change', value)
    },
    onCompTableChange (value) {
      this.updateConnection()
      this.$emit('on-comp-table-change', value)
    },
    onNodeMouseDn (args) {
      if (args.io === 'output') {
        this.isDrag = 'Node'
        this.dragNode = args
      }
    },
    onNodeMouseUp (to) {
      const from = this.dragNode
      const cnFromDrag = Object.assign(
        {
          type: from !== null ? this.getGen(from.g).output[from.n].type : null,
          value: from !== null ? this.getGen(from.g).output[from.n].value : null
        },
        from
      )
      if (this.isDrag === 'Node' && from.io !== to.io) {
        if (to.io === 'input') {
          this.getGen(to.g).input[to.n].connection.push(cnFromDrag)
          this.getGen(from.g).output[from.n].connection.push(to)
        }

        this.ghostWrie = null
        this.isDrag = null
        this.updateConnection()
      }
    },
    onNodeClickR (args) {
      this.getGen(args.g)[args.io][args.n].connection.forEach(c => {
        this.getGen(c.g)[c.io][c.n].connection = []
      })
      this.getGen(args.g)[args.io][args.n].connection = []
      this.updateConnection()
    },
    onTaskClickR (args) {
      const io = this.getGen(args.g).task[args.io]
      if (args.io === 'in') {
        this.getGen(io).task.out = null
        this.getGen(args.g).task.in = null
      } else {
        this.getGen(io).task.in = null
        this.getGen(args.g).task.out = null
      }
      this.updateConnection()
    },
    onTaskInUp (args) {
      const cS = this.dragNode
      if (this.isDrag === 'Task') {
        const originTask = this.getGen(cS.g).task
        if (originTask.out !== null) {
          this.getGen(originTask.out).task.in = null
        }
        this.getGen(args.g).task.in = cS.g
        this.getGen(cS.g).task.out = args.g
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
      if (e.toElement.tagName === 'rect' && this.$refs.comps !== undefined) {
        // 确保鼠标抬起瞬间不是生成器
        this.$refs.comps.forEach(element => {
          element.selected = false
        })
      }
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
          const comp = this.getComp(this.dragNode.g)
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
          const comp = this.getComp(this.dragNode.g)
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
      const delta =
        (wheelDelta ? wheelDelta / 120 : -e.deltaY / 3) * this.sensitive
      const ox = (rect.left - e.pageX) * delta
      const oy = (rect.top - e.pageY) * delta
      let zoom = this.transform.z * (1 + delta)
      zoom =
        zoom < this.minZoom
          ? this.minZoom
          : zoom > this.maxZoom
          ? this.maxZoom
          : zoom
      const z = this.transform.z

      const d = (z - zoom) / (z - zoom || 1)

      this.transform.z = zoom || 1
      this.transform.x += ox * d
      this.transform.y += oy * d
    },
    updateConnection () {
      this.wires = []
      if (!this.gens || !(this.gens instanceof Array)) return

      for (const gen of this.gens) {
        if (gen.task && gen.task.in) {
          this.wires.push({
            t: true,
            d: true,
            w: 6,
            c: this.dark ? this.theme.task.dark : this.theme.task.light,
            s: { g: gen.task.in, comp: this.getComp(gen.task.in) },
            e: { g: gen.guid, comp: this.getComp(gen.guid) }
          })
        }

        if (!gen.input || !gen.output) continue

        gen.input.forEach((input, j) => {
          if (input.connection.length !== 0) {
            input.connection.forEach(cn => {
              const output = this.getComp(cn.g).output[cn.n]
              if (!output) return
              this.wires.push({
                t: false,
                d: false,
                w: 2,
                c: this.dark
                  ? this.theme.connection.dark
                  : this.theme.connection.light,
                s: Object.assign({ comp: this.getComp(cn.g) }, cn),
                e: {
                  g: gen.guid,
                  n: j,
                  io: 'input',
                  comp: this.getComp(gen.guid)
                },
                v: output.value || null,
                tp: output.type || null
              })
            })
          }
        })
      }
    },
    removeConnection (gen) {
      this.wries = []
      if (!gen) return
      if (gen.task) {
        if (gen.task.in) {
          this.getGen(gen.task.in).task.out = null
          gen.task.in = null
        }
        if (gen.task.out) {
          this.getGen(gen.task.out).task.in = null
          gen.task.out = null
        }
      }
      if (gen.input) {
        if (gen.input instanceof Array) {
          gen.input.forEach(input => {
            if (input.connection.length !== 0) {
              input.connection.forEach(cn => {
                this.getGen(cn.g).output[cn.n].connection = []
              })
            }
          })
        }
      }

      if (gen.output) {
        if (gen.output instanceof Array) {
          gen.output.forEach((output, j) => {
            if (output.connection.length !== 0) {
              output.connection.forEach(cn => {
                this.getGen(cn.g).input[cn.n].connection = []
              })
            }
          })
        }
      }
    },
    onMenuItemClick (args) {
      this.$emit('menu-item-click', args)
    },
    onRandGen (args) {
      this.$emit('on-rand-generated', args)
    },
    onResize (args) {
      this.updateConnection()
    },
    onConnValueChange (args) {
      const input = this.getGen(args.e.g).input[args.e.n]
      if (input !== undefined) {
        input.value = args.v
        input.connection[0].value = args.v
      }
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
