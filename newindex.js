// Variables and imports
const res = require("express/lib/response");
const { title } = require("process");
const mongoose = require('mongoose');
const Models = require('./models.js');

const Movies = Models.Movie;
const Users = Models.User;

const express = require("express"),
  morgan = require("morgan"),
  fs = require("fs"),
  path = require("path"),
  uuid = require("uuid"),
  bodyParser = require("body-parser");
const { handle } = require("express/lib/application");

const app = express();
app.use(bodyParser.json());

// Connect to mongodb database "myFlix"
mongoose.connect('mongodb://localhost:27017/cfMovies', {userNewURLParser: true, useUnifiedTopology: true});




let movies = [
  {
    title: "Paranormal Activity",
    description:
      "A young couple who are haunted by a supernatural presence in their home. They then set up a camera to document what is haunting them.",
    genre: {
      name: "horror",
      description:
        "Unsettling films designed to frighten and panic, cause dread and alarm, and to invoke our hidden worst fears, often in a terrifying, shocking finale, while captivating and entertaining us at the same time in a cathartic experience.",
    },
    director: {
      name: "Oren Peli",
      birth: "January 21, 1970",
      image:
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fmubi.com%2Fcast%2Foren-peli&psig=AOvVaw3OQdh4EVmziRC9Ng6v8DyX&ust=1651610864426000&source=images&cd=vfe&ved=0CAwQjRxqFwoTCNDWxYnYwfcCFQAAAAAdAAAAABAD",
      featured: true,
    },
  },

  {
    title: "Grave Encounters",
    description:
      " The footage follows the crew of a paranormal reality television program who lock themselves in a haunted psychiatric hospital in search of evidence of paranormal activity as they shoot what ends up becoming their final episode.",
    genre: {
      name: "horror",
      description:
        "Unsettling films designed to frighten and panic, cause dread and alarm, and to invoke our hidden worst fears, often in a terrifying, shocking finale, while captivating and entertaining us at the same time in a cathartic experience.",
    },
    director: {
      name: "The Vicious Brothers (Colin Minihan, Stuart Ortiz)",
      birth: "Colin Minihan (1986), Stuart Ortiz (March 20, 1984)",
      image:
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fmubi.com%2Fcast%2Fthe-vicious-brothers&psig=AOvVaw3tY4Yt32-0f4J-KzYdvlUU&ust=1651611250372000&source=images&cd=vfe&ved=0CAwQjRxqFwoTCKDHxcHZwfcCFQAAAAAdAAAAABAD",
      featured: true,
    },
  },

  {
    title: "Possession of Michael King",
    description:
      "After poor advice from a psychic leads to the death of his wife, a man vows to disprove the existence of the paranormal by allowing himself to be possessed by demons.",
    genre: {
      name: "horror",
      description:
        "Unsettling films designed to frighten and panic, cause dread and alarm, and to invoke our hidden worst fears, often in a terrifying, shocking finale, while captivating and entertaining us at the same time in a cathartic experience.",
    },
    director: {
      name: "David Jung",
      birth: "December 23, 1971",
      image:
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fmubi.com%2Fcast%2Fdavid-jung&psig=AOvVaw0qdaI525dDe8Fxe3sGWFbT&ust=1651611762116000&source=images&cd=vfe&ved=0CAwQjRxqFwoTCNiE9bXbwfcCFQAAAAAdAAAAABAJ",
      featured: true,
    },
  },

  {
    title: "Aterrados",
    description:
      "Terrified introduces us to a neighborhood that is plagued by an infection of sorts. The symptoms of this infection include the dead brought to life, strange creatures that resemble corpses, and invisible/visible spooks that seem to live in the dark corners of houses and apartments.",
    genre: {
      name: "horror",
      description:
        "Unsettling films designed to frighten and panic, cause dread and alarm, and to invoke our hidden worst fears, often in a terrifying, shocking finale, while captivating and entertaining us at the same time in a cathartic experience.",
    },
    director: {
      name: "Demián Rugna",
      birth: "September 13, 1979",
      image:
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fhorror.fandom.com%2Fwiki%2FDemi%25C3%25A1n_Rugna&psig=AOvVaw3u4arKd4YQmpKfLg1uq9Wh&ust=1651611996742000&source=images&cd=vfe&ved=0CAwQjRxqFwoTCKCvhqbcwfcCFQAAAAAdAAAAABAD",
      featured: true,
    },
  },

  {
    title: "The Conjuring",
    description:
      "Paranormal investigators Ed and Lorraine Warren work to help a family terrorized by a dark presence in their farmhouse",
    genre: {
      name: "horror",
      description:
        "Unsettling films designed to frighten and panic, cause dread and alarm, and to invoke our hidden worst fears, often in a terrifying, shocking finale, while captivating and entertaining us at the same time in a cathartic experience.",
    },
    director: {
      name: "James Wan",
      birth: "February 26, 1977",
      image:
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fdcextendeduniverse.fandom.com%2Fwiki%2FJames_Wan&psig=AOvVaw1aIcCLIdzFBf813Jv5vlzV&ust=1651612157193000&source=images&cd=vfe&ved=0CAwQjRxqFwoTCIDf2PHcwfcCFQAAAAAdAAAAABAP",
      featured: true,
    },
  },
];

let users = [
  {
    id: 1,
    name: "Cami",
    favoriteMovies: [],
  },

  {
    id: 2,
    name: "Mario",
    favoriteMovies: ["Grave Encounters"],
  },

  {
    id: 3,
    name: "Maverick",
    favoriteMovies: [],
  },
];

// Misc

//Documentation
app.use(express.static("public"));

//Morgan logging
app.use(morgan("common"));

//Listen for requests
app.listen(27017, () => {
  console.log("Your app is listening on port 27017.");
});


// Start Dev: npm run dev