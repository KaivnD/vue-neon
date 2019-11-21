<template>
  <div class="input">
    <div class="inputTitle">
      <span
        :style="`--node-stat: ${color}`"
        @click.right="onMouseClickR"
        @mousedown.stop="onMouseDn"
        @mouseup.stop="onMouseUp"
      ></span>
      {{name}}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    index: Number,
    name: String,
    type: Number,
    value: String,
    connection: Array
  },
  computed: {
    color () {
      return this.connection.length === 0 ? 'white' : '#EE7434'
    }
  },
  methods: {
    onMouseClickR (e) {
      this.$emit('click-r', {
        index: this.index,
        pos: { x: e.pageX, y: e.pageY },
        io: 'input'
      })
    },
    onMouseDn (e) {
      if (e.button === 0) {
        this.$emit('mouse-dn', {
          index: this.index,
          pos: { x: e.pageX, y: e.pageY },
          io: 'input'
        })
      }
    },
    onMouseUp (e) {
      this.$emit('mouse-up', {
        index: this.index,
        io: 'input'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.input {
  text-align: left;

  & .inputTitle {
    vertical-align: middle;
    color: #fff;
    display: inline-block;
    font-size: 9px;
    margin: 9px;
    line-height: 9px;
  }

  span::before {
    cursor: pointer;
    content: '';
    display: inline-block;
    position: relative;
    width: 12px;
    height: 12px;
    top: 2px;
    background: var(--node-stat);
    border-radius: 50%;
  }
}
</style>
