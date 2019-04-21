const request = require('request')
const instantgrid = (lat, lng, callback) => {

    const url = 'https://api.instantgrid.ca/rpc/radius100msummary'

    const formData = {
        "lat": lat,
        "lng": lng
    }

    request.post({ url, json: true, body: formData }, (error, { body }) => {
        if (error) {
            callback(error, undefined)
        } else {
            callback(undefined, body)
        }
    })


}

module.exports = instantgrid
