const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;  // Needed for Heroku

var app = express();

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs')

app.use((request, response, next) => {
    var now = new Date().toString();
    var log = `${now}: ${request.method} ${request.url}`;

    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) {
            console.log('Unable to server.log.');
        }
    });
    next();
});

// app.use((request, response, next) => {
//     response.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('capitalizeIt', (text) => {
    return text.toUpperCase();
})

app.get('/', (request, response) => {
    // response.send('<h1>test response</h1>');
    response.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeMessage: 'Welcome'
    });
});

app.get('/about', (request, response) => {
    response.render('about.hbs', {
        pageTitle: 'About Page'
    });
});

app.get('/json', (request, response) => {
    response.send({
        prop1: 'property1',
        prop2: 'property2'
    });
});

app.get('/projects', (request, response) => {
    response.render('projects.hbs', {
        pageTitle: 'Projects Page'
    });
});

app.get('/bad', (request, response) => {
    response.send({
        error: 'error handling request'
    })
});

app.listen(port, () => {
    console.log(`Server is up on port ${port}.`);
});
