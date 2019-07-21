/*
export function someMutation (state) {
}
*/

const store = require('store')

// https://github.com/vuejs/vuex/issues/1244
function getModuleNamespace (store, state) {
  const moduleNamespace = Object.keys(store._modulesNamespaceMap)
    .find(path => store._modulesNamespaceMap[path].context.state === state)

  // console.log('getModuleNamespace', moduleNamespace, typeof moduleNamespace, moduleNamespace.slice(0, -1)) // .split('/')

  if (typeof moduleNamespace === 'string') {
    return moduleNamespace.slice(0, -1) // .split('/')
  }
}

// export function setNS(state, ns) {
//   state.ns = ns
// }

export function setLayout (state, layout) {
  console.log('action setLayout', layout)
  // console.log(getModuleNamespace(this, state))
  state.ns = (!state.ns) ? getModuleNamespace(this, state) : state.ns
  store.set(state.ns, layout)
  state.layout = layout
}
