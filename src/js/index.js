import Swiper from 'swiper'
import app from './bootstrap'
import formSubscriber from './form-subscriber'

app.init()
window.Swiper = Swiper
// eslint-disable-next-line no-new
new Swiper($('.swiper-container')[0], {
  initialSlide: 1,
  breakpointsInverse: true,
  slidesPerView: 'auto',
  centeredSlides: true,
  spaceBetween: 15,
  breakpoints: {
    768: {
      initialSlide: 0,
      spaceBetween: 30,
      slidesPerView: 3,
      centeredSlides: false
    }
  }
})

$('form').submit(
  formSubscriber({
    success(response, form, data) {
      const modal = $('#modal-contact-response').modal('show')

      form.reset()
      form.classList.remove('was-validated')

      modal.find('.modal-title').text('Recebemos seus dados')

      modal.find('#modal-contact-response-text').text(response.message)
    },

    error(response, form) {
      const modal = $('#modal-contact-response').modal('show')

      modal
        .find('.modal-title')
        .text('Ocorreu um erro')
        .addClass('text-danger')

      modal.find('#modal-contact-response-text').text(response.message)
    }
  })
)
