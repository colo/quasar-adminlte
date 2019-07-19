<script>
/* eslint-disable */
import '@components/adminlte/index'

export default {
  name: 'admin-lte-mixin',

  components: {

  },

  data () {
    return {
    }
  },

  mounted () {
    this.admin_lte_ui()
  },
  updated: function () {
    this.admin_lte_ui()
  },
  methods: {
    // https://stackoverflow.com/questions/44134147/vue-js-removes-jquery-event-handlers
    admin_lte_ui: function () {
      $(document).trigger('vue-loaded')

      // Resolve conflict in jQuery UI tooltip with Bootstrap tooltip
      jQuery.widget.bridge('uibutton', jQuery.ui.button)

      // console.log('admin-lte this.$route',this.$route)

      // Make the dashboard widgets sortable Using jquery UI
      $('.connectedSortable').sortable({
        placeholder: 'sort-highlight',
        connectWith: '.connectedSortable',
        handle: '.box-header, .nav-tabs',
        forcePlaceholderSize: true,
        zIndex: 999999
      })
      $('.connectedSortable .box-header, .connectedSortable .nav-tabs-custom').css('cursor', 'move')

      $('.box').boxWidget({
        animationSpeed: 300
      })
    }
  }
}

// import 'admin-lte/dist/js/adminlte.min.js'
</script>

<style>
</style>
