import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'

import grids from './grids'
import components from './components'

Vue.use(Vuex)

const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
  // reducer: state => ({
  //   app: state.app, hosts : state.hosts, stats: state.stats
  // }), //only save app module
  modules: ['grids', 'components']
})

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    plugins: [vuexLocal.plugin],
    modules: {
      grids,
      components
    },

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEV
  })

  return Store
}
