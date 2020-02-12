const request = require('request')

const cotacao = (symbol, callback) => {
    const api_token = '1UqTIA4IoMHlhy56VGcflJWPnUZH8daniyesVIPDqeRyu1dszGNXsXMw8T2m'
    const url = `https://api.worldtradingdata.com/api/v1/stock?symbol=${symbol}&api_token=${api_token}`


    request({ url: url, json: true }, (err, response) => {
        if (err) {
            return callback({
                mensage: `Algo deu errado: ${err}`,
                code: 500
            }, undefined)
        }

        if (response.body === undefined || response.body.data === undefined) {
            return callback({
                mensage: `No data found`,
                code: 404
            }, undefined)
        }

        const parsedJSON = response.body.data[0]


        const {
            symbol,
            price_open,
            price,
            day_high,
            day_low
        } = parsedJSON

        callback(undefined, {
            symbol,
            price_open,
            price,
            day_high,
            day_low
        })
    })

}

module.exports = cotacao