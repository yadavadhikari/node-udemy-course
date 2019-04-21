const request = require('request')

const forecast = (lat, lng, callback) => {

    const url = 'https://api.darksky.net/forecast/914adc62bc1ad667f63a59c3c4a88014/' + lat + ',' + lng + '?units=si'

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Can not connect to forecast service!', undefined)
        } else if (body.error) {
            callback('Unable to find the location', undefined)
        } else {
            callback(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degrees out. There is '
                + body.currently.precipProbability + '% chance of rain.')
        }
    })

}

module.exports = forecast
