const express = require("express"),
  morgan = require("morgan"),
  fs = require("fs"),
  path = require("path"),
  uuid = require('uuid'),
  bodyParser = ('body-parser')
  const app = express();



let myMovies = [
  {
    title: "Paranormal Activity",
    producer: "Oren Peli",
    production: "Blumhouse",
    release: "October 14, 2007",
  },

  {
    title: "Grave Encounters",
    producer: "Shawn Angelski, Michael Karlin",
    production:
      "Darclight, Twin Engine Films, Digital Interference Productions",
    release: "April 22, 2011",
  },

  {
    title: "Possession of Michael King",
    producer:
      "Paul Brooks, Jaime Burke, Guy Danella, Jef Levine, Scott Niemeyer, Tedi Sarafian",
    production: "Gold Circle Films, Quickfire Films",
    release: "August 14, 2014",
  },

  {
    title: "The Conjuring",
    producer: "Tony DeRosa-Grund, Peter Safran, Rob Cowan",
    production: "New Line Cinema, The Safran Company, Evergreen Media Group",
    release: "July 15, 2013",
  },

  {
    title: "The Conjuring 2",
    producer: "Peter Safran, Rob Cowan, James Wan",
    production:
      "New Line Cinema, RatPac-Dune Entertainment, The Safran Group, Atomic Monster Productions",
    release: "June 7, 2016",
  },

  {
    title: "Insidious",
    producer: "Jason Blum, Steven Schneider, Oren Peli",
    production: "Haunted Movies, Stage 6 Films, Alliance Films, IM Global",
    release: "September 14, 2010",
  },

  {
    title: "Insidious Chapter: 2",
    producer: "Jason Blum, Oren Peli",
    production:
      "Blumhouse Productions, Entertainment One, FilmDistrict, Stage 6 Films, Entertainment One",
    relase: "September 13, 2013",
  },

  {
    title: "Quarantine",
    producer: "Sergio Aguero, Doug Davison, Roy Lee",
    production: "Sony Pictures Releasing",
    release: "October 10, 2008",
  },

  {
    title: "Aterrados (Terrified)",
    producer: "Fernando Diaz",
    production: "Aura Films",
    release: "May 3, 2018",
  },

  {
    title: "Hereditary",
    producer: "Kevin Frakes, Lars Knudsen, Buddy Patrick",
    production: "A24, PalmStar Media, Finch Entertainment, Windy Hill Pictures",
    release: "January 18, 2018",
  },
];






//START NEW GET REQUESTS

// Gets the list of data about ALL students

app.get('/movies', (req, res) => {
  res.json(myMovies);
});
// Gets the data about movies by title
app.get('/movies/:title', (req, res) => {
  res.json(myMovies);
});


// Adds data for a new student to our list of students.
app.post('/students', (req, res) => {
  let newStudent = req.body;

  if (!newStudent.name) {
    const message = 'Missing name in request body';
    res.status(400).send(message);
  } else {
    newStudent.id = uuid.v4();
    students.push(newStudent);
    res.status(201).send(newStudent);
  }
});

// Deletes a student from our list by ID
app.delete('/students/:id', (req, res) => {
  let student = students.find((student) => { return student.id === req.params.id });

  if (student) {
    students = students.filter((obj) => { return obj.id !== req.params.id });
    res.status(201).send('Student ' + req.params.id + ' was deleted.');
  }
});

// Update the "grade" of a student by student name/class name
app.put('/students/:name/:class/:grade', (req, res) => {
  let student = students.find((student) => { return student.name === req.params.name });

  if (student) {
    student.classes[req.params.class] = parseInt(req.params.grade);
    res.status(201).send('Student ' + req.params.name + ' was assigned a grade of ' + req.params.grade + ' in ' + req.params.class);
  } else {
    res.status(404).send('Student with the name ' + req.params.name + ' was not found.');
  }
});

// Gets the GPA of a student
app.get('/students/:name/gpa', (req, res) => {
  let student = students.find((student) => { return student.name === req.params.name });

  if (student) {
    let classesGrades = Object.values(student.classes); // Object.values() filters out object's keys and keeps the values that are returned as a new array
    let sumOfGrades = 0;
    classesGrades.forEach(grade => {
      sumOfGrades = sumOfGrades + grade;
    });

    let gpa = sumOfGrades / classesGrades.length;
    console.log(sumOfGrades);
    console.log(classesGrades.length);
    console.log(gpa);
    res.status(201).send('' + gpa);
    //res.status(201).send(gpa);
  } else {
    res.status(404).send('Student with the name ' + req.params.name + ' was not found.');
  }
});

//Morgan logging
app.use(morgan("common"));

//Listen for requests
app.listen(8080, () => {
  console.log("Your app is listening on port 8080.");
});
