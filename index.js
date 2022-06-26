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
app.use(bodyParser.urlencoded({ extended: true }));

// CORS ---------------------
//---------------------------

const cors = require('cors');
app.use(cors());

// let allowedOrigins = 'localhost:8080, localhost:1234, https://cfmyflix.herokuapp.com/, http://localhost:1234';

// app.use(cors({
//   origin: (origin, callback) => {
//     if(!origin) return callback(null, true);
//     if(allowedOrigins.indexOf(origin) === -1){ // If a specific origin isn’t found on the list of allowed origins
//       let message = 'The CORS policy for this application doesnt allow access from origin ' + origin;
//       return callback(new Error(message ), false);
//     }
//     return callback(null, true);
//   }
// }));

// Express validator ---------
//----------------------------

const { check, validationResult} = require('express-validator');

// Authenticate and Authorize
//---------------------------

let auth = require('./auth')(app);
const passport = require('passport');
require('./passport');

//----------------------------
//----------------------------

//Mongoose connector to connect to MongoDB
//----------------------------------------
const mongoose = require('mongoose');
const Models = require('./models.js');
require('dotenv').config();



const Movies = Models.Movie;
const Users = Models.User;

//Connect mongoDB
// mongoose.connect('mongodb://localhost:27017/cfMovies', {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.connect( process.env.CONNECTION_URI, {useNewUrlParser: true, useUnifiedTopology: true});



//-----------------------------------------
//-----------------------------------------


//API Routes -----------
//----------------------

//Default response

app.get('/', (req,res) => {
  res.send("Welcome to CFMovies!");
});

// Return list of all Movies

app.get('/movies', passport.authenticate('jwt', {session: false}), (req,res) => {
  // app.get('/movies', (req,res) => {
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
// app.get('/movies/:Title', (req,res) => {
app.get('/movies/:Title', passport.authenticate('jwt', {session: false}), (req,res) => {
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
// app.get('/genre/:Name', (req, res) => {
app.get('/genre/:Name', passport.authenticate('jwt', {session: false}), (req, res) => {
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
// app.get('/director/:Name', (req, res) => {
app.get('/director/:Name', passport.authenticate('jwt', {session: false}), (req, res) => {
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

app.post('/users',
[
check('Username', 'Username is required').isLength({min: 5}),
check('Username', 'Username contains non alphanumeric characters - not allowed.').isAlphanumeric(),
check('Password', 'Password is required').not().isEmpty(),
check('Email', 'Email does not appear to be valid').isEmail()
],
(req, res) => {
  let errors = validationResult(req);
    if(!errors.isEmpty()) {
      return res.status(422).json({errors: errors.array() });
    }
  let hashedPassword = Users.hashPassword(req.body.Password);
  Users.findOne({ Username: req.body.Username })
    .then((user) => {
      if (user) {
        return res.status(400).send(req.body.Username + 'already exists');
      } else {
        Users
          .create({
            Username: req.body.Username,
            Password: hashedPassword,
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

app.get(
	'/users/:Username',
	passport.authenticate('jwt', { session: false }),
	(req, res) => {
		Users.findOne({ Username: req.params.Username })
			.then((user) => {
				if (user) {
					respData = {
						Username: user.Username,
						Email: user.Email,
						Birthday: user.Birthday,
						FavouriteMovies: user.FavouriteMovies,
					};
					res.status(201).json(respData);
				} else {
					res.status(404).send('User Not Found');
				}
			})
			.catch((err) => {
				console.error(err);
				res.status(500).send('Error: ' + err);
			});
	}
);

// Get all users
// app.get(
// 	'/users',
// 	passport.authenticate('jwt', { session: false }),
// 	(req, res) => {
// 		Users.find()
// 			.then((users) => {
// 				res.status(201).json(users);
// 			})
// 			.catch((err) => {
// 				console.error(err);
// 				res.status(500).send('Error: ' + err);
// 			});
// 	}
// );

// Get all user by username
// Broken?
app.get(
	'/users/:Username',
	passport.authenticate('jwt', { session: false }),
	(req, res) => {
		Users.findOne({ Username: req.params.Username })
			.then((user) => {
				if (user) {
					respData = {
						Username: user.Username,
						Email: user.Email,
						Birthday: user.Birthday,
						FavouriteMovies: user.FavouriteMovies,
					};
					res.status(201).json(respData);
				} else {
					res.status(404).send('User Not Found');
				}
			})
			.catch((err) => {
				console.error(err);
				res.status(500).send('Error: ' + err);
			});
	}
);

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
const port = process.env.PORT || 8080;
app.listen(port, '0.0.0.0', () => {
  console.log("Listening on Port " + port);
});


// Start Dev: npm run dev
//-----------------------