<template>

    <VueResponsiveGridLayout
        @layout-update="onLayoutUpdate"
        @layout-change="onLayoutChange"
        @layout-init="onLayoutInit"
        @width-change="onWidthChange"
        @breakpoint-change="onBreakpointChange"
        :layouts="viewGrid.layouts"
        :compactType="'vertical'"
        :breakpoint="viewGrid.breakpoint"
        :cols="viewGrid.cols"
        ref="layout"
        :useCSSTransforms="true"
        :breakpoints="viewGrid.breakpoints"
        :colsAll="viewGrid.colsAll"
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
          :isDraggable="viewGrid.isDraggable"
          :isResizable="viewGrid.isResizable"
          :className="(viewGrid.preview) ? 'grid-item' : '' "
          :cols="props.cols"
          :heightFromChildren="false"
          :maxRows="props.maxRows"
        >
          <!-- <div v-if="viewGrid.components[item.i]" class="connectedSortable"> -->
          <!-- <section :class="'col-'+viewGrid.breakpoint+' connectedSortable'" :id="item.i" v-if="viewGrid.components[item.i]"> -->

           <draggable
            v-if="!item.immobile"
            class="list-group"
            :id="item.i"
            :list="viewComponents[item.i]" group="components"
            @add="addComponent"
            @remove="removeComponent"
            @change="log"
            >
              <!-- class="list-group-item" -->
             <div
              v-for="(widget, wIndex) in viewComponents[item.i]"
              :key="item.i+'.'+wIndex"
              :id="item.i+'.'+wIndex"
            >

              <component
                v-if="widget.component"
                :is="resolveComponent(widget.component)"
                v-bind="widget.options"
                v-dynamic-events="(widget.events) ? widget.events : {}"
              />
              <template v-else-if="widget.slot" >
                {{widget.slot}}
              </template>
            </div>
          </draggable>
          <!--  not draggables (inmobile)-->
          <div
           v-else
           v-for="(widget, wIndex) in viewComponents[item.i]"
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
            v-if="viewGrid.preview && !item.immobile"
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
import upperFirst from 'lodash/upperFirst'
import camelCase from 'lodash/camelCase'
import Vue from 'vue'

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
    // componentsDir: {
    //   type: [String, Array],
    //   default: ''
    // },
    components: {
      type: [Object],
      default: function () {
        return {}
      }
    },
    grid: {
      type: [Object],
      default: function () {
        return {}
      }
    }
    // EventBus: undefined
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

    let grid = {}
    if (this.grid) {
      grid = JSON.parse(JSON.stringify(this.grid))
      grid.id = this.id
      this.viewGrid = grid
    } else {
      grid.id = this.id
      this.$store.commit('grids/addGrid', grid)
    }

    let components = {}
    if (this.components) {
      components = JSON.parse(JSON.stringify(this.components))
      components.id = this.id
      this.viewComponents = components
    } else {
      components.id = this.id
      this.$store.commit('components/addComponents', components)
    }

    // for (const id in this.viewComponents) {
    //   for (const i in this.viewComponents[id]) {
    //     if (this.viewComponents[id][i].component) { this.resolveComponent(this.viewComponents[id][i].component) }
    //   }
    // }

    // this.viewComponents = JSON.parse(JSON.stringify(this.$store.getters['components/getComponents'](this.id)))
    //
    // this.$watch('this.viewComponents', function (val, oldVal) {
    //   debug('watch components', this.id, val)
    //   val.id = this.id
    //   this.$store.commit('components/setComponents', JSON.parse(JSON.stringify(val)))
    // })

    // this.EventBus.$on('sortable', function (e, ui) {
    //   debug('$on sortable', e, ui)
    // })
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
    viewGrid: {
      get () {
        debug('get viewGrid', this.$store.getters['grids/getGrid'](this.id))
        // return JSON.parse(JSON.stringify(this.$store.state['grid_' + this.id].layout))
        // return JSON.parse(JSON.stringify(this.$store.getters['grids/getLayout'](this.id)))
        // return this.$store.state.grids[this.id]
        return JSON.parse(JSON.stringify(this.$store.getters['grids/getGrid'](this.id)))
      },
      set (grid) {
        debug('set viewGrid', this.id, grid)
        grid.id = this.id
        this.$store.commit('grids/setGrid', grid)
        // this.$store.state.grids[this.id].layout = JSON.parse(JSON.stringify(layout))
      }
    },
    viewComponents: {
      get () {
        debug('get viewComponents', this.id)
        // let grid = JSON.parse(JSON.stringify(this.$store.getters['grids/getGrid'](this.id)))
        // let components = this.$store.state.grids.components
        // return components[this.id]
        return JSON.parse(JSON.stringify(this.$store.getters['components/getComponents'](this.id)))
      },
      set (components) {
        debug('set viewComponents', this.id, components)
        components.id = this.id
        // components = JSON.parse(JSON.stringify(components))
        // // grid.components = components
        this.$store.commit('components/setComponents', components)
      }
    }
  },
  watch: {
    components: {
      immediate: true,
      deep: true,
      handler: function (components) {
        debug('watch components', components)
        components = JSON.parse(JSON.stringify(components))
        components.id = this.id
        this.viewComponents = components
      }
    },
    grid: {
      immediate: true,
      deep: true,
      handler: function (grid) {
        debug('watch grid', grid)
        grid = JSON.parse(JSON.stringify(grid))
        grid.id = this.id
        this.viewGrid = grid
      }
    }
  },
  methods: {
    resolveComponent: function (component) {
      debug('resolveComponent', component)

      debug('resolveComponent locals', this.$options.components)
      debug('resolveComponent globals', Vue.options.components)
      let exists = false
      // locals
      if (this.$options.components[component]) {
        exists = true
      } else {
        for (const name in this.$options.components) {
          let _component = this.$options.components[name]
          // debug('resolveComponent _component local', _component)
          if (_component.name && _component.name === component) { exists = true }
          if (_component.extendOptions && _component.extendOptions.name === component) { exists = true }
        }

        if (exists === false) {
          if (Vue.options.components[component]) {
            exists = true
          } else {
            for (const name in Vue.options.components) {
              let _component = Vue.options.components[name]
              // debug('resolveComponent _component global', _component)
              if (_component.name && _component.name === component) { exists = true }
              if (_component.extendOptions && _component.extendOptions.name === component) { exists = true }
            }
          }
        }
      }
      // debug('resolveComponent globals', Vue.$options.components)
      if (exists === false) {
        // return () => import('@components/test/' + component)
        // Vue.component(
        //   component,
        //   // The `import` function returns a Promise.
        //   () => import('@components/' + this.componentsDir + '/' + component + '.vue')
        // )

        // https://vuejs.org/v2/guide/components-dynamic-async.html

        // https://webpack.js.org/guides/dependency-management/#require-context
        const requireComponent = require.context(
          // Look for files in the current directory
          '@components/',
          // Do not look in subdirectories
          true,
          // Only include "_base-" prefixed .vue files
          /[\w-]+\.vue$/
        )

        let resolver = function (component) {
          // For each matching file name...
          requireComponent.keys().forEach((fileName) => {
            // Get the component config
            // debug('resolver', component, dir, fileName)
            const componentConfig = requireComponent(fileName)
            // Get the PascalCase version of the component name
            const componentName = upperFirst(
              camelCase(
                fileName
                  // Remove the "./_" from the beginning
                  // .replace(/^\.\/_/, '')
                  // Remove the file extension from the end
                  .replace(/\.\w+$/, '')
              )
            )
            // Globally register the component
            // console.log('componentName')

            if (componentName === component) {
              debug('resolver', component, fileName, componentName)
              Vue.component(componentName, componentConfig.default || componentConfig)
            }
          // Vue.component(component, function (resolve) {
          //   // This special require syntax will instruct Webpack to
          //   // automatically split your built code into bundles which
          //   // are loaded over Ajax requests.
          //   require(['@components/' + dir + '/' + component + '.vue'], resolve)
          // })
          })
          // Vue.component(component, '@components/' + dir + '/' + component + '.vue')
        }

        // if (Array.isArray(this.componentsDir)) {
        //   for (let i in this.componentsDir) {
        //     resolver(component, this.componentsDir[i])
        //   }
        // } else {
        resolver(component)
        // }

        // return require('@components/' + this.componentsDir + '/' + component + '.vue')
      } else {
        return component
      }
    },
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
      // this.viewComponents = components
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
      // this.viewComponents = components
      components.id = this.id
      this.$store.commit('components/setComponents', components)
    },
    disableGrid: function () {
      debug('disableGrid')

      let grid = this.viewGrid
      grid.preview = grid.isDraggable = grid.isResizable = !grid.preview
      // grid.isDraggable = !grid.isDraggable
      // grid.isResizable = !grid.isResizable
      // grid.contenteditable = !grid.contenteditable
      this.viewGrid = grid
    },
    disableEdit: function () {
      debug('disableEdit')

      let grid = this.viewGrid
      // grid.preview = !grid.preview
      grid.isDraggable = !grid.isDraggable
      grid.isResizable = !grid.isResizable
      // grid.contenteditable = !grid.contenteditable
      this.viewGrid = grid
    },
    removeItem: function (key) {
      debug('removeItem', key)
      // if (key > -1) {
      if (key > -1) {
        for (const breakpoint in this.viewGrid.layouts) {
          let layout = this.viewGrid.layouts[breakpoint]
          layout.splice(key, 1)
          let grid = this.viewGrid
          grid.layouts[breakpoint] = layout
          this.viewGrid = grid
          // this.$set('grid', grid)
          // this.$set(this.layouts, breakpoint, layout)
        }
      }
    },
    onLayoutUpdate (layout, layouts, last) {
      debug('onLayoutUpdate', layout, layouts, last)
      // this.$set(this.layouts, this.breakpoint, layout)
      let grid = this.viewGrid
      grid.layouts[grid.breakpoint] = layout
      this.viewGrid = grid
    },

    onLayoutChange (layout, layouts, breakpoint) {
      debug('onLayoutChange', layout, layouts, breakpoint)
      // this.$set(this.layouts, breakpoint, layout)
      let grid = this.viewGrid
      grid.layouts[breakpoint] = layout
      this.viewGrid = grid
    },

    onLayoutInit (layout, layouts, cols, breakpoint) {
      debug('onLayoutInit', layout, layouts, cols, breakpoint)
      // this.cols = cols
      // this.breakpoint = breakpoint
      // this.$set(this.layouts, breakpoint, layout)
      let grid = this.viewGrid
      grid.cols = cols
      grid.breakpoint = breakpoint
      grid.layouts[grid.breakpoint] = layout
      this.viewGrid = grid
    },

    onBreakpointChange (breakpoint) {
      debug('onBreakpointChange', breakpoint)
      // this.breakpoint = breakpoint
      let grid = this.viewGrid
      grid.breakpoint = breakpoint
      this.viewGrid = grid
    },

    onWidthChange (width, cols) {
      debug('onWidthChange', width, cols)
      // this.cols = cols
      let grid = this.viewGrid
      grid.cols = cols
      this.viewGrid = grid
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

/* #content {
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
