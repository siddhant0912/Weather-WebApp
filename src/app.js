const path = require('path');
const express = require('express');
const forecast = require('./utils/forecast');
const geocode = require('./utils/geocode');
const hbs = require('hbs');

const app = express();
const port = process.env.PORT || 3000

const pdir = path.join(__dirname, '../public');
const viewPath = path.join(__dirname, '../templates/views');
const partialPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialPath);


app.use(express.static(pdir))


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Siddhant Arekar'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Siddhant Arekar'
    })
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'siddhant arekar'
    })
})


app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send('<p>Enter Addreess to be searched</p>')
    }
    geocode(req.query.address, (error, { lat, long, location } = {}) => {
        if (error) {
            return res.send({ error })
        }
        forecast(lat, long, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        });
    });
    /*
    res.send({
        Location: 'mumbai',
        Temprature: 38,
        Prediction: 'Clear day Today',
        address: req.query.address
    });
    */
});


app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide search'
        })
    }
    console.log(req.query.search);
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 404,
        name: 'Siddhant Arekar',
        errMessage: 'Help page not found'
    })

})

app.get('*', (req, res) => {

    res.render('404', {
        title: 'Weather App',
        name: 'Siddhant Arekar',
        errMessage: 'Error 404: Page Not Found'
    })

});


app.listen(port, () => {
    console.log(`Server is up on Port ${port}`);
})