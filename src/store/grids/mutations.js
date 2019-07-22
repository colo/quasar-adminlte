/*
export function someMutation (state) {
}
*/

import Vue from 'vue'
import { extend } from 'quasar'

export function setGrid (state, grid) {
  // let newGrid = extend(true, state._default, grid)
  // if (!grid.layout) { grid.layout = [] }
  const id = grid.id
  delete grid.id
  // if (state[id]) {
  //   let newGrid = extend(true, state[id], grid)
  //   state[id] = newGrid
  // }
  state[id] = grid
}

export function addGrid (state, grid) {
  const id = grid.id
  delete grid.id
  if (!state[id]) {
    let newGrid = extend(true, state._default, grid)
    // if (!grid.layout) { grid.layout = [] }
    state[id] = newGrid
  }
  // else {
  //   state[id] = grid
  // }
}
