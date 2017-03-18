const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3004;
var app = express();

app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));
app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;

    console.log(log);
    fs.appendFile('server.log', log + '\n');
    next();
});

app.get('/', (req, res) => {
    /*res.send({
        name: 'Roman',
        likes: [
            'Travel',
            'Football'
        ]
    });*/
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeMessage: 'Welcome to my site',
        currentYear: new Date().getFullYear()
    });
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page',
        currentYear: new Date().getFullYear()
    });
});

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Unable to access'
    });
});

app.listen(port, () => {
    console.log('Server up on ' + port);
});