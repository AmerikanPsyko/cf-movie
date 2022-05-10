// Variables and imports
const res = require("express/lib/response");
const { title } = require("process");
;
const Models = require('./models.js');

const Movies = Models.Movie;
const Users = Models.User;






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
mongoose.connect('mongodb://localhost:27017/myFlix', {userNewURLParser: true, useUnifiedTopology: true});




//START NEW GET REQUESTS

// Get requests

app.get("/", (req, res) => {
  res.send("Welcome to the Movie Vault");
});

// Returns list of all data

app.get("/movies", (req, res) => {
  res.json(movies);
});

// Returns list of movie titles

app.get("/movies/:title", (req, res) => {
  // const { title } = req.params;
  // const movie = movies.find((movie) => movie.title === title);

  // if (movie) {
  //   res.status(200).json(movie);
  // } else res.status(400).send("no such movie found");

  Movie.findOne({ Title: "Paranormal Activity"}).then((Movie) => {
    if(Movie) {
      res.status(200).json(Movie);
    } else {
      res.status(400).send('Movie not found.');
    }
  });

});

// Returns movie genre

app.get("/movies/genre/:genreName", (req, res) => {
//   const { genreName } = req.params;
//   const genre = movies.find((movie) => movie.genre.name === genreName).genre;

//   if (genre) {
//     res.status(200).json(genre);
//   } else res.status(400).send("no such genre found");



});

app.get("/movies/genre/", (req, res) => {
  // const { genreName } = req.params;
  // const genre = movies.find((movie) => movie.genre.name === genreName).genre;

  Movies.find({ 'Genre.Name': "Horror"  }).then((err, Movies) => {
    if (movie) {
      res.status(200).send(`${req.params.title} is a ${movie.Genre.Name}`);
    } else {
      res.status(400).send('Movie not found.');
    }
  });
});

// Returns movie director

app.get("/movies/director/:directorName", (req, res) => {
  const { directorName } = req.params;
  const director = movies.find(
    (movie) => movie.director.name === directorName
  ).director;

  if (director) {
    res.status(200).json(director);
  } else res.status(400).send("no such director found");
});

// ----- End Get Requests -----
//------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------

// ----- Start Users -----

// Add users

app.post("/users", (req, res) => {
  const newUser = req.body;

  if (newUser.name) {
    newUser.id = uuid.v4();
    users.push(newUser);
    res.status(201).json(newUser);
  } else {
    res.status(400).send("users need names");
  }
});

// Update users

app.put("/users/:id", (req, res) => {
  const { id } = req.params;
  const updatedUser = req.body;

  let user = users.find((user) => user.id == id);

  if (user) {
    user.name = updatedUser.name;
    res.status(200).json(user);
  } else {
    res.status(400).send("no such user found");
  }
});

// Users add movie to favorites

app.post("/users/:id/:movieTitle", (req, res) => {
  const { id, movieTitle } = req.params;

  let user = users.find((user) => user.id == id);

  if (user) {
    user.favoriteMovies.push(movieTitle);
    res
      .status(200)
      .send(`${movieTitle} has been added to the user ${id}'s array`);
  } else {
    res.status(400).send("no such user found");
  }
});

// Users delete movie from favorites

app.delete("/users/:id/:movieTitle", (req, res) => {
  const { id, movieTitle } = req.params;

  let user = users.find((user) => user.id == id);

  if (user) {
    user.favoriteMovies = user.favoriteMovies.filter(
      (title) => title !== movieTitle
    );
    res
      .status(200)
      .send(`${movieTitle} has been removed from the user ${id}'s array`);
  } else {
    res.status(400).send("no such user found");
  }
});

// Users can de-register

app.delete("/users/:id", (req, res) => {
  const { id } = req.params;

  let user = users.find((user) => user.id == id);

  if (user) {
    users = users.filter((user) => user.id != id);
    res.status(200).send(` user ${id} as been deleted`);
  } else {
    res.status(400).send("no such user");
  }
});

// ----- End Users -----
//------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------

// Misc

//Documentation
app.use(express.static("public"));

//Morgan logging
app.use(morgan("common"));

//Listen for requests
app.listen(8080, () => {
  console.log("Your app is listening on port 8080.");
});


// Start Dev: npm run dev