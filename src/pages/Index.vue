<template>
  <!-- <q-page class="flex flex-center"> -->
  <q-page>
    <grid-view :id="id" :components="components" :grid="grid"/>
  </q-page>
</template>

<style>
</style>

<script>
import * as Debug from 'debug'
const debug = Debug('pages:Index')

import admin_lte_mixin from '@components/mixins/adminlte'

import GridView from '@components/gridView'

export default {
  mixins: [admin_lte_mixin],

  name: 'PageIndex',
  components: {
    // AdminLteBoxSolid,
    GridView
  },

  // created: function () {
  //   // this.EventBus.$on('sortable', function (e, ui) {
  //   //   debug('$on sortable', e, ui)
  //   // })
  // }
  created: function () {
    let components = JSON.parse(JSON.stringify(this.$store.getters['components/getComponents'](this.id)))
    let grid = JSON.parse(JSON.stringify(this.$store.getters['grids/getGrid'](this.id)))

    if (components) { this.components = components }

    if (grid) { this.grid = grid }

    let interval = setInterval(function () {
      debug('setInterval', JSON.parse(JSON.stringify(this.grid['layouts']['lg'])))
      // let lg = JSON.parse(JSON.stringify(this.grid.layouts.lg))
      // lg.push({ x: 5, y: 1, w: 7, h: 4, i: '6' })
      // this.$set(this.grid['layouts'], 'lg', lg)
      this.grid.layouts.lg.push({ x: 5, y: 1, w: 7, h: 4, i: '6' })
      debug('setInterval', JSON.parse(JSON.stringify(this.grid['layouts']['lg'])))
      clearInterval(interval)
    }.bind(this), 5000)
    // debug('created', this.id)
    // let id = this.id
    //
    // this.$store.commit('grids/addGrid', { id: id })
    // this.$store.commit('components/addComponents', { id: id })
  },

  data () {
    return {
      id: 'test',
      grid: {
        layouts: {
          'lg': [
            { x: 0,
              y: 0,
              w: 5,
              h: 4,
              i: '1'

            },
            { x: 5, y: 0, w: 5, h: 4, i: '2' },
            {
              x: 10,
              y: 0,
              w: 1,
              h: 4,
              i: '3',
              immobile: true
            },
            { x: 11,
              y: 0,
              w: 1,
              h: 4,
              i: '4',
              immobile: true
            },
            { x: 0,
              y: 1,
              w: 5,
              h: 4,
              i: '5'

            }
            // { x: 5, y: 1, w: 7, h: 4, i: '6' }
          ]
        },
        breakpoint: 'lg',
        // slots: [
        //   '<q-btn round />'
        // ],

        cols: 12,
        // breakpoints: { lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 },
        // colsAll: { lg: 12, md: 8, sm: 6, xs: 4, xxs: 2 },

        isDraggable: false,
        isResizable: false,
        preview: false
      },
      components: {
        '1': [{
          id: 0,
          component: 'admin-lte-box-solid'
          // defaultSize: 2
        }],
        '2': [
          { id: 2, slot: 'hello', defaultSize: 2 }
        ],
        '3': [{
          component: 'q-btn',
          // defaultSize: 2,
          options: {
            // round: true,
            label: 'edit/preview',
            style: 'position: relative'
            // '@click': "$emit('disableGrid')"
          },
          events: {
            click: 'disableGrid'
          }
          // componentProps: "round color: 'primary'"
        }],
        '4': [{
          component: 'q-btn',
          // defaultSize: 2,
          options: {
            // round: true,
            label: 'draggables',
            style: 'position: relative'
            // '@click': "$emit('disableGrid')"
          },
          events: {
            click: 'disableEdit'
          }
          // componentProps: "round color: 'primary'"
        }],
        '5': [{
          component: 'admin-lte-box-solid'
          // defaultSize: 2
        }]
      }
    }
  },
  methods: {

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
