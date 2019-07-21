<!-- https://codepen.io/gusy/pen/jQVrGz -->
<!-- https://github.com/jbaysolutions/vue-grid-layout/issues/73 -->
<template>

  <grid-layout
  :layout="getLayout"
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
  <grid-item
  v-for="(item, index) in getLayout"
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

      <!-- <template v-for="(element, elIndex) in item.elements"> -->
      <div :key="index+'.'+elIndex+'.'+element.id" v-for="(element, elIndex) in item.elements" class="connectedSortable">
        <component
        :is="element.type"
        v-bind="element.options"
        v-on="element.events"
        style="position: relative"
        />
      </div>
      <!-- :key="index+'.'+elIndex+'.'+element.id" -->
      <!-- </template> -->

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
// import { mapGetters, mapActions } from 'vuex'
// import TextWidget from './TextWidget'
// import TextAreaWidget from './TextAreaWidget'
// import ImageWidget from './ImageWidget'
import * as Debug from 'debug'
const debug = Debug('components:gridView')

import { GridLayout, GridItem } from 'vue-grid-layout'
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'gridview',
  // components: { GridLayout, GridItem, TextWidget, TextAreaWidget, ImageWidget },
  components: { GridLayout, GridItem },

  props: {
    id: {
      type: [String],
      default: ''
    }
  },

  data () {
    return {

      // layout: [
      //   { 'x': 0,
      //     'y': 0,
      //     'w': 11,
      //     'h': 3,
      //     'i': '0',
      //     elements: []
      //     // 'type': 'q-btn',
      //     // options: { color: 'white', 'text-color': 'black', label: 'Standard' }
      //   },
      //   { 'x': 11,
      //     'y': 0,
      //     'w': 1,
      //     'h': 2,
      //     'i': '1',
      //     options: {
      //       static: true
      //     },
      //     elements: [
      //       {
      //         // 'type': 'edit-btn',
      //         'type': 'q-btn',
      //         events: { click: this.disableGrid },
      //         options: {
      //           round: true,
      //           color: 'primary'
      //           // icon: 'shopping_cart',
      //           // 'v-on': '{ click: disableGrid }',
      //           // 'v-on:click': '"disableGrid"',
      //           // 'v-on:click': '$emit("disableGrid")'
      //           // 'flat': true
      //         //   'bordered': true
      //         //   // class: 'bg-grey-9',
      //         //   // text: 'test' +
      //         //   // '\nsome more'
      //         }
      //       }
      //     ]
      //
      //     // // options: { color: 'white', 'text-color': 'black', label: 'Standard' }
      //   },
      //   {
      //     'x': 1,
      //     'y': 1,
      //     'w': 1,
      //     'h': 2,
      //     'i': '2',
      //     elements: []
      //     // type: 'q-chip',
      //     // options: {
      //     //   icon: 'alarm',
      //     //   label: 'Set alarm'
      //     // }
      //   }
      //   // { 'x': 6, 'y': 0, 'w': 2, 'h': 3, 'i': '3' },
      //   // { 'x': 8, 'y': 0, 'w': 2, 'h': 3, 'i': '4' },
      //   // { 'x': 10, 'y': 0, 'w': 2, 'h': 3, 'i': '5' },
      //   // { 'x': 0, 'y': 5, 'w': 2, 'h': 5, 'i': '6' },
      //   // { 'x': 2, 'y': 5, 'w': 2, 'h': 5, 'i': '7' },
      //   // { 'x': 4, 'y': 5, 'w': 2, 'h': 5, 'i': '8' },
      //   // { 'x': 6, 'y': 4, 'w': 2, 'h': 4, 'i': '9' },
      //   // { 'x': 8, 'y': 4, 'w': 2, 'h': 4, 'i': '10' },
      //   // { 'x': 10, 'y': 4, 'w': 2, 'h': 4, 'i': '11' },
      //   // { 'x': 0, 'y': 10, 'w': 2, 'h': 5, 'i': '12' },
      //   // { 'x': 2, 'y': 10, 'w': 2, 'h': 5, 'i': '13' },
      //   // { 'x': 4, 'y': 8, 'w': 2, 'h': 4, 'i': '14' },
      //   // { 'x': 6, 'y': 8, 'w': 2, 'h': 4, 'i': '15' },
      //   // { 'x': 8, 'y': 10, 'w': 2, 'h': 5, 'i': '16' },
      //   // { 'x': 10, 'y': 4, 'w': 2, 'h': 2, 'i': '17' },
      //   // { 'x': 0, 'y': 9, 'w': 2, 'h': 3, 'i': '18' },
      //   // { 'x': 2, 'y': 6, 'w': 2, 'h': 2, 'i': '19' }
      // ],

      isDraggable: true,
      isResizable: true,
      preview: false,
      contenteditable: true
    }
  },
  created: function () {
    debug('created', this.id)
    let id = this.id
    // if (id && !this.$store.state['grid_' + id]) { this.$store.registerModule('grid_' + id, GridStore) }
    this.$store.commit('grids/addGrid', { id: id })
  },
  computed: {
    layout: {
      get () {
        debug('get layout', JSON.parse(JSON.stringify(this.$store.getters['grids/getLayout'](this.id))))
        // return JSON.parse(JSON.stringify(this.$store.state['grid_' + this.id].layout))
        // return JSON.parse(JSON.stringify(this.$store.getters['grids/getLayout'](this.id)))
        return JSON.parse(JSON.stringify(this.$store.state.grids[this.id].layout))
      },
      set (layout) {
        debug('set layout', this.id, layout)
        this.$store.commit('grids/setGrid', { id: this.id, layout })
        // this.$store.state.grids[this.id].layout = JSON.parse(JSON.stringify(layout))
      }
    },
    getLayout: function () { return this.$store.getters['grids/getLayout'](this.id) }
    // ...mapGetters({
    //   getLayout: this.$store.getters['grids/getLayout'](this.id)
    // })
    // getResources: function () {
    //   return [
    //     {
    //       'x': 0,
    //       'y': 0,
    //       'w': 3,
    //       'h': 2,
    //       'i': '0',
    //       'type': 'q-btn',
    //       options: { color: 'white', 'text-color': 'black', label: 'Standard' },
    //       // 'title': 'Actias Luna',
    //       // 'headings': {
    //       //   'h1': true,
    //       //   'h2': false,
    //       //   'h3': false
    //       // },
    //       'moved': false
    //     },
    //     {
    //       'x': 8,
    //       'y': 17,
    //       'w': 4,
    //       'h': 8,
    //       'i': '1',
    //       'type': 'q-btn',
    //       options: { color: 'black', 'text-color': 'white', label: 'Standard' },
    //       'moved': false
    //     }
    //
    //   ]
    // }
  },
  // mounted: function () {
  //   this.$on('disableGrid', this.disableGrid)
  // },
  methods: {
    removeItem: function (key) {
      if (key > -1) {
        this.layout.splice(key, 1)
      }
    },
    layoutUpdatedEvent: function (layout) {
      console.log('layoutUpdatedEvent ')
      console.log(layout)
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
