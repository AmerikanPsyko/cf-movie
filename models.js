
let Movie = mongoose.model('movie', movieSchema);
let User = mongoose.model('user', userSchema);


let movieSchema = mongoose.Schema({
  Title: { type: String, required: true },
  Description: { type: String, required: true },
  Genre: {
      Name: String, 
      Description: String
  },
  Director: {
      Name: String,
      Bio: String,
      Birth: Date,
      ImageURL: String, 
      Featured: Boolean,
  },
});

let userSchema = mongoose.Schema({
  Username: { type: String, required: true },
  Password: { type: String, required: true },
  Email: { type: String, required: true },
  Birthday: { type: Date},
  Favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: "Movie" }],
});



module.exports.Movie = Movie;
module.exports.User = User;
