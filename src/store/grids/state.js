export default function () {
  return {
    // all: {},
    _default: {
      layout: [
        { 'x': 0,
          'y': 0,
          'w': 10,
          'h': 3,
          'i': '0',
          elements: []
          // 'type': 'q-btn',
          // options: { color: 'white', 'text-color': 'black', label: 'Standard' }
        },
        { 'x': 11,
          'y': 0,
          'w': 2,
          'h': 2,
          'i': '1',
          // options: {
          //   static: true
          // },
          elements: [
            {
              // 'type': 'edit-btn',
              'type': 'q-btn',
              // events: { click: 'disableGrid' },
              options: {
                round: true,
                color: 'primary'
                // icon: 'shopping_cart',
                // 'v-on': '{ click: disableGrid }',
                // 'v-on:click': '"disableGrid"',
                // 'v-on:click': '$emit("disableGrid")'
                // 'flat': true
              //   'bordered': true
              //   // class: 'bg-grey-9',
              //   // text: 'test' +
              //   // '\nsome more'
              }
            }
          ]

          // // options: { color: 'white', 'text-color': 'black', label: 'Standard' }
        },
        {
          'x': 0,
          'y': 1,
          'w': 12,
          'h': 4,
          'i': '2',
          elements: []
          // type: 'q-chip',
          // options: {
          //   icon: 'alarm',
          //   label: 'Set alarm'
          // }
        }
        // { 'x': 6, 'y': 0, 'w': 2, 'h': 3, 'i': '3' },
        // { 'x': 8, 'y': 0, 'w': 2, 'h': 3, 'i': '4' },
        // { 'x': 10, 'y': 0, 'w': 2, 'h': 3, 'i': '5' },
        // { 'x': 0, 'y': 5, 'w': 2, 'h': 5, 'i': '6' },
        // { 'x': 2, 'y': 5, 'w': 2, 'h': 5, 'i': '7' },
        // { 'x': 4, 'y': 5, 'w': 2, 'h': 5, 'i': '8' },
        // { 'x': 6, 'y': 4, 'w': 2, 'h': 4, 'i': '9' },
        // { 'x': 8, 'y': 4, 'w': 2, 'h': 4, 'i': '10' },
        // { 'x': 10, 'y': 4, 'w': 2, 'h': 4, 'i': '11' },
        // { 'x': 0, 'y': 10, 'w': 2, 'h': 5, 'i': '12' },
        // { 'x': 2, 'y': 10, 'w': 2, 'h': 5, 'i': '13' },
        // { 'x': 4, 'y': 8, 'w': 2, 'h': 4, 'i': '14' },
        // { 'x': 6, 'y': 8, 'w': 2, 'h': 4, 'i': '15' },
        // { 'x': 8, 'y': 10, 'w': 2, 'h': 5, 'i': '16' },
        // { 'x': 10, 'y': 4, 'w': 2, 'h': 2, 'i': '17' },
        // { 'x': 0, 'y': 9, 'w': 2, 'h': 3, 'i': '18' },
        // { 'x': 2, 'y': 6, 'w': 2, 'h': 2, 'i': '19' }
      ],

      isDraggable: true,
      isResizable: true,
      preview: false,
      contenteditable: true
    }
  }
}
