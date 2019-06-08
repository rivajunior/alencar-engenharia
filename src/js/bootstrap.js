import Swiper from 'swiper'
import $ from 'jquery'
import 'popper.js'
import 'bootstrap'
import '../scss/app.scss'

export default {
  init() {
    window.$ = window.jQuery = $

    Swiper.extendDefaults({
      a11y: {
        prevSlideMessage: 'Slide anterior',
        nextSlideMessage: 'Próximo slide',
        firstSlideMessage: 'Primeiro slide',
        lastSlideMessage: 'Último slide',
        paginationBulletMessage: 'Vá para o slide {{index}}'
      }
    })
  }
}
