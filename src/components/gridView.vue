<template>
    <VueResponsiveGridLayout
        @layout-update="onLayoutUpdate"
        @layout-change="onLayoutChange"
        @layout-init="onLayoutInit"
        @width-change="onWidthChange"
        @breakpoint-change="onBreakpointChange"
        :layouts="grid.layouts"
        :compactType="'vertical'"
        :breakpoint="grid.breakpoint"
        :cols="grid.cols"
        ref="layout"
    >
      <template slot-scope="props">
        <VueGridItem :key="index" v-for="(item, index) in props.layout"
          :i="item.i"
          :w.sync="item.w"
          :h.sync="item.h"
          :x="item.x"
          :y="item.y"
          :immobile.sync="item.immobile"
          :containerWidth="props.containerWidth"
          :rowHeight="props.rowHeight"
          :isDraggable="!item.immobile"
          :isResizable="!item.immobile"
          :className="(!grid.preview) ? 'grid-item' : '' "
          :cols="props.cols"
          :heightFromChildren="false"
          :maxRows="props.maxRows"
        >
        <!-- :className="'grid-item'" -->
          <!-- Test {{item.i}}
          <component :is="item.component"></component> -->
          <!-- <div :key="index+'.'+elIndex" v-for="(element, elIndex) in item.elements" class="connectedSortable">
            <component
            :is="element.type"
            v-bind="element.options"
            v-on="element.events"
            style="position: relative"
          />

          </div> -->

          <q-icon
            name="fa fa-trash"
            v-if="!grid.preview && !item.immobile"
            @click="removeItem(index)"
            style="position: absolute; bottom: 0px; left: 4px;"
          />
        </VueGridItem>
      </template>
    </VueResponsiveGridLayout>
</template>
<script>
// import { mapGetters, mapActions } from 'vuex'
// import TextWidget from './TextWidget'
// import TextAreaWidget from './TextAreaWidget'
// import ImageWidget from './ImageWidget'
import * as Debug from 'debug'
const debug = Debug('components:gridView')

import { VueResponsiveGridLayout, VueGridItem } from 'vue-responsive-grid-layout'
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'gridview',
  // components: { GridLayout, GridItem, TextWidget, TextAreaWidget, ImageWidget },
  components: { VueResponsiveGridLayout, VueGridItem },

  props: {
    id: {
      type: [String],
      default: ''
    }
  },

  data () {
    return {
      // layouts: {
      //   'lg': [
      //     { x: 0, y: 0, w: 10, h: 3, i: '1' },
      //     { x: 10, y: 0, w: 2, h: 3, i: '2', immobile: true },
      //     { x: 0, y: 1, w: 2, h: 3, i: '3' },
      //     { x: 2, y: 1, w: 2, h: 3, i: '4' }
      //   ]
      // },
      // breakpoint: 'lg',
      // // components: {
      // //   '1': { i: '1', component: 'example-component', defaultSize: 2 },
      // //   '2': { i: '2', component: 'example-component', defaultSize: 2 },
      // //   '3': { i: '3', component: 'example-component', defaultSize: 2 },
      // //   '4': { i: '4', component: 'example-component', defaultSize: 2 }
      // // },
      // cols: 12,
      // // breakpoints: { lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 },
      // // colsAll: { lg: 12, md: 8, sm: 6, xs: 4, xxs: 2 },
      //
      // // isDraggable: true,
      // // isResizable: true,
      // preview: false
    }
  },
  created: function () {
    debug('created', this.id)
    let id = this.id
    // if (id && !this.$store.state['grid_' + id]) { this.$store.registerModule('grid_' + id, GridStore) }
    this.$store.commit('grids/addGrid', { id: id })
  },
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
    grid: {
      get () {
        debug('get grid', this.$store.getters['grids/getGrid'](this.id))
        // return JSON.parse(JSON.stringify(this.$store.state['grid_' + this.id].layout))
        // return JSON.parse(JSON.stringify(this.$store.getters['grids/getLayout'](this.id)))
        // return this.$store.state.grids[this.id]
        return JSON.parse(JSON.stringify(this.$store.getters['grids/getGrid'](this.id)))
      },
      set (grid) {
        debug('set grid', this.id, grid)
        grid.id = this.id
        this.$store.commit('grids/setGrid', grid)
        // this.$store.state.grids[this.id].layout = JSON.parse(JSON.stringify(layout))
      }
    }
  },
  methods: {
    disableGrid: function () {
      console.log('disableGrid')
      // this.isDraggable = !this.isDraggable
      // this.isResizable = !this.isResizable
      // this.contenteditable = !this.contenteditable
      let grid = this.grid
      grid.preview = !grid.preview
      this.grid = grid
    },
    removeItem: function (key) {
      debug('removeItem', key)
      if (key > -1) {
        for (const breakpoint in this.grid.layouts) {
          let layout = this.grid.layouts[breakpoint]
          layout.splice(key, 1)
          let grid = this.grid
          grid.layouts[breakpoint] = layout
          this.grid = grid
          // this.$set('grid', grid)
          // this.$set(this.layouts, breakpoint, layout)
        }
      }
    },
    onLayoutUpdate (layout, layouts, last) {
      debug('onLayoutUpdate', layout, layouts, last)
      // this.$set(this.layouts, this.breakpoint, layout)
      let grid = this.grid
      grid.layouts[grid.breakpoint] = layout
      this.grid = grid
    },

    onLayoutChange (layout, layouts, breakpoint) {
      debug('onLayoutChange', layout, layouts, breakpoint)
      // this.$set(this.layouts, breakpoint, layout)
      let grid = this.grid
      grid.layouts[breakpoint] = layout
      this.grid = grid
    },

    onLayoutInit (layout, layouts, cols, breakpoint) {
      debug('onLayoutInit', layout, layouts, cols, breakpoint)
      // this.cols = cols
      // this.breakpoint = breakpoint
      // this.$set(this.layouts, breakpoint, layout)
      let grid = this.grid
      grid.cols = cols
      grid.breakpoint = breakpoint
      grid.layouts[grid.breakpoint] = layout
      this.grid = grid
    },

    onBreakpointChange (breakpoint) {
      debug('onBreakpointChange', breakpoint)
      // this.breakpoint = breakpoint
      let grid = this.grid
      grid.breakpoint = breakpoint
      this.grid = grid
    },

    onWidthChange (width, cols) {
      debug('onWidthChange', width, cols)
      // this.cols = cols
      let grid = this.grid
      grid.cols = cols
      this.grid = grid
    }
    // gridMode () {
    //   debug('gridMode')
    //   this.$refs.layout.resizeAllItems(2, 'vertical')
    // },
    // listMode () {
    //   debug('listMode')
    //   this.$refs.layout.resizeAllItems(this.cols, 'horizontal')
    // }
  }

}
</script>

<style>
/* #app {
  background: #fff;
  border-radius: 4px;
  transition: all 0.2s;
}

html {
  height: 100%;
}

body {
  height: 100%;
}

#content {
  padding: 0px 20px;
  min-height: 100vh;
  transition: all 0.3s;
  width: 100%;
} */

.resizable-handle {
  position:absolute;
  width:20px;
  height:20px;
  bottom:0;
  right:0px;
  text-align:right;
}
.resizable-handle::after {
  content: "";
  position: absolute;
  right: 3px;
  bottom: 3px;
  width: 5px;
  height: 5px;
  border-right: 2px solid #000000;
  border-bottom: 2px solid #000000;
}
.vue-grid-draggable-container {
  width: 100%;
  height: 100%;
}
.grid-item {
  border: 1px dotted #000;
}
.vue-grid-placeholder {
  background: #ddd; border: 2px dashed #aaa;
}

.vue-grid-layout {
  width: 100%;
  display:block;
  position:relative;
  height: 100%;
}

</style>
