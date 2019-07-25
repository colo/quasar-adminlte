<template>
  <div class="info-box" :class="(bg) ? bg : ''" :id="id">
    <span class="info-box-icon" :class="(bgIcon) ? bgIcon : ''"><i :class="icon"></i></span>

    <div class="info-box-content">
      <component
        v-if="component"
        :is="component.type"
        v-bind="component.options"
        v-dynamic-events="(component.events) ? component.events : {}"
      >
      </component>
      <template v-else-if="text">
        <span class="info-box-text">{{text}}</span>
        <span class="info-box-number">{{number}}</span>
      </template>
      <slot v-else></slot>
    </div>
    <!-- /.info-box-content -->
  </div>
</template>

<script>
export default {
  name: 'admin-lte-info-box',

  props: {
    id: {
      type: [String],
      default: ''
    },
    bg: {
      type: [String],
      default: undefined
    },
    bgIcon: {
      type: [String],
      default: undefined
    },
    icon: {
      type: [String],
      default: 'fa fa-envelope'
    },
    text: {
      type: [String],
      default: 'lorem ipsum'
    },
    number: {
      type: [Number],
      default: 0
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
