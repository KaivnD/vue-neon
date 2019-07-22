import Editor from './Editor'
import Component from './modules/Component'

function plugin (Vue) {
  Vue.component('v-neon', Editor)
  Vue.component('v-comp', Component)
}

// Install by default if using the script tag
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(plugin)
}

export default plugin
const version = '__VERSION__'
// Export all components too
export {
  Editor,
  Component,
  version
}