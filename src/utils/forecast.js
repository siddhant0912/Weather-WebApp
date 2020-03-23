const req = require('postman-request');
const chk = require('chalk')

const forecast = (lat, long, callback) => {
    const url = `https://api.darksky.net/forecast/37a23866e6e3a8f41f098eca0b8d4a4a/${lat},${long}?unit=si`
    req({ url, json: true }, (error, { body } = {}) => {
        if (error) {
            callback('Please Check Your Internet Connection...', undefined);
        } else if (body.error) {
            callback('Weather NOT FOUND', undefined)
        } else {
            callback(undefined, `It's Currently ${body.currently.temperature} out there, ${body.daily.data[0].summary}, there is a ${body.currently.precipProbability } % of rain.`)
        }
    })
}

module.exports = forecast