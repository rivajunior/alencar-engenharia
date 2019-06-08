import formToJSON from './form-to-json'
import { removeExtraSpaces } from './utils'

/**
 * Disable all inputs, selects, textarea and buttons of a given form.
 *
 * @param {HTMLFormElement} form Form to disable child fields
 */
function disableFields(form) {
  /**
   * @param {HTMLElement} el Element to verify if is visible
   * @returns {bool} true if the element is not visible
   */
  const isHidden = el => el.offsetParent === null

  ;[].forEach.call(form.elements, element => {
    if (!isHidden(element)) {
      element.disabled = true
    }
  })
}

/**
 * Ativa todos os inputs, selects, textarea e botões do formulário.
 *
 * @param {HTMLFormElement} form
 */
function enableFields(form) {
  ;[].forEach.call(form.elements, element => {
    element.disabled = false
  })
}

/**
 * Remove caracteres indesejáveis.
 *
 * @param {Object} data Objeto JSON com os dados que serão decorados
 */
function sanitize(data) {
  if (data.name) {
    data.name = removeExtraSpaces(data.name)
  }

  return data
}

// /**
//  * Copia apenas propriedades enumeráveis e próprias de um objeto de origem
//  * para um objeto destino
//  * @param {Object} data original data
//  * @param {Object} newData data to add to original data
//  */
// function decorate(data, newData) {
//   // Object.getOwnPropertyNames(newData).map(attr => {
//   //   data[attr] = newData[attr]
//   // })

//   return Object.assign(data, newData)
// }

/**
 * Pega os valores do formulário e envia o lead.
 *
 * @param {HTMLFormElement} form formulário com dados do lead para o Bingoos
 */
function submit(form, handlers) {
  let data = sanitize(formToJSON(form.elements))

  sendLead(form, data, handlers)
}

/**
 * Recebe os dados do lead e envia para o MailChimp.
 *
 * @param {HTMLFormElement} form
 * @param {Object} data Objeto com todos os valores tratados do lead
 * @param {Object} handlers
 */
function sendLead(form, data, handlers) {
  startLoading(form)

  $.ajax({
    url: 'contact.php',
    method: 'post',
    contentType: 'application/json; charset=utf-8',
    dataType: 'json',
    data: JSON.stringify(data)
  })
    .always(() => {
      finishLoading(form)

      if (typeof handlers.always === 'function') {
        handlers.always(form, data)
      }
    })
    .done(response => {
      if (typeof handlers.success === 'function') {
        handlers.success(response, form, data)
      }
    })
    .fail(response => {
      if (typeof handlers.error === 'function') {
        handlers.error(response, form)
      }
    })
}

/**
 * Adiciona spinner de carregamento e desativa campos.
 *
 * @param {HTMLFormElement} form
 */
function startLoading(form) {
  const spinner = document.createElement('span')
  const spinnerText = document.createElement('span')

  spinner.className = 'spinner-border float-right'
  spinner.setAttribute('role', 'status')

  spinnerText.className = 'sr-only'
  spinnerText.innerText = 'Enviando...'

  spinner.appendChild(spinnerText)

  disableFields(form)
  form.querySelector('[type=submit]').appendChild(spinner)
}

/**
 * Reativa todos os campos do formulário e retira spinner do botão de submit.
 *
 * @param {HTMLFormElement} form
 */
function finishLoading(form) {
  const spinner = form.getElementsByClassName('spinner-border')[0]

  enableFields(form)

  if (spinner) {
    spinner.remove()
  }
}

/**
 * This callback type is called `requestSuccessCallback` and is displayed as a
 * global symbol.
 *
 * @callback requestSuccessCallback
 * @param {Object} response
 * @param {HTMLFormElement} form
 * @param {Object} data
 */

/**
 * This callback type is called `requestErrorCallback` and is displayed as a
 * global symbol.
 *
 * @callback requestErrorCallback
 * @param {Object} response
 * @param {HTMLFormElement} form
 */

/**
 * This callback type is called `requestAlwaysCallback` and is displayed as a
 * global symbol.
 *
 * @callback requestAlwaysCallback
 * @param {HTMLFormElement} form
 * @param {Object} data
 */

/**
 *
 * @param {Object} cbHandlers Callback Handlers
 * @param {Object} cbHandlers.success The callback that handles the success response.
 * @param {Object} cbHandlers.error The callback that handles the error response.
 * @param {Object} cbHandlers.always The callback that always is called.
 */
function formHandler(cbHandlers) {
  return event => {
    const form = event.target

    event.preventDefault()
    event.stopPropagation()

    if (form.checkValidity()) {
      submit(form, cbHandlers)
    }

    form.classList.add('was-validated')
  }
}

export default formHandler
