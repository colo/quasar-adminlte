/*
export function someGetter (state) {
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

export function getLayout (state) {
  console.log('getters getLayout')
  console.log(state.ns)
  // const ns = (!state.ns) ? getModuleNamespace(this, state) : state.ns
  //
  return (store.get(state.ns)) ? store.get(state.ns) : state.layout
}
