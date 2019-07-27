<template>

  <!-- THE CALENDAR -->
  <div :id="id"></div>

</template>

<script>
/* global $ */
import 'fullcalendar/dist/fullcalendar.min.css'
// import 'fullcalendar/dist/fullcalendar.print.min.css'
import 'moment'
import 'fullcalendar'

import * as Debug from 'debug'
const debug = Debug('components:AdminLte:FullCalendar')

import { dom } from 'quasar'
const { ready } = dom

export default {
  name: 'admin-lte-fullcalendar',

  props: {
    id: {
      type: [String],
      default: 'calendar'
    }
  //   bg: {
  //     type: [String],
  //     default: undefined
  //   },
  //   // bgIcon: {
  //   //   type: [String],
  //   //   default: undefined
  //   // },
  //   icon: {
  //     type: [String],
  //     default: 'fa fa-envelope'
  //   }
  //   // text: {
  //   //   type: [String],
  //   //   default: 'lorem ipsum'
  //   // },
  //   // number: {
  //   //   type: [Number],
  //   //   default: 0
  //   // },
  //   // component: {
  //   //   type: [Object],
  //   //   defualt: function () { return undefined }
  //   // }
  },

  // https://forum.vuejs.org/t/dynamic-props-and-custom-event-emit-in-dynamic-component/10932
  // directives: {
  //   DynamicEvents: {
  //     bind: (el, binding, vnode) => {
  //       const allEvents = binding.value
  //       Object.keys(allEvents).forEach((event) => {
  //         // register handler in the dynamic component
  //         vnode.componentInstance.$on(event, (eventData) => {
  //           const targetEvent = allEvents[event]
  //           vnode.context[targetEvent](eventData)
  //         })
  //       })
  //     },
  //     unbind: function (el, binding, vnode) {
  //       vnode.componentInstance.$off()
  //     }
  //   }
  // },

  mounted: function () {
    ready(this.admin_lte_ui())
  },
  methods: {
    // saveNewOrder: function(e, ui) {
    //   debug('saveNewOrder', e, ui)
    //   this.EventBus.$emit('sortable', [e,ui])
    // //   // let $sortable = $('.connectedSortable')
    // //   // let positions = JSON.stringify($sortable.sortable("toArray"));
    // //   // localStorage.setItem('positions', positions);
    // },
    // https://stackoverflow.com/questions/44134147/vue-js-removes-jquery-event-handlers
    admin_lte_ui: function () {
      debug('admin_lte_ui')

      let self = this

      /* initialize the calendar
       ----------------------------------------------------------------- */
      // Date for the calendar events (dummy data)
      var date = new Date()
      var d = date.getDate(),
        m = date.getMonth(),
        y = date.getFullYear()
      $('#' + self.id).fullCalendar({
        header: {
          left: 'prev,next today',
          center: 'title',
          right: 'month,agendaWeek,agendaDay'
        },
        buttonText: {
          today: 'today',
          month: 'month',
          week: 'week',
          day: 'day'
        },
        // Random default events
        events: [
          {
            title: 'All Day Event',
            start: new Date(y, m, 1),
            backgroundColor: '#f56954', // red
            borderColor: '#f56954' // red
          },
          {
            title: 'Long Event',
            start: new Date(y, m, d - 5),
            end: new Date(y, m, d - 2),
            backgroundColor: '#f39c12', // yellow
            borderColor: '#f39c12' // yellow
          },
          {
            title: 'Meeting',
            start: new Date(y, m, d, 10, 30),
            allDay: false,
            backgroundColor: '#0073b7', // Blue
            borderColor: '#0073b7' // Blue
          },
          {
            title: 'Lunch',
            start: new Date(y, m, d, 12, 0),
            end: new Date(y, m, d, 14, 0),
            allDay: false,
            backgroundColor: '#00c0ef', // Info (aqua)
            borderColor: '#00c0ef' // Info (aqua)
          },
          {
            title: 'Birthday Party',
            start: new Date(y, m, d + 1, 19, 0),
            end: new Date(y, m, d + 1, 22, 30),
            allDay: false,
            backgroundColor: '#00a65a', // Success (green)
            borderColor: '#00a65a' // Success (green)
          },
          {
            title: 'Click for Google',
            start: new Date(y, m, 28),
            end: new Date(y, m, 29),
            url: 'http://google.com/',
            backgroundColor: '#3c8dbc', // Primary (light-blue)
            borderColor: '#3c8dbc' // Primary (light-blue)
          }
        ],
        editable: true,
        droppable: true, // this allows things to be dropped onto the calendar !!!
        drop: function (date, allDay) { // this function is called when something is dropped
          // retrieve the dropped element's stored Event Object
          var originalEventObject = $(this).data('eventObject')

          // we need to copy it, so that multiple events don't have a reference to the same object
          var copiedEventObject = $.extend({}, originalEventObject)

          // assign it the date that was reported
          copiedEventObject.start = date
          copiedEventObject.allDay = allDay
          copiedEventObject.backgroundColor = $(this).css('background-color')
          copiedEventObject.borderColor = $(this).css('border-color')

          // render the event on the calendar
          // the last `true` argument determines if the event "sticks" (http://arshaw.com/fullcalendar/docs/event_rendering/renderEvent/)
          $('#calendar').fullCalendar('renderEvent', copiedEventObject, true)

          // is the "remove after drop" checkbox checked?
          if ($('#drop-remove').is(':checked')) {
            // if so, remove the element from the "Draggable Events" list
            $(this).remove()
          }
        }
      })
    }
  },
  // mounted: function () {
  //
  // let self = this
  //
  // /* initialize the calendar
  //  ----------------------------------------------------------------- */
  // // Date for the calendar events (dummy data)
  // var date = new Date()
  // var d = date.getDate(),
  //   m = date.getMonth(),
  //   y = date.getFullYear()
  // $('#' + self.id).fullCalendar({
  //   header: {
  //     left: 'prev,next today',
  //     center: 'title',
  //     right: 'month,agendaWeek,agendaDay'
  //   },
  //   buttonText: {
  //     today: 'today',
  //     month: 'month',
  //     week: 'week',
  //     day: 'day'
  //   },
  //   // Random default events
  //   events: [
  //     {
  //       title: 'All Day Event',
  //       start: new Date(y, m, 1),
  //       backgroundColor: '#f56954', // red
  //       borderColor: '#f56954' // red
  //     },
  //     {
  //       title: 'Long Event',
  //       start: new Date(y, m, d - 5),
  //       end: new Date(y, m, d - 2),
  //       backgroundColor: '#f39c12', // yellow
  //       borderColor: '#f39c12' // yellow
  //     },
  //     {
  //       title: 'Meeting',
  //       start: new Date(y, m, d, 10, 30),
  //       allDay: false,
  //       backgroundColor: '#0073b7', // Blue
  //       borderColor: '#0073b7' // Blue
  //     },
  //     {
  //       title: 'Lunch',
  //       start: new Date(y, m, d, 12, 0),
  //       end: new Date(y, m, d, 14, 0),
  //       allDay: false,
  //       backgroundColor: '#00c0ef', // Info (aqua)
  //       borderColor: '#00c0ef' // Info (aqua)
  //     },
  //     {
  //       title: 'Birthday Party',
  //       start: new Date(y, m, d + 1, 19, 0),
  //       end: new Date(y, m, d + 1, 22, 30),
  //       allDay: false,
  //       backgroundColor: '#00a65a', // Success (green)
  //       borderColor: '#00a65a' // Success (green)
  //     },
  //     {
  //       title: 'Click for Google',
  //       start: new Date(y, m, 28),
  //       end: new Date(y, m, 29),
  //       url: 'http://google.com/',
  //       backgroundColor: '#3c8dbc', // Primary (light-blue)
  //       borderColor: '#3c8dbc' // Primary (light-blue)
  //     }
  //   ],
  //   editable: true,
  //   droppable: true, // this allows things to be dropped onto the calendar !!!
  //   drop: function (date, allDay) { // this function is called when something is dropped
  //     // retrieve the dropped element's stored Event Object
  //     var originalEventObject = $(this).data('eventObject')
  //
  //     // we need to copy it, so that multiple events don't have a reference to the same object
  //     var copiedEventObject = $.extend({}, originalEventObject)
  //
  //     // assign it the date that was reported
  //     copiedEventObject.start = date
  //     copiedEventObject.allDay = allDay
  //     copiedEventObject.backgroundColor = $(this).css('background-color')
  //     copiedEventObject.borderColor = $(this).css('border-color')
  //
  //     // render the event on the calendar
  //     // the last `true` argument determines if the event "sticks" (http://arshaw.com/fullcalendar/docs/event_rendering/renderEvent/)
  //     $('#calendar').fullCalendar('renderEvent', copiedEventObject, true)
  //
  //     // is the "remove after drop" checkbox checked?
  //     if ($('#drop-remove').is(':checked')) {
  //       // if so, remove the element from the "Draggable Events" list
  //       $(this).remove()
  //     }
  //   }
  // })

  // //   //console.log('this.$el', this.$el)
  // $(this.$el).on('expanded.boxwidget', function () {
  //   self.$emit('show', self.$el)
  //   // console.log('expanded')
  //   // this.showCollapsible(this.$el)
  // })
  //
  // $(this.$el).on('collapsed.boxwidget', function () {
  //   self.$emit('hide', self.$el)
  //   // console.log('collapsed')
  //   // this.hideCollapsible(this.$el)
  // })
  //
  // $(this.$el).on('removed.boxwidget', function () {
  //   self.$emit('remove', self.$el)
  // })
  // },

  data: function () {
    return {
      // bg: 'bg-secondary'
    }
  }
}

</script>
