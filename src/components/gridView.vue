<template>
  <section class="content">

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
        :useCSSTransforms="true"
        :class="'row'"
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
          :isDraggable="grid.isDraggable"
          :isResizable="grid.isResizable"
          :className="(grid.preview) ? 'grid-item' : '' "
          :cols="props.cols"
          :heightFromChildren="false"
          :maxRows="props.maxRows"
        >
          <!-- <div v-if="grid.components[item.i]" class="connectedSortable"> -->
          <!-- <section :class="'col-'+grid.breakpoint+' connectedSortable'" :id="item.i" v-if="grid.components[item.i]"> -->
           <draggable
            class="list-group"
            :id="item.i"
            :list="components[item.i]" group="components"
            @add="addComponent"
            @remove="removeComponent"
            @change="log"
            >
             <div
              class="list-group-item"
              v-for="(widget, wIndex) in components[item.i]"
              :key="item.i+'.'+wIndex"
              :id="item.i+'.'+wIndex"
            >
              <component
                v-if="widget.component"
                :is="widget.component"
                v-bind="widget.options"
                v-dynamic-events="(widget.events) ? widget.events : {}"
              />
              <template v-else-if="widget.slot" >
                {{widget.slot}}
              </template>
            </div>
          </draggable>
          <!-- </section> -->
          <!-- </div> -->

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
            v-if="grid.preview && !item.immobile"
            @click="removeItem(index)"
            style="position: absolute; bottom: 0px; left: 4px;"
          />
        </VueGridItem>
      </template>

    </VueResponsiveGridLayout>

  </section>
</template>
<script>
// import { mapGetters, mapActions } from 'vuex'
// import TextWidget from './TextWidget'
// import TextAreaWidget from './TextAreaWidget'
// import ImageWidget from './ImageWidget'
import * as Debug from 'debug'
const debug = Debug('components:gridView')

import draggable from 'vuedraggable'
import { VueResponsiveGridLayout, VueGridItem } from 'vue-responsive-grid-layout'
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'GridView',
  // components: { GridLayout, GridItem, TextWidget, TextAreaWidget, ImageWidget },
  components: { VueResponsiveGridLayout, VueGridItem, draggable },

  props: {
    id: {
      type: [String]
      // default: ''
    },
    EventBus: undefined
  },

  // https://forum.vuejs.org/t/dynamic-props-and-custom-event-emit-in-dynamic-component/10932
  directives: {
    DynamicEvents: {
      bind: (el, binding, vnode) => {
        const allEvents = binding.value
        Object.keys(allEvents).forEach((event) => {
          // register handler in the dynamic component
          vnode.componentInstance.$on(event, (eventData) => {
            const targetEvent = allEvents[event]
            vnode.context[targetEvent](eventData)
          })
        })
      },
      unbind: function (el, binding, vnode) {
        vnode.componentInstance.$off()
      }
    }
  },

  // data: function () {
  //   return {
  //     components: {}
  //   }
  // },
  created: function () {
    debug('created', this.id)
    let id = this.id
    // if (id && !this.$store.state['grid_' + id]) { this.$store.registerModule('grid_' + id, GridStore) }
    this.$store.commit('grids/addGrid', { id: id })
    this.$store.commit('components/addComponents', { id: id })
    // this.components = JSON.parse(JSON.stringify(this.$store.getters['components/getComponents'](this.id)))
    //
    // this.$watch('this.components', function (val, oldVal) {
    //   debug('watch components', this.id, val)
    //   val.id = this.id
    //   this.$store.commit('components/setComponents', JSON.parse(JSON.stringify(val)))
    // })

    this.EventBus.$on('sortable', function (e, ui) {
      debug('$on sortable', e, ui)
    })
  },
  // watch: {
  //   components: function (val, oldVal) {
  //     debug('watch components', this.id, val)
  //     val.id = this.id
  //     this.$store.commit('components/setComponents', JSON.parse(JSON.stringify(val)))
  //   }
  //
  // },

  computed: {
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
    },
    components: {
      get () {
        debug('get components', this.id)
        // let grid = JSON.parse(JSON.stringify(this.$store.getters['grids/getGrid'](this.id)))
        // let components = this.$store.state.grids.components
        // return components[this.id]
        return JSON.parse(JSON.stringify(this.$store.getters['components/getComponents'](this.id)))
      },
      set (components) {
        debug('set components', this.id, components)
        components.id = this.id
        // components = JSON.parse(JSON.stringify(components))
        // // grid.components = components
        this.$store.commit('components/setComponents', components)
      }
    }
  },
  methods: {
    addComponent: function (evt) {
      // let grid_id = evt.to.substring(evt.to.indexOf('.'))
      let from = evt.item.id.split('.')[0]
      let old_index = evt.item.id.split('.')[1]
      let new_index = evt.newIndex
      debug('addComponent', evt, evt.to.id, evt.item.id, from, old_index, new_index)
      let components = JSON.parse(JSON.stringify(this.$store.getters['components/getComponents'](this.id)))

      debug('addComponent components', components)
      components[evt.to.id] = (components[evt.to.id]) ? components[evt.to.id] : []
      components[evt.to.id].splice(new_index, 0, components[from][old_index])
      // this.components = components
      components.id = this.id
      this.$store.commit('components/setComponents', components)
    },
    removeComponent: function (evt) {
      let from = evt.item.id.split('.')[0]
      let old_index = evt.item.id.split('.')[1]
      let new_index = evt.newIndex
      debug('removeComponent', evt, evt.to.id, evt.item.id, from, old_index, new_index)
      let components = JSON.parse(JSON.stringify(this.$store.getters['components/getComponents'](this.id)))

      debug('removeComponent components', components)
      components[evt.from.id].splice(old_index, 1)
      // this.components = components
      components.id = this.id
      this.$store.commit('components/setComponents', components)
    },
    disableGrid: function () {
      debug('disableGrid')

      let grid = this.grid
      grid.preview = grid.isDraggable = grid.isResizable = !grid.preview
      // grid.isDraggable = !grid.isDraggable
      // grid.isResizable = !grid.isResizable
      // grid.contenteditable = !grid.contenteditable
      this.grid = grid
    },
    disableEdit: function () {
      debug('disableEdit')

      let grid = this.grid
      // grid.preview = !grid.preview
      grid.isDraggable = !grid.isDraggable
      grid.isResizable = !grid.isResizable
      // grid.contenteditable = !grid.contenteditable
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
    },
    log: function (evt) {
      window.console.log(evt)
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
