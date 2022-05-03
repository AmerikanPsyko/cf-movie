const res = require("express/lib/response");
const { title } = require("process");

const express = require("express"),
  morgan = require("morgan"),
  fs = require("fs"),
  path = require("path"),
  uuid = require("uuid"),
  bodyParser = "body-parser";
const app = express();

let movies = [
  {
    title: "Paranormal Activity",
    description:
      "A young couple who are haunted by a supernatural presence in their home. They then set up a camera to document what is haunting them.",
    genre: "horror",
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
    genre: "horror",
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
    genre: "horror",
    director: {
      name: "David Jung",
      birth: "December 23, 1971",
      image:
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fmubi.com%2Fcast%2Fdavid-jung&psig=AOvVaw0qdaI525dDe8Fxe3sGWFbT&ust=1651611762116000&source=images&cd=vfe&ved=0CAwQjRxqFwoTCNiE9bXbwfcCFQAAAAAdAAAAABAJ",
      featured: true,
    },
  },

  {
    title: "Aterrados (Terrified)",
    description:
      "Terrified introduces us to a neighborhood that is plagued by an infection of sorts. The symptoms of this infection include the dead brought to life, strange creatures that resemble corpses, and invisible/visible spooks that seem to live in the dark corners of houses and apartments.",
    genre: "horror",
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
        "From the Dark, mysterious, and paranormal, these horror flicks will get you scared",
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

//START NEW GET REQUESTS

// Get requests

app.get("/", (req, res) => {
  res.send("Welcome to the Horror Movie Movie Vault");
});

// Returns list of all data

app.get("/movies", (req, res) => {
  res.json(movies);
});

// Returns list of movie titles

app.get("/movies/:title", (req, res) => {
  res.json(
    movies.find((movies) => {
      return movies.title === req.params.title;
    })
  );
});

// Returns movie genre

app.get("/movies/:genre", (req, res) => {
  res.json(
    movies.find((movies) => {
      return movies.genre === req.params.genre;
    })
  );
});

// Returns movie director

app.get("/director/:name", (req,res) => {
 res.json(director.find((director) => {
   return director.name === req.params.director
 }));
});

// Documentation
app.use(express.static("public"));

//Morgan logging
app.use(morgan("common"));

//Listen for requests
app.listen(8080, () => {
  console.log("Your app is listening on port 8080.");
});
