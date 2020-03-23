0
const req = require('postman-request');

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1Ijoic2lkZGhhbnQwOTEyIiwiYSI6ImNrNjMza2ZlczBqN3gza21tZ3Y5bTI3YjAifQ.wAtJ3UyOduWoJmDEPPFSNQ`
    req({ url, json: true }, (error, { body } = {}) => {
        if (error) {
            callback('Unable to connect to location services', undefined);
        } else if (body.features.length === 0) {
            callback('Place Not Found', undefined)
        } else {
            callback(undefined, {
                long: body.features[0].geometry.coordinates[0],
                lat: body.features[0].geometry.coordinates[1],
                location: body.features[0].place_name
            })
        }
    })

}
module.exports = geocode