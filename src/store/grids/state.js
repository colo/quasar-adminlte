export default function () {
  return {
    // all: {},
    _default: {
      layouts: {
        'lg': [
          { x: 0, y: 0, w: 10, h: 3, i: '1' },
          {
            x: 10,
            y: 0,
            w: 2,
            h: 3,
            i: '2',
            immobile: true
            // component: '<q-btn round/>'
            // elements: [
            //   {
            //     // 'type': 'edit-btn',
            //     'type': 'q-btn',
            //     events: { click: 'disableGrid' },
            //     options: {
            //       round: true,
            //       color: 'primary'
            //       // icon: 'shopping_cart',
            //       // 'v-on': '{ click: disableGrid }',
            //       // 'v-on:click': '"disableGrid"',
            //       // 'v-on:click': '$emit("disableGrid")'
            //       // 'flat': true
            //       //   'bordered': true
            //       //   // class: 'bg-grey-9',
            //       //   // text: 'test' +
            //       //   // '\nsome more'
            //     }
            //   }
            // ]
          },
          { x: 0, y: 1, w: 2, h: 3, i: '3' },
          { x: 2, y: 1, w: 2, h: 3, i: '4' }
        ]
      },
      breakpoint: 'lg',
      // components: {
      // // //   '1': { i: '1', component: 'example-component', defaultSize: 2 },
      //   // '2': { i: '2', component: 'q-btn', defaultSize: 2 }
      //   '2': { i: '2', component: 'q-btn', slot: '<q-btn round/>', defaultSize: 2 }
      // // //   '3': { i: '3', component: 'example-component', defaultSize: 2 },
      // // //   '4': { i: '4', component: 'example-component', defaultSize: 2 }
      // },
      cols: 12,
      // breakpoints: { lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 },
      // colsAll: { lg: 12, md: 8, sm: 6, xs: 4, xxs: 2 },

      // isDraggable: true,
      // isResizable: true,
      preview: false
    }
    // _default: {
    //   layout: [
    //     { 'x': 0,
    //       'y': 0,
    //       'w': 10,
    //       'h': 2,
    //       'i': '0',
    //       elements: [
    //       ]
    //       // 'type': 'q-btn',
    //       // options: { color: 'white', 'text-color': 'black', label: 'Standard' }
    //     },
    //     // { 'x': 10,
    //     //   'y': 0,
    //     //   'w': 2,
    //     //   'h': 2,
    //     //   'i': '1',
    //     //   // options: {
    //     //   //   static: true
    //     //   // },
    //     //   elements: [
    //     //     {
    //     //       // 'type': 'edit-btn',
    //     //       'type': 'q-btn',
    //     //       events: { click: 'disableGrid' },
    //     //       options: {
    //     //         round: true,
    //     //         color: 'primary'
    //     //         // icon: 'shopping_cart',
    //     //         // 'v-on': '{ click: disableGrid }',
    //     //         // 'v-on:click': '"disableGrid"',
    //     //         // 'v-on:click': '$emit("disableGrid")'
    //     //         // 'flat': true
    //     //         //   'bordered': true
    //     //         //   // class: 'bg-grey-9',
    //     //         //   // text: 'test' +
    //     //         //   // '\nsome more'
    //     //       }
    //     //     }
    //     //   ]
    //     //   // 'type': 'q-btn',
    //     //   // options: { color: 'white', 'text-color': 'black', label: 'Standard' }
    //     // },
    //     { 'x': 0,
    //       'y': 1,
    //       'w': 12,
    //       'h': 2,
    //       'i': '2',
    //       elements: [
    //       ]
    //       // 'type': 'q-btn',
    //       // options: { color: 'white', 'text-color': 'black', label: 'Standard' }
    //     }
    //   ],
    //
    //   isDraggable: true,
    //   isResizable: true,
    //   preview: false,
    //   contenteditable: true
    // }
  }
}
