<template>
  <div
    @mousedown.left="onMouseDn"
    @mouseup.left="onMouseUp"
    @click.right="onRightClick"
    :style="`position: absolute; touch-action: none; transform: translate(${loc.x}px, ${loc.y}px);`"
  >
    <div class="border" v-if="selected"></div>
    <div class="node">
      <div class="name" ref="name" @dblclick="onClickDB">
        <span
          class="in"
          :style="`--task-in-stat: ${taskInColor}`"
          @mousedown.left="onTaskInDn"
          @mouseup.left="onTaskInUp"
          @click.right="onTaskClickR($event, 'in')"
        ></span>
        {{name}}
        <span
          class="out"
          :style="`--task-out-stat: ${taskOutColor}`"
          @mousedown.left="onTaskOutDn"
          @mouseup.left="onTaskOutUp"
          @click.right="onTaskClickR($event, 'out')"
        ></span>
        <!-- <span>
          <svg class="play" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30">
            <title>运行{{name}}</title>
            <circle cx="15" cy="15" r="15"/>
            <path d="M12.16,23.25l11.25-6.49a2,2,0,0,0,.81-2.71,2.1,2.1,0,0,0-.81-.81L12.16,6.75a2,2,0,0,0-3,1.75V23.63" fill="none" stroke="#303030" stroke-linecap="round" stroke-width="2"/>
            <path d="M12.16,23.25l11.25-6.49a2,2,0,0,0,.81-2.71,2.1,2.1,0,0,0-.81-.81L12.16,6.75a2,2,0,0,0-3,1.75V23.63" fill="none" stroke="#fff" stroke-linecap="round" stroke-width="2"/>
          </svg>
        </span>-->
      </div>
      <div class="menu" :style="`top: ${menu ? '-35' : '1'}px;`">
        <div
          class="item"
          v-for="(item, index) in menuItems"
          :key="index"
          :style="`left:${(index - 3 / 2) * menuSize + (index - 1) * 10}px;`"
          @click.stop="onMenuItemClick(index)"
        >
          <i class="material-icons">{{item.icon}}</i>
        </div>
      </div>
      <div class="content" @dblclick="onClickDB">
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
import { CompMixin, Output, Input } from "../../src";
export default {
  name: "n-generator",
  data() {
    return {
      menu: false,
      menuSize: 30,
      menuItems: [
        {
          name: "运行",
          icon: "play_arrow"
        },
        {
          name: "选项",
          icon: "settings"
        },
        {
          name: "参数",
          icon: "grid_on"
        }
      ],
      running: false
    };
  },
  methods: {
    onClickDB(e) {
      e.stopPropagation();
      this.$emit("comp-click-db", {
        name: "n-generator",
        index: this.index
      });
    },
    onRightClick(e) {
      // e.preventDefault()
      // e.stopPropagation()
      this.menu = !this.menu;
    },
    onMenuItemClick(index) {
      this.$emit("menu-item-click", {
        index: this.index,
        menu: index
      });
    }
  },
  mixins: [CompMixin],
  components: { Input, Output }
};
</script>

<style lang="scss" scoped>
@import "./main.scss";

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
  left: 50%;
  transition: all 300ms ease-in-out;
  z-index: -1;

  .item {
    width: 30px;
    height: 30px;
    left: -15px;
    position: absolute;
    border-radius: 50%;
    background-color: slategrey;
    transition: all 300ms ease-in-out;
    cursor: pointer;

    > i {
      padding: 6px;
      font-size: large;
      color: white;
    }

    &:hover {
      background-color: darkgray;
    }
  }
}
</style>
