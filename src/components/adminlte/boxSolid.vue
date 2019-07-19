<template>
  <!-- solid sales graph -->
  <div class="box box-solid" :id="id">
    <div v-if="header == true" class="box-header">
      <i class="fa fa-th"></i>

      <h3 v-if="title != ''" class="box-title">{{title}}</h3>

      <div v-if="tools == true" class="box-tools pull-right">
        <button type="button" class="btn bg-white btn-sm" data-widget="collapse"><i class="fa fa-minus"></i>
        </button>
        <button type="button" class="btn bg-white btn-sm" data-widget="remove"><i class="fa fa-times"></i>
        </button>
      </div>
    </div>
    <div class="box-body border-radius-none">
      <slot></slot>
    </div>
    <!-- /.box-body -->

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
  name: 'admin-lte-box-solid',

  props: {
    id: {
      type: [String],
      default: ''
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
      type: [Boolean],
      default: true
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
