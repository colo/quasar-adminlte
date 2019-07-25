<template>
  <div class="card" :class="'card-'+type" :id="id">
    <div class="card-header">
      <h3 class="card-title">{{title}}</h3>

      <div class="card-tools">
        <button type="button" class="btn btn-tool" data-widget="maximize"><i class="fas fa-expand"></i></button>
        <button type="button" class="btn btn-tool" data-widget="collapse"><i class="fas fa-minus"></i></button>
        <button type="button" class="btn btn-tool" data-widget="remove"><i class="fas fa-times"></i></button>
      </div>
      <!-- /.card-tools -->
    </div>
    <!-- /.card-header -->
    <div class="card-body">
      <component
        v-if="component"
        :is="component.type"
        v-bind="component.options"
        v-dynamic-events="(component.events) ? component.events : {}"
      >
      </component>
      <template v-else-if="text">
        {{text}}
      </template>
      <slot v-else></slot>
    </div>
    <!-- /.card-body -->
  </div>

</template>

<script>
export default {
  name: 'admin-lte-card',

  props: {
    id: {
      type: [String],
      default: ''
    },
    // bg: {
    //   type: [String],
    //   default: undefined
    // },
    // bgIcon: {
    //   type: [String],
    //   default: undefined
    // },
    // icon: {
    //   type: [String],
    //   default: 'fa fa-envelope'
    // },
    title: {
      type: [String],
      default: 'Card'
    },
    text: {
      type: [String],
      default: 'lorem ipsum'
    },
    type: {
      type: [String],
      default: 'primary'
    },
    component: {
      type: [Object],
      defualt: function () { return undefined }
    }
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

  data: function () {
    return {
      // bg: 'bg-secondary'
    }
  }
}

</script>
