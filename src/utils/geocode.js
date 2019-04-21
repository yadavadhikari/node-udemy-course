const request = require('request')

const geocode = (address, callback) => {

    const token = 'pk.eyJ1IjoieWFkaGlrYXJpIiwiYSI6ImNqb2dpN3phcTBmZ3QzcXBuMzQwdDF3MmkifQ.teiJE-Ndy7G6z18stEV-MA'
    const mapboxGeoCodingURL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=' + token + '&limit=1'

    request(mapboxGeoCodingURL, { json: true }, (error, { body }) => {
        if (error) {
            callback("Unable to connect to location service!", undefined)
        } else if (body.message) {
            callback(body.message, undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find location :' + address + 'Try another search', undefined)
        } else {
            let longitude = body.features[0].center[0]
            let latitude = body.features[0].center[1]
            let location = body.features[0].place_name
            const data = {
                longitude,
                latitude,
                location
            }
            callback(undefined, data)
        }
    })
}

module.exports = geocode
