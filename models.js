const mongoose = require('mongoose');

let movieSchema = mongoose.Schema({
    MovieID: {type: Number, required: true},
    Title: {type: String, required: true },
    Description: {type: String, required: true},
    GenreID: {type: Number, required: true},
    DirectorID: {type: Number, required: true},
    ImageURL: {type: String, required: true},
    Featured: {type: Boolean, required: true}

});

let userSchema = mongoose.Schema({
    UserID: {type: Number, required: true},
    Username: {type: String, required: true},
    Password: {type: String, required: true},
    Email: {type: String, required: true}, 
    Birthday: {type: Date, required: true},
    Favorites: [{type:mongoose.Schema.Types.ObjectId, ref: 'Movie'}]
});

let directorSchema = mongoose.Schema({
    DirectorID: {type: Number, required: true},
    Name: {type: String, required: true},
    Description: {type: String, required: true},
    Birth: {type: Date, required: true},
    ImageURL: {type: String, required: true},
    Featured: {type: Boolean, required: true}
});

let genreSchema = mongoose.Schema({
    GenreID: {type: Number, required: true},
    Name: {type: String, required: true},
    Description: {type: String, required: true}
})

let Movie = mongoose.model('movie', movieSchema);
let User = mongoose.model('user', userSchema);
let Director = mongoose.model('director', directorSchema);
let Genre = mongoose.model('genre', genreSchema);


module.exports.Movie = Movie;
module.exports.User = User;
module.exports.Director = Director;
module.exports.Genre = Genre;
