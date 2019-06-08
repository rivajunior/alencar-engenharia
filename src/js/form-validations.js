import isEmail from 'isemail'

function watchValidations(form) {
  watchEmail(form)
  watchPhone(form)
}

function watchValidationStyles(element) {
  const activeValitationStyles = event => {
    event.target.parentElement.classList.add('was-validated')
  }
  const removeValidationsStyles = event => {
    event.target.parentElement.classList.remove('was-validated')
  }

  element.addEventListener('input', activeValitationStyles, {
    once: true
  })
  element.addEventListener('change', event => {
    if (!event.target.value.trim()) {
      removeValidationsStyles(event)
      element.addEventListener('input', activeValitationStyles, {
        once: true
      })
    }
  })
}

function watchPhone(form) {
  const phoneElement = form.querySelector('[type="tel"]')

  if (phoneElement) {
    watchValidationStyles(phoneElement)
    phoneElement.addEventListener('input', () => {
      const phoneRegex = /(\([0-9]{2}\) (([0|7|8|9])|([2|3|4|5][0-9])|([7|8|9][0-9]{2}))[0-9]{2}-[0-9]{4})/

      if (phoneRegex.test(phoneElement.value)) {
        // The CPF is valid, we use the ConstraintAPI to tell it
        phoneElement.setCustomValidity('')
      } else {
        // The CPF is not valid, we use the ConstraintAPI to
        // give a message about the format required for this country
        phoneElement.setCustomValidity('Telefone inválido')
      }
    })
  }
}

function watchEmail(form) {
  const emailElement = form.querySelector('[type="email"]')

  if (emailElement) {
    watchValidationStyles(emailElement)

    emailElement.addEventListener('input', () => {
      if (isEmail.validate(emailElement.value)) {
        // The CPF is valid, we use the ConstraintAPI to tell it
        emailElement.setCustomValidity('')
      } else {
        // The CPF is not valid, we use the ConstraintAPI to
        // give a message about the format required for this country
        emailElement.setCustomValidity('E-mail inválido')
      }
    })
  }
}

/**
 * If element has value, the value must be an e-mail
 * @param {HTMLInputElement} element
 */
// eslint-disable-next-line no-unused-vars
function validateEmail(element) {
  if (element.hasAttribute('required')) {
    return isEmail.validate(element.value)
  }

  return element.value.trim() ? isEmail.validate(element) : true
}

export default watchValidations
