
import Store from '../index'

export default function () {
  console.log('state')
  console.log(Store())
  return {
    layout: [
      { 'x': 0,
        'y': 0,
        'w': 2,
        'h': 2,
        'i': '0',
        elements: [
          // {
          //   type: 'admin-lte-box-solid',
          //   options: {
          //     title: 'some title',
          //     id: 'some id'
          //   }
          // }
          // {
          //   type: 'admin-lte-box-solid',
          //   options: {
          //     title: 'some title2',
          //     id: 'some id2'
          //   }
          // }
        ]
        // 'type': 'q-btn',
        // options: { color: 'white', 'text-color': 'black', label: 'Standard' }
      }
    ],

    isDraggable: true,
    isResizable: true,
    preview: false,
    contenteditable: true,

    ns: undefined
  }
}
