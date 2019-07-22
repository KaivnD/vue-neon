import Editor from './Editor'
import { Generator } from './Components'

function plugin (Vue) {
  Vue.component('n-editor', Editor)
  Vue.component('n-generator', Generator)
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
  Generator,
  version
}
