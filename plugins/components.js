import Vue from 'vue'
import HoverProd from '../components/HoverProd.vue'

const components = { HoverProd}

Object.entries(components).forEach(([name, component]) => {
  Vue.component(name, component)
})


// nuxt.config.js
export default {
  plugins: ['~plugins/components']
}