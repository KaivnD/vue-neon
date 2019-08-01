import Editor from './Editor'
import CompMixin from './libs/Component'
import Input from './modules/Input'
import Output from './modules/Output'

function plugin (Vue) {
  Vue.component('n-editor', Editor)
  Vue.component('n-input', Input)
  Vue.component('n-output', Output)
}

// Install by default if using the script tag
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(plugin)
  window.NCompMixin = CompMixin
}

export default plugin
const version = '__VERSION__'
// Export all components too
export {
  Editor,
  version,
  Input,
  Output,
  CompMixin
}
