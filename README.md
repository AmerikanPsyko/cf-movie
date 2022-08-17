# CF MyFlix API

# Description

This movie API serves as a movie API to host movies for 2 projects in the Career Foundry program. Both Movie apps utilize the API but are written in React, and Angular

# Technologies used

This API was created using the MERN Stack
- Mongo DB
- Express
- React
- Node JS
- Mongoose (Mongo DB connector)
- JWT (Auth)
- CORS (Auth)
- Passport (Auth)
- Morgan (Middleware)

# What the API does

This API, as mentioned above, serves to host a list of Movies, Synopsis, Genre, and Director information about a list of movies I have chosen for people to view. The API allows for the CF MyFlix apps to be able to allow a user to register, login, view the movies, synopsis, genre, and director information, as well as favorite, and unfavorite movies. Users can also change their user information such as username, password, email, and birthday

# Routes used 

- app.get('/') Returns a list of all movies
- app.get('/movies/:Title') Returns data on a single movie
- app.get('/genre/:Name') Returns data on Genre
- app.get('/director/:Name') Returns data about a director
- app.post('/users') Allows a user to register
- app.put('/users/:Username') Updates user information (username, email, password, birthday)
- app.get('/users/:Username/movies') Gets list of users favorited movies
- app.post('/users/:Username/movies/:MovieID') Allows users to add a favorite movie
- app.delete('/users/:Username/movies/:MovieID') Allows users to delete a favorite movie
- app.delete('/users/:Username') Allows a user to delete their profile (username, email, password, birthday, favorites)

# Mongo DB

- Collections are broken into 2 collections: Movies, Users
- Mongo DB is connected using Mongoose
- Mongoose connect by use of `process.env.CONNECTION_URI, {useNewParser: true, useUnifiedTopology: true}` 

# Technical Requirements

- API must be a Node.js/Express application
- API uses REST 
- API uses Middleware such as Morgan to log, and body-parser for reading data requests
- Database built with MondoDB
- API routes should be tested using route testing software such as [Postman](https://www.postman.com/)
- API must use authentication (jwt, passport, CORS)
- API to be deployed by use of Heroku

# Running the API for testing

- To run the API: `npm start`
- Open Postman, and test your routes listed above
- Navigate to Mongo DB to verify if information is being passed to the DB
