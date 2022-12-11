const express = require('express'),
    morgan = require('morgan');
const app = express();
const PORT = 3000;
const HOST = "0.0.0.0";

let users = [
  {
    id: "1",
    userName: "NoahXZN",
    name: "Noah Peeler",
    favoriteMovies: [],
  },
  {
    id: "2",
    userName: "john",
    name: "John Doe",
    favoriteMovies: [],
  },
];

let movies = [
  {
    title: "Forrest Gump",
    director: "Robert Zemeckis"
  },
  {
    title: "Welcome Home Roscoe Jenkins",
    director: "Malcolm D. Lee"
  },
  {
    title: "Major Payne",
    director: "Nick Castle"
  },
  {
    title: "Charlie Countryman",
    director: "Fredrik Bond"
  },
  {
    title: "Saving Private Ryan",
    director: "Steven Speilberg"
  },
  {
    title: "The Fast and the Furious",
    director: "Rob Cohen"
  },
  {
    title: "Borat! Cultural Learnings of America for Make Benefit Glorious Nation of Kazakhstan",
    director: "Larry Charles"
  },
  {
    title: "Step Brothers",
    director: "Adam McKay"
  },
  {
    title: "War of the Worlds",
    director: "Steven Speilberg"
  },
  {
    title: "Inglourious Basterds",
    director: "Quentin Tarantino"
  }
];
  

app.use(express.static('public'));
app.use(morgan('common'));

app.get('/', (req, res) => {
    res.send('Welcome to my Moviedatabase MaFlix');
});

app.get('/movies', (req, res) => {
    res.json(topMovies);
});

app.get("/documentation", (req, res) => {
    res.sendFile("public/documentation.html", { root: __dirname });
  });

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("Uh Oh, something isn't where it is supposed to be, i'll go looking, please try later");
});

app.listen(8080, () => {
    console.log('Your app is listening on Port 8080.');
});
