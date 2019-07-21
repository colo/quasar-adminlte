/*
export function someMutation (state) {
}
*/

import Vue from 'vue'
import { extend } from 'quasar'

export function setGrid (state, grid) {
  let newGrid = extend(true, state._default, grid)
  // if (!grid.layout) { grid.layout = [] }
  const id = newGrid.id
  delete newGrid.id
  state[id] = newGrid
}
