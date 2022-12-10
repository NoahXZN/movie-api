const express = require("express");
const app = ('express');
const morgan = require("morgan");
const bodyParser = require("body-parser");
const uuid = require("uuid");
const fs = require("fs");
const path = require("path");

// ===============================================================================
// === Const
// ===============================================================================

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
    description:
      "A man who lived an extraordinary life.",
    genre: {
      name: "",
      description:
        ".",
    },
    director: {
      name: "",
      bio: "",
      birth: "",
    },
  },
];

// ===============================================================================
// === App
// ===============================================================================

const app = express();

const accessLogStream = fs.createWriteStream(path.join(__dirname, "log.txt"), {
  flags: "a",
});

// ===============================================================================
// === Middlewares
// ===============================================================================

app.use(morgan("combined", { stream: accessLogStream }));

app.use(express.static("public"));

app.use(bodyParser.json());

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

// ===============================================================================
// === CREATE
// ===============================================================================

app.post("/users", (req, res) => {
  const newUser = req.body;

  if (newUser.userName) {
    newUser.id = uuid.v4();
    users.push(newUser);
    res.status(201).json(newUser);
  } else {
    res.status(400).send("Users shall have a valid username!");
  }
});

app.post("/users/:id/:movieTitle", (req, res) => {
  const { id, movieTitle } = req.params;

  let user = users.find((user) => user.id == id);

  if (user) {
    user.favoriteMovies.push(movieTitle);
    res.status(200).send(`${movieTitle} was added to the user ${id}'s array`);
  } else {
    res.status(400).send("User was not found.");
  }
});

// ===============================================================================
// === READ
// ===============================================================================

app.get("/movies", (req, res) => {
  res.status(200).json(movies);
});

app.get("/movies/:title", (req, res) => {
  const { title } = req.params;
  let movie = movies.find((movie) => movie.title === title);
  if (movie) {
    return res.status(200).json(movie);
  } else {
    return res.status(400).send("Movie not found");
  }
});

app.get("/movies/genres/:genreName", (req, res) => {
  const { genreName } = req.params;
  let genre = movies.find((movie) => movie.genre.name === genreName).genre;
  if (genre) {
    return res.status(200).json(genre);
  } else {
    return res.status(400).send("Genre not found");
  }
});

app.get("/movies/directors/:directorName", (req, res) => {
  const { directorName } = req.params;
  let director = movies.find(
    (movie) => movie.director.name === directorName
  ).director;
  if (director) {
    return res.status(200).json(director);
  } else {
    return res.status(400).send("Director not found");
  }
});

// ===============================================================================
// === UPDATE
// ===============================================================================

app.put("/users/:id/:userName", (req, res) => {
  const { id, userName } = req.params;

  let user = users.find((user) => user.id == id);

  if (user) {
    user.userName = userName;
    res.status(200).json(user);
  } else {
    res.status(400).send("User was not found.");
  }
});

// ===============================================================================
// === DELETE
// ===============================================================================

app.delete("/users/:id/:movieTitle", (req, res) => {
  const { id, movieTitle } = req.params;

  let user = users.find((user) => user.id == id);

  if (user) {
    user.favoriteMovies = user.favoriteMovies.filter(
      (title) => title != movieTitle
    );
    res
      .status(200)
      .send(`${movieTitle} was deleted from the user ${id}'s array`);
  } else {
    res.status(400).send("User was not found.");
  }
});

app.delete("/users/:id", (req, res) => {
  const { id } = req.params;

  let user = users.find((user) => user.id == id);

  if (user) {
    users = users.filter((user) => user.id != id);
    res
      .status(200)
      .send(
        `Username: ${user.userName} with ID: ${id} was deleted from the users array`
      );
  } else {
    res.status(400).send("User was not found.");
  }
});

// ===============================================================================
// === Static
// ===============================================================================

app.get("/documentation", (req, res) => {
  res.status(200).sendFile("public/index.html", { root: __dirname });
});

// ===============================================================================
// === Server
// ===============================================================================

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
