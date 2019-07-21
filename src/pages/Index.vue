<template>
  <!-- <q-page class="flex flex-center"> -->
  <q-page>
    <grid-view id='test'/>
  </q-page>
</template>

<style>
</style>

<script>

import admin_lte_mixin from '@components/mixins/adminlte'
import AdminLteBoxSolid from '@components/adminlte/boxSolid'
import GridView from '@components/gridView'

export default {
  mixins: [admin_lte_mixin],

  name: 'PageIndex',
  components: {
    AdminLteBoxSolid,
    GridView
  }

  // data () {
  //   return {
  //
  //     layout: [
  //       { 'x': 0,
  //         'y': 0,
  //         'w': 2,
  //         'h': 2,
  //         'i': '0',
  //         elements: [
  //           {
  //             type: 'admin-lte-box-solid',
  //             options: {
  //               title: 'some title',
  //               id: 'some id'
  //             }
  //           }
  //           // {
  //           //   type: 'admin-lte-box-solid',
  //           //   options: {
  //           //     title: 'some title2',
  //           //     id: 'some id2'
  //           //   }
  //           // }
  //         ]
  //         // 'type': 'q-btn',
  //         // options: { color: 'white', 'text-color': 'black', label: 'Standard' }
  //       },
  //       { 'x': 10,
  //         'y': 0,
  //         'w': 2,
  //         'h': 2,
  //         'i': '1',
  //         // options: {
  //         //   static: true
  //         // },
  //         elements: [
  //           // {
  //           //   // 'type': 'edit-btn',
  //           //   'type': 'q-btn',
  //           //   events: { click: this.disableGrid },
  //           //   options: {
  //           //     round: true,
  //           //     color: 'primary'
  //           //     // icon: 'shopping_cart',
  //           //     // 'v-on': '{ click: disableGrid }',
  //           //     // 'v-on:click': '"disableGrid"',
  //           //     // 'v-on:click': '$emit("disableGrid")'
  //           //     // 'flat': true
  //           //   //   'bordered': true
  //           //   //   // class: 'bg-grey-9',
  //           //   //   // text: 'test' +
  //           //   //   // '\nsome more'
  //           //   }
  //           // }
  //           {
  //             type: 'admin-lte-box-solid',
  //             options: {
  //               title: 'some title3',
  //               id: 'some id3'
  //             }
  //           }
  //         ]
  //
  //         // // options: { color: 'white', 'text-color': 'black', label: 'Standard' }
  //       }
  //       // {
  //       //   'x': 1,
  //       //   'y': 1,
  //       //   'w': 1,
  //       //   'h': 2,
  //       //   'i': '2',
  //       //   elements: []
  //       //   // type: 'q-chip',
  //       //   // options: {
  //       //   //   icon: 'alarm',
  //       //   //   label: 'Set alarm'
  //       //   // }
  //       // }
  //       // { 'x': 6, 'y': 0, 'w': 2, 'h': 3, 'i': '3' },
  //       // { 'x': 8, 'y': 0, 'w': 2, 'h': 3, 'i': '4' },
  //       // { 'x': 10, 'y': 0, 'w': 2, 'h': 3, 'i': '5' },
  //       // { 'x': 0, 'y': 5, 'w': 2, 'h': 5, 'i': '6' },
  //       // { 'x': 2, 'y': 5, 'w': 2, 'h': 5, 'i': '7' },
  //       // { 'x': 4, 'y': 5, 'w': 2, 'h': 5, 'i': '8' },
  //       // { 'x': 6, 'y': 4, 'w': 2, 'h': 4, 'i': '9' },
  //       // { 'x': 8, 'y': 4, 'w': 2, 'h': 4, 'i': '10' },
  //       // { 'x': 10, 'y': 4, 'w': 2, 'h': 4, 'i': '11' },
  //       // { 'x': 0, 'y': 10, 'w': 2, 'h': 5, 'i': '12' },
  //       // { 'x': 2, 'y': 10, 'w': 2, 'h': 5, 'i': '13' },
  //       // { 'x': 4, 'y': 8, 'w': 2, 'h': 4, 'i': '14' },
  //       // { 'x': 6, 'y': 8, 'w': 2, 'h': 4, 'i': '15' },
  //       // { 'x': 8, 'y': 10, 'w': 2, 'h': 5, 'i': '16' },
  //       // { 'x': 10, 'y': 4, 'w': 2, 'h': 2, 'i': '17' },
  //       // { 'x': 0, 'y': 9, 'w': 2, 'h': 3, 'i': '18' },
  //       // { 'x': 2, 'y': 6, 'w': 2, 'h': 2, 'i': '19' }
  //     ],
  //
  //     isDraggable: false,
  //     isResizable: true,
  //     preview: false,
  //     contenteditable: true
  //   }
  // },
  // methods: {
  //   removeItem: function (key) {
  //     if (key > -1) {
  //       this.layout.splice(key, 1)
  //     }
  //   },
  //   layoutUpdatedEvent: function (layout) {
  //     console.log('layoutUpdatedEvent ')
  //     console.log(layout)
  //   },
  //   disableGrid: function () {
  //     console.log('disableGrid')
  //     this.isDraggable = !this.isDraggable
  //     this.isResizable = !this.isResizable
  //     this.preview = !this.preview
  //     this.contenteditable = !this.contenteditable
  //   },
  //   addToList: function () {
  //     console.log('addToList')
  //     console.log(arguments)
  //   }
  // //   ...mapActions([
  // //     'addTitleGridItem',
  // //     'addContentGridItem',
  // //     'addImageGridItem',
  // //     'removeItem'
  // //   ]),
  //   // disableGrid () {
  //   //   this.isDraggable = !this.isDraggable
  //   //   this.isResizable = !this.isResizable
  //   //   this.preview = !this.preview
  //   //   this.contenteditable = !this.contenteditable
  //   // }
  // }
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
