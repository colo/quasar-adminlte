<template>
  <!-- <q-page class="flex flex-center"> -->
  <q-page>
    <grid-view :id="id" :components="components" :grid="grid" componentsDir="test"/>
    <!-- componentsDir="test" -->

    <test />
  </q-page>
</template>

<style>
</style>

<script>
import * as Debug from 'debug'
const debug = Debug('pages:Index')

import admin_lte_mixin from '@components/mixins/adminlte'

import GridView from '@components/gridView'

// import Test from '@components/test/test.vue'

export default {
  mixins: [admin_lte_mixin],

  name: 'PageIndex',
  components: {
    // AdminLteBoxSolid,
    GridView
    // Test
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
      this.grid.layouts.lg.push({ x: 5, y: 1, w: 7, h: 4, i: '6' })
      debug('setInterval', JSON.parse(JSON.stringify(this.grid['layouts']['lg'])))
      clearInterval(interval)
    }.bind(this), 5000)
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
          // component: 'admin-lte-box-solid'
          component: 'test'
          // defaultSize: 2
        }]
      }
    }
  },
  methods: {

  }
}
</script>
