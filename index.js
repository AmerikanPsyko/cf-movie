const express = require('express'),
morgan = require('morgan'),
fs = require('fs'),
path = require('path')
const app = express();

const bodyParser = require('body-parser'),
    methodOverride = require('method-override');

let myMovies = [
    {
        title: 'Paranormal Activity',
        producer: 'Oren Peli',
        production: 'Blumhouse',
        release: 'October 14, 2007'
    },

    {
        title: 'Grave Encounters',
        producer: 'Shawn Angelski, Michael Karlin',
        production: 'Darclight, Twin Engine Films, Digital Interference Productions',
        release: 'April 22, 2011'
    },
    
    {
       title: 'Possession of Michael King', 
       producer: 'Paul Brooks, Jaime Burke, Guy Danella, Jef Levine, Scott Niemeyer, Tedi Sarafian',
       production: 'Gold Circle Films, Quickfire Films',
       release: 'August 14, 2014'
    },

    {
        title: 'The Conjuring',
        producer: 'Tony DeRosa-Grund, Peter Safran, Rob Cowan',
        production: 'New Line Cinema, The Safran Company, Evergreen Media Group',
        release: 'July 15, 2013'
    },

    {
        title: 'The Conjuring 2',
        producer: 'Peter Safran, Rob Cowan, James Wan',
        production: 'New Line Cinema, RatPac-Dune Entertainment, The Safran Group, Atomic Monster Productions',
        release: 'June 7, 2016'
    },

    {
        title: 'Insidious',
        producer: 'Jason Blum, Steven Schneider, Oren Peli',
        production: 'Haunted Movies, Stage 6 Films, Alliance Films, IM Global',
        release: 'September 14, 2010'
    },

    {
        title: 'Insidious Chapter: 2',
        producer: 'Jason Blum, Oren Peli',
        production: 'Blumhouse Productions, Entertainment One, FilmDistrict, Stage 6 Films, Entertainment One',
        relase: 'September 13, 2013'
    },

    {
        title: 'Quarantine',
        producer: 'Sergio Aguero, Doug Davison, Roy Lee',
        production: 'Sony Pictures Releasing',
        release: 'October 10, 2008'
    },

    {
        title: 'Aterrados (Terrified)',
        producer: 'Fernando Diaz',
        production: 'Aura Films',
        release: 'May 3, 2018'
    },

    {
        title: 'Hereditary',
        producer: 'Kevin Frakes, Lars Knudsen, Buddy Patrick',
        production: 'A24, PalmStar Media, Finch Entertainment, Windy Hill Pictures',
        release: 'January 18, 2018'
    },
];

// Get requests

app.get('/', (req, res) => {
    res.send('Welcome to my top Horror Movie List');
});


app.get('/movies', (req, res) => {
    res.json(myMovies);
});


app.use(express.static('public'));


//Error handling

app.use(bodyParser.urlencoded( {
    extend: true
}));

app.use(bodyParser.json());
app.use(methodOverride());

app.use((err, req, res, next) => {
    console.log(err.stack);
})





//morgan logging
app.use(morgan('common'));


//listen for requests
app.listen(8080, () => {
    console.log('Your app is listening on port 8080.');
});

