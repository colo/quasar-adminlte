<template>

    <grid-layout
      :layout="layout"
      :col-num="12"
      :row-height="30"
      :vertical-compact="true"
      :is-draggable="isDraggable"
      :is-resizable="isResizable"
      :is-mirrored="false"
      :margin="[5, 5]"
      :use-css-transforms="true"
      @layout-updated="layoutUpdatedEvent"
    >

    <!-- :responsive="true" -->

      <grid-item
        v-for="(item, index) in layout"
        :key="item.i"
        :x="item.x"
        :y="item.y"
        :w="item.w"
        :h="item.h"
        :i="item.i"
        v-bind="item.options"
        :class="{ 'editMode' : !preview }"
        :autoSize="true"
      >

          <div :key="index+'.'+elIndex" v-for="(element, elIndex) in item.elements" class="connectedSortable">
            <component
            :is="element.type"
            v-bind="element.options"
            v-on="element.events"
          />
          <!-- style="position: relative" -->

        </div>

        <q-icon
          name="fa fa-trash"
          v-if="!preview && (!item.options || !item.options.static)"
          @click="removeItem(index)"
          style="position: absolute; bottom: 0px; left: 4px;"
        />

      </grid-item>
    </grid-layout>

</template>

<script>
/* eslint no-undef: "off" */

import * as Debug from 'debug'
const debug = Debug('components:gridView')

import { GridLayout, GridItem } from 'vue-grid-layout'
import { mapState, mapGetters } from 'vuex'

// import GridStore from 'src/store/grid'

export default {

  name: 'GridView',
  components: {
    GridLayout,
    GridItem
  },

  props: {
    id: {
      type: [String],
      default: ''
    }
  },

  // computed: {
  //   // localComputed () { /* ... */ },
  //   // mix this into the outer object with the object spread operator
  //   ...mapState([
  //     'grid_' + this.id + '/layout'
  //     // 'isDraggable',
  //     // 'isResizable',
  //     // 'preview',
  //     // 'contenteditable'
  //   ])
  // },
  computed: {
    // ...mapGetters({
    //   'getLayout': (state) => {
    //     return state['grid_' + this.id].getters.getLayout()
    //   }
    // }),
    // getLayout () {
    //   debug('getLayout', this.$store)
    //   return this.$store.getters['grid_' + this.id + '/getLayout']
    // },
    layout: {
      get () {
        debug('get layout', JSON.parse(JSON.stringify(this.$store.getters['grids/getLayout'](this.id))))
        // return JSON.parse(JSON.stringify(this.$store.state['grid_' + this.id].layout))
        return JSON.parse(JSON.stringify(this.$store.getters['grids/getLayout'](this.id)))
      },
      set (layout) {
        debug('set layout', this.id, layout)
        this.$store.commit('grids/setGrid', { id: this.id, layout })
      }
    },
    ...mapState({
      isDraggable (state) {
        return state.grids[this.id].isDraggable
      },
      isResizable (state) {
        return state.grids[this.id].isResizable
      },
      preview (state) {
        return state.grids[this.id].preview
      },
      contenteditable (state) {
        return state.grids[this.id].contenteditable
      }
    })
  },
  created: function () {
    debug('created', this.id)
    let id = this.id
    // if (id && !this.$store.state['grid_' + id]) { this.$store.registerModule('grid_' + id, GridStore) }
    this.$store.commit('grids/setGrid', { id: id })
  },

  methods: {
    removeItem: function (key) {
      if (key > -1) {
        this.layout.splice(key, 1)
      }
    },
    layoutUpdatedEvent: function (layout) {
      // console.log('layoutUpdatedEvent ')
      // console.log(layout)
      debug('layoutUpdatedEvent', JSON.parse(JSON.stringify(layout)))
      this.layout = JSON.parse(JSON.stringify(layout))
    },
    disableGrid: function () {
      console.log('disableGrid')
      this.isDraggable = !this.isDraggable
      this.isResizable = !this.isResizable
      this.preview = !this.preview
      this.contenteditable = !this.contenteditable
    },
    addToList: function () {
      console.log('addToList')
      console.log(arguments)
    }
  //   ...mapActions([
  //     'addTitleGridItem',
  //     'addContentGridItem',
  //     'addImageGridItem',
  //     'removeItem'
  //   ]),
    // disableGrid () {
    //   this.isDraggable = !this.isDraggable
    //   this.isResizable = !this.isResizable
    //   this.preview = !this.preview
    //   this.contenteditable = !this.contenteditable
    // }
  }
}
</script>

<style>
.editMode {
  background-color: #eee;
  /* border-radius: 5px; */
}

/*** EXAMPLE ***/
/* * {
  box-sizing: border-box;
}
#content {
    width: 100%;
}

.vue-grid-layout {
    background: #eee;
}

.editable {
  border: 1px solid lawngreen;
  height: 100%;
}
*/
/* .columns {
    -moz-columns: 120px;
    -webkit-columns: 120px;
    columns: 120px;
}

.vue-resizable-handle {
    z-index: 5000;
    position: absolute;
    width: 20px;
    height: 20px;
    bottom: 0;
    right: 0;
    background: url('data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/Pg08IS0tIEdlbmVyYXRvcjogQWRvYmUgRmlyZXdvcmtzIENTNiwgRXhwb3J0IFNWRyBFeHRlbnNpb24gYnkgQWFyb24gQmVhbGwgKGh0dHA6Ly9maXJld29ya3MuYWJlYWxsLmNvbSkgLiBWZXJzaW9uOiAwLjYuMSAgLS0+DTwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+DTxzdmcgaWQ9IlVudGl0bGVkLVBhZ2UlMjAxIiB2aWV3Qm94PSIwIDAgNiA2IiBzdHlsZT0iYmFja2dyb3VuZC1jb2xvcjojZmZmZmZmMDAiIHZlcnNpb249IjEuMSINCXhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhtbDpzcGFjZT0icHJlc2VydmUiDQl4PSIwcHgiIHk9IjBweCIgd2lkdGg9IjZweCIgaGVpZ2h0PSI2cHgiDT4NCTxnIG9wYWNpdHk9IjAuMzAyIj4NCQk8cGF0aCBkPSJNIDYgNiBMIDAgNiBMIDAgNC4yIEwgNCA0LjIgTCA0LjIgNC4yIEwgNC4yIDAgTCA2IDAgTCA2IDYgTCA2IDYgWiIgZmlsbD0iIzAwMDAwMCIvPg0JPC9nPg08L3N2Zz4=');
    background-position: bottom right;
    padding: 0 3px 3px 0;
    background-repeat: no-repeat;
    background-origin: content-box;
    box-sizing: border-box;
    cursor: se-resize;
} */
/*
.vue-grid-item:not(.vue-grid-placeholder) {
    background: #ccc;
    border: 1px solid black;
    padding: 1rem;
}
*/

/* .vue-grid-item.resizing {
    opacity: 0.9;
} */

/* .vue-grid-item.static {
    background: #cce;
} */

/*
.vue-grid-item .text {
    font-size: 24px;
    text-align: center;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    height: 100%;
    width: 100%;
}
*/
/* .vue-grid-item .no-drag {
    height: 100%;
    width: 100%;
}

.vue-grid-item .minMax {
    font-size: 12px;
} */

/* .vue-grid-item .add {
    cursor: pointer;
} */

/* .vue-draggable-handle {
    position: absolute;
    width: 20px;
    height: 20px;
    top: 0;
    left: 0;
    background: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='10' height='10'><circle cx='5' cy='5' r='5' fill='#999999'/></svg>") no-repeat;
    background-position: bottom right;
    padding: 0 8px 8px 0;
    background-repeat: no-repeat;
    background-origin: content-box;
    box-sizing: border-box;
    cursor: pointer;
} */

.item {
  height: 100%;
}
</style>
