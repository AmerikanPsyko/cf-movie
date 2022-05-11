// Variables and imports
//----------------------
const res = require("express/lib/response");

const express = require("express"),
  morgan = require("morgan"),
  fs = require("fs"),
  path = require("path"),
  uuid = require("uuid"),
  bodyParser = require("body-parser");


const app = express();
app.use(bodyParser.json());

const mongoose = require('mongoose');
const Models = require('./models.js');
const { generateKey } = require("crypto");

const Movies = Models.Movie;
const Users = Models.User;

//Connect mongoDB
mongoose.connect('mongodb://localhost:27017/cfMovies', {useNewUrlParser: true, useUnifiedTopology: true});

//API Routes -----------
//----------------------

//Default response

app.get('/', (req,res) => {
  res.send("Welcome to CFMovies!");
});

// Return list of all Movies

app.get('/movies', (req,res) => {
  Movies.find()
  .then((movies) => {
    res.status(201).json(movies);
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send('Error: ' + err);
  });
});

// Return data on single movie

app.get('/movies/:Title', (req,res) => {
  Movies.findOne( {Title: req.params.Title} )
  .then((movie) => {
    res.json(movie);
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send("Error: " + err);
  });
});


// Return data on genre

app.get('/genre/:Name', (req, res) => {
    Movies.findOne({ 'Genre.Name': req.params.Name })
    .then((movie) => {
      if(movie){ 
         res.status(200).json(movie.Genre.Description);
    }else{
      res.status(400).send('Genre not found.');
    };
    })  
    .catch((err) => {
        console.error(err);
        res.status(500).send('Error: ' + error);
    });
});

// Return data on director

app.get('/director/:Name', (req, res) => {
  Movies.findOne({ 'Director.Name': req.params.Name })
  .then((movie) => {
    if(movie){ 
       res.status(200).json(movie.Director);
  }else{
    res.status(400).send('Genre not found.');
  };
  })  
  .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + error);
  });
});

// Allow new users to register

app.post('/users', (req, res) => {
  Users.findOne({ Username: req.body.Username })
    .then((user) => {
      if (user) {
        return res.status(400).send(req.body.Username + 'already exists');
      } else {
        Users
          .create({
            Username: req.body.Username,
            Password: req.body.Password,
            Email: req.body.Email,
            Birthday: req.body.Birthday
          })
          .then((user) =>{res.status(201).json(user) })
        .catch((error) => {
          console.error(error);
          res.status(500).send('Error: ' + error);
        })
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send('Error: ' + error);
    });
});

// Update User info

app.put('/users/:Username', (req, res) => {
  Users.findOneAndUpdate({ Username: req.params.Username }, { $set:
    {
      Username: req.body.Username,
      Password: req.body.Password,
      Email: req.body.Email,
      Birthday: req.body.Birthday
    }
  },
  { new: true }, 
  (err, updatedUser) => {
    if(err) {
      console.error(err);
      res.status(500).send('Error: ' + err);
    } else {
      res.json(updatedUser);
    }
  });
});

// Allow user to update favorite movies 

app.post('/users/:Username/movies/:MovieID', (req, res) => {
  Users.findOneAndUpdate({ Username: req.params.Username }, {
     $push: { Favorites: req.params.MovieID }
   },
   { new: true }, 
  (err, updatedUser) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error: ' + err);
    } else {
      res.json(updatedUser);
    }
  });
});

// Delete movie from favorites

app.delete('/users/:Username/movies/:MovieID', (req, res) => {
  Users.findOneAndUpdate({ Username: req.params.Username }, {
     $pull: { Favorites: req.params.MovieID }
   },
    
  (err, updatedUser) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error: ' + err);
    } else {
      res.json(updatedUser);
    }
  });
});

// Allow user to delete from DB

app.delete('/users/:Username', (req,res) => {
  Users.findOneAndRemove({ Username: req.params.Username})
  .then((user) => {
    if (!user) {
      res.status(400).send(req.params.Username + ' was not found'); 
    } else {
      res.status(200).send(req.params.Username + ' was deleted.');
    }
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send('Error: ' + err);
  });
});



// Misc ----------------
//----------------------



//Documentation --------
//----------------------
app.use(express.static("public"));


//Morgan logging -------
//----------------------
app.use(morgan("common"));


//Listen for requests ---
//-----------------------
app.listen(8080, () => {
  console.log("Your app is listening on port 8080.");
});


// Start Dev: npm run dev
//-----------------------