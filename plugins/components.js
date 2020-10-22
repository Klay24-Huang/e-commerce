import Vue from 'vue'
import HoverProd from '../components/HoverProd.vue'
import MyButton from '@/components/MyButton.vue'
import Carousel from '@/components/Carousel.vue'

const components = { HoverProd, MyButton, Carousel}

Object.entries(components).forEach(([name, component]) => {
  Vue.component(name, component)
})


// nuxt.config.js
export default {
  plugins: ['~plugins/components']
}