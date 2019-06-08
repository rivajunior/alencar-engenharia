function sendMessageToWhatsApp(message, number) {
  if (number) {
    throw new Error(
      'É preciso definir um número de telefone para que possa abrir o aplicativo Whatsapp'
    )
  }

  window.open(
    `https://api.whatsapp.com/send?phone=${number}&text=${encodeURI(message)}`
  )
}

function createModalWhatsAppCTA(message, number) {
  const content = document.getElementById('modal-success-extra-response')
  let cta = document.createElement('a')

  content.innerHTML =
    '<p class="text-center"><strong>Converse com um consultor agora mesmo</strong></p>'

  cta.href = `https://api.whatsapp.com/send?phone=${number}&text=${message}`
  cta.target = '_blank'
  cta.id = 'cta-open-whatsapp'
  cta.className = 'btn btn-lg btn-success text-uppercase shadow'
  cta.innerHTML = 'Abrir WhatsApp <i class="fab fa-whatsapp"></i>'

  content.appendChild(cta)
}

function createWhatsAppMessage(data) {
  let msg = 'Olá,\n'
  if (data.name) {
    msg += `Eu sou ${data.name}\n`
  }

  if (data.phone) {
    msg += 'Segue meu telefone: ' + data.phone
  }

  return encodeURI(msg)
}

export { createModalWhatsAppCTA, createWhatsAppMessage, sendMessageToWhatsApp }
