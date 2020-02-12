console.log('Javascript no frontend')

const cotacoesForm = document.querySelector('form')
const mainMensage = document.querySelector('h3')
const messageError = document.querySelector('#messageError')

const price = document.querySelector('#price')
const price_open = document.querySelector('#price_open')
const day_high = document.querySelector('#day_high')
const day_low = document.querySelector('#day_low')
const icon = document.querySelector('.icon')

function limparBusca() {
    price.innerText = ''
    price_open.innerText = ''
    day_high.innerText = ''
    day_low.innerText = ''
}

cotacoesForm.addEventListener('submit', (event) => {
    limparBusca();
    mainMensage.innerText = 'Buscando...'
    event.preventDefault()
    const ativo = document.querySelector('input').value

    if (!ativo) {
        mainMensage.innerText = 'O ativo deve ser informado'
        return;
    }

    fetch(`/cotacoes?ativo=${ativo}`).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                mainMensage.innerText = `Alguma coisa deu errado: `
                messageError.innerText = `${data.error.mensage} - código: ${data.error.code}`
            } else {
                price.innerText = data.price
                price_open.innerText = data.price_open
                day_high.innerText = data.day_high
                day_low.innerText = data.day_low
            }
        })
    })
})