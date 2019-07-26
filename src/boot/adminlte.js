// import BootstrapVue from 'bootstrap-vue'

import 'bootstrap/dist/css/bootstrap.css'
// import 'bootswatch/slate/bootstrap.min.css'

import 'admin-lte/dist/css/AdminLTE.min.css'
// import 'admin-lte/dist/css/skins/skin-purple.min.css'

import 'jquery'
// import 'jquery-ui'
import 'webpack-jquery-ui'
import 'webpack-jquery-ui/css'
import 'bootstrap/dist/js/bootstrap.min.js'
import 'jquery-slimscroll'
import 'fastclick'

// import 'admin-lte/dist/js/adminlte.min.js'

// import 'bootstrap-vue/dist/bootstrap-vue.css'
// import AdminLteBoxSolid from '@components/adminlte/boxSolid'

import upperFirst from 'lodash/upperFirst'
import camelCase from 'lodash/camelCase'

export default ({ app, router, Vue }) => {
  // https://webpack.js.org/guides/dependency-management/#require-context
  const requireComponent = require.context(
    // Look for files in the current directory
    '@components/adminlte/',
    // Do not look in subdirectories
    false,
    // Only include "_base-" prefixed .vue files
    /[\w-]+\.vue$/
  )

  // For each matching file name...
  requireComponent.keys().forEach((fileName) => {
    // Get the component config
    const componentConfig = requireComponent(fileName)
    // Get the PascalCase version of the component name
    const componentName = 'AdminLte' + upperFirst(
      camelCase(
        fileName
          // Remove the "./_" from the beginning
          // .replace(/^\.\/_/, '')
          // Remove the file extension from the end
          .replace(/\.\w+$/, '')
      )
    )
    // Globally register the component
    // console.log('componentName')
    Vue.component(componentName, componentConfig.default || componentConfig)
  })
}
