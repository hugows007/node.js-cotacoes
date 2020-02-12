const cotacoes = require('./util/cotacao')
const path = require('path')
const express = require('express')
const hbs = require('hbs')

const app = express()
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)


app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Bem vindo ao sistema de cotações',
        author: 'Hugo'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'Sobre',
        author: 'Hugo'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Ajuda',
        author: 'Hugo'
    })
})

app.get('/cotacoes', (req, res) => {
    if (!req.query.ativo) {
        return res.status(400).json({
            error: {
                mensage: 'O ativo deve ser informado',
                code: 400
            }
        })
    }

    const symbol = req.query.ativo.toUpperCase()

    cotacoes(symbol, (err, data) => {
        if (err) {
            return res.status(err.code).json({
                error: {
                    mensage: err.mensage,
                    code: err.code
                }
            })
        }

        console.log(data)
        res.status(200).json(data)
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        author: 'Hugo',
        errorMessage: 'Não existe página depois de /help'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        author: 'Hugo',
        errorMessage: 'Página não encontrada'
    })
})

app.listen(3000, () => {
    console.group('Server is up in port 3000')
})