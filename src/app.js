// Express lib exposes a single function opposed to an object like in the case of Request.
// so express is a function rather than an object and we call express to createANewApplication()
const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const instantgrid = require('./utils/instantgrid')


const app = express()
const port = process.env.PORT || 3000

//console.log(__dirname)
//console.log(path.join(__dirname, '../public'))

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlerbars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

// Since express find a match based on the name for the route it never runs the below route
// app.get('', (req, res) => {
//     res.send('<h1>Hello express!</h1>')
// })
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Adithya'
    })
})
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        msg: 'This is the help message that is a dynamic message',
        name: 'Adithya'
    })
})
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        img: '/img/robot.png',
        name: 'Adithya'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Address must be provided'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }
        forecast(latitude, longitude, (error, forecast) => {
            if (error) {
                return res.send({ error })
            }
            instantgrid(latitude, longitude, (error, instaGridData) => {
                if (error) {
                    return res.send({ error })
                }

                res.send({
                    forecast,
                    location,
                    address: req.query.address,
                    instaGridData
                })
            })
        })
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMsg: 'Help article is not found',
        name: 'Adithya'
    })
})

// Wildcard enter should be the last thing before the listener
app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMsg: 'Page not found',
        name: 'Adithya'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})