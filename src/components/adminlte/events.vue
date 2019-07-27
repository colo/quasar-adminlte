<template>

  <div>
    <div class="box box-solid">
      <div class="box-header with-border">
        <h4 class="box-title">Draggable Events</h4>
      </div>
      <div class="box-body">
        <!-- the events -->
        <div id="external-events">
          <div class="external-event bg-green">Lunch</div>
          <div class="external-event bg-yellow">Go home</div>
          <div class="external-event bg-aqua">Do homework</div>
          <div class="external-event bg-light-blue">Work on UI design</div>
          <div class="external-event bg-red">Sleep tight</div>
          <div class="checkbox">
            <label for="drop-remove">
              <input type="checkbox" id="drop-remove">
              remove after drop
            </label>
          </div>
        </div>
      </div>
      <!-- /.box-body -->
    </div>
    <!-- /. box -->
    <div class="box box-solid">
      <div class="box-header with-border">
        <h3 class="box-title">Create Event</h3>
      </div>
      <div class="box-body">
        <div class="btn-group" style="width: 100%; margin-bottom: 10px;">
          <!--<button type="button" id="color-chooser-btn" class="btn btn-info btn-block dropdown-toggle" data-toggle="dropdown">Color <span class="caret"></span></button>-->
          <ul class="fc-color-picker" id="color-chooser">
            <li><a class="text-aqua" href="#"><i class="fa fa-square"></i></a></li>
            <li><a class="text-blue" href="#"><i class="fa fa-square"></i></a></li>
            <li><a class="text-light-blue" href="#"><i class="fa fa-square"></i></a></li>
            <li><a class="text-teal" href="#"><i class="fa fa-square"></i></a></li>
            <li><a class="text-yellow" href="#"><i class="fa fa-square"></i></a></li>
            <li><a class="text-orange" href="#"><i class="fa fa-square"></i></a></li>
            <li><a class="text-green" href="#"><i class="fa fa-square"></i></a></li>
            <li><a class="text-lime" href="#"><i class="fa fa-square"></i></a></li>
            <li><a class="text-red" href="#"><i class="fa fa-square"></i></a></li>
            <li><a class="text-purple" href="#"><i class="fa fa-square"></i></a></li>
            <li><a class="text-fuchsia" href="#"><i class="fa fa-square"></i></a></li>
            <li><a class="text-muted" href="#"><i class="fa fa-square"></i></a></li>
            <li><a class="text-navy" href="#"><i class="fa fa-square"></i></a></li>
          </ul>
        </div>
        <!-- /btn-group -->
        <div class="input-group">
          <input id="new-event" type="text" class="form-control" placeholder="Event Title">

          <div class="input-group-btn">
            <button id="add-new-event" type="button" class="btn btn-primary btn-flat">Add</button>
          </div>
          <!-- /btn-group -->
        </div>
        <!-- /input-group -->
      </div>
    </div>
  </div>

</template>

<script>
/* global $ */
// import 'fullcalendar/dist/fullcalendar.min.css'
// import 'fullcalendar/dist/fullcalendar.print.min.css'
// import 'moment'
// import 'fullcalendar'

import * as Debug from 'debug'
const debug = Debug('components:AdminLte:Events')

import { dom } from 'quasar'
const { ready } = dom

export default {
  name: 'admin-lte-events',

  // props: {
  //   id: {
  //     type: [String],
  //     default: 'calendar'
  //   }
  // //   bg: {
  // //     type: [String],
  // //     default: undefined
  // //   },
  // //   // bgIcon: {
  // //   //   type: [String],
  // //   //   default: undefined
  // //   // },
  // //   icon: {
  // //     type: [String],
  // //     default: 'fa fa-envelope'
  // //   }
  // //   // text: {
  // //   //   type: [String],
  // //   //   default: 'lorem ipsum'
  // //   // },
  // //   // number: {
  // //   //   type: [Number],
  // //   //   default: 0
  // //   // },
  // //   // component: {
  // //   //   type: [Object],
  // //   //   defualt: function () { return undefined }
  // //   // }
  // },

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

    init_events: function (ele) {
      ele.each(function () {
        // create an Event Object (http://arshaw.com/fullcalendar/docs/event_data/Event_Object/)
        // it doesn't need to have a start or end
        var eventObject = {
          title: $.trim($(this).text()) // use the element's text as the event title
        }

        // store the Event Object in the DOM element so we can get to it later
        $(this).data('eventObject', eventObject)

        // make the event draggable using jQuery UI
        $(this).draggable({
          zIndex: 1070,
          revert: true, // will cause the event to go back to its
          revertDuration: 0 //  original position after the drag
        })
      })
    },
    admin_lte_ui: function () {
      let self = this

      self.init_events($('#external-events div.external-event'))

      /* ADDING EVENTS */
      var currColor = '#3c8dbc' // Red by default
      // Color chooser button
      var colorChooser = $('#color-chooser-btn')
      $('#color-chooser > li > a').click(function (e) {
        e.preventDefault()
        // Save color
        currColor = $(this).css('color')
        // Add color effect to button
        $('#add-new-event').css({ 'background-color': currColor, 'border-color': currColor })
      })
      $('#add-new-event').click(function (e) {
        e.preventDefault()
        // Get value and make sure it is not null
        var val = $('#new-event').val()
        if (val.length === 0) {
          return
        }

        // Create events
        var event = $('<div />')
        event.css({
          'background-color': currColor,
          'border-color': currColor,
          'color': '#fff'
        }).addClass('external-event')
        event.html(val)
        $('#external-events').prepend(event)

        // Add draggable funtionality
        self.init_events(event)

        // Remove event from text input
        $('#new-event').val('')
      })
    }

  },

  data: function () {
    return {
      // bg: 'bg-secondary'
    }
  }
}

</script>
