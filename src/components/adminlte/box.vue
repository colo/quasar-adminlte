<template>
  <!-- solid sales graph -->
  <div class="box" :class="type" :id="id">
    <div v-if="header" class="box-header" :class="(header.border) ? 'with-border' : ''">
      <i :class="header.icon"></i>

      <h3 v-if="title != ''" class="box-title">{{title}}</h3>

      <div v-if="tools == true" class="box-tools pull-right">
        <button type="button" class="btn bg-white btn-sm" data-widget="collapse"><i class="fa fa-minus"></i>
        </button>
        <button type="button" class="btn bg-white btn-sm" data-widget="remove"><i class="fa fa-times"></i>
        </button>
      </div>
    </div>
    <div class="box-body" :class="body.class">
      <component
        v-if="body.component"
        :is="body.component.type"
        v-bind="body.component.options"
        v-dynamic-events="(body.component.events) ? body.component.events : {}"
      >
      </component>
      <template v-else-if="body.text">
        {{body.text}}
      </template>
      <slot v-else></slot>
    </div>
    <!-- /.box-body -->
    <div v-if="footer" class="box-footer" :class="footer.class">
      <component
        v-if="footer.component"
        :is="footer.component.type"
        v-bind="footer.component.options"
        v-dynamic-events="(footer.component.events) ? footer.component.events : {}"
      >
      </component>
      <template v-else-if="footer.text">
        {{footer.text}}
      </template>
      <slot v-else></slot>
    </div>

    <!-- <div class="box-footer no-border">
      <div class="row">
        <div class="col-xs-4 text-center" style="border-right: 1px solid #f4f4f4">
          <input type="text" class="knob" data-readonly="true" value="20" data-width="60" data-height="60"
                 data-fgColor="#39CCCC">

          <div class="knob-label">Mail-Orders</div>
        </div>

        <div class="col-xs-4 text-center" style="border-right: 1px solid #f4f4f4">
          <input type="text" class="knob" data-readonly="true" value="50" data-width="60" data-height="60"
                 data-fgColor="#39CCCC">

          <div class="knob-label">Online</div>
        </div>

        <div class="col-xs-4 text-center">
          <input type="text" class="knob" data-readonly="true" value="30" data-width="60" data-height="60"
                 data-fgColor="#39CCCC">

          <div class="knob-label">In-Store</div>
        </div>

      </div>

    </div> -->
    <!-- /.box-footer -->
  </div>
  <!-- /.box -->
</template>

<script>
/* global $ */

export default {
  name: 'admin-lte-box',

  props: {
    id: {
      type: [String],
      default: ''
    },
    type: {
      type: [String],
      /**
      * collapsed-box
      * box-default | box-success | box-warning | box-danger
      **/
      default: 'box-default box-solid'
    },
    title: {
      type: [String],
      default: ''
    },
    tools: {
      type: [Boolean],
      default: true
    },
    header: {
      type: [Object, Boolean],
      default: function () {
        return {
          border: true,
          icon: 'fa fa-th'
        }
      }
    },
    body: {
      type: [Object],
      default: function () {
        return {
          class: 'border-radius-none',
          text: undefined,
          component: undefined
        }
      }
    },
    footer: {
      type: [Object, Boolean],
      default: function () {
        return {
          class: 'box-comments',
          text: undefined,
          component: undefined
        }
      }
    }

  },

  data () {
    return {
    }
  },

  mounted: function () {
  //
    let self = this
    //   //console.log('this.$el', this.$el)
    $(this.$el).on('expanded.boxwidget', function () {
      self.$emit('show', self.$el)
      // console.log('expanded')
      // this.showCollapsible(this.$el)
    })

    $(this.$el).on('collapsed.boxwidget', function () {
      self.$emit('hide', self.$el)
      // console.log('collapsed')
      // this.hideCollapsible(this.$el)
    })

    $(this.$el).on('removed.boxwidget', function () {
      self.$emit('remove', self.$el)
    })
  }
  // updated: function() {
  // //
  //   let self = this
  // //   //console.log('this.$el', this.$el)
  //   $(this.$el).on( "expanded.boxwidget",function(){
  //     self.$emit('show', self.$el)
  //     // this.showCollapsible(this.$el)
  //   })
  //
  //   $(this.$el).on( "collapsed.boxwidget",function(){
  //     self.$emit('hide', self.$el)
  //     // this.hideCollapsible(this.$el)
  //   })
  //
  //   $(this.$el).on( "removed.boxwidget",function(){
  //     self.$emit('remove', self.$el)
  //   })
  // },
  // mounted() {
  //   $(document).trigger('vue-loaded')
  //   $('.box').boxWidget({
  //     animationSpeed : 300,
  //   });
  // },
  // updated: function(){
  //   $(document).trigger('vue-loaded')
  //
  //   $('.box').boxWidget({
  //     animationSpeed : 300,
  //   });
  //
  // }
}

</script>
