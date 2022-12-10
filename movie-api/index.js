const express = require("express");
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
    userName: "kal",
    name: "Karoly Lonich",
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
    title: "Black Panther: Wakanda Forever",
    description:
      "Queen Ramonda, Shuri, M’Baku, Okoye and the Dora Milaje fight to protect their nation from intervening world powers in the wake of King T’Challa’s death. As the Wakandans strive to embrace their next chapter, the heroes must band together with the help of War Dog Nakia and Everett Ross and forge a new path for the kingdom of Wakanda.",
    genre: {
      name: "Action",
      description:
        "Action film is a film genre in which the protagonist is thrust into a series of events that typically involve violence and physical feats.",
    },
    director: {
      name: "Ryan Coogler",
      bio: "Ryan Kyle Coogler is an American film director, producer and screenwriter. He is a recipient of four NAACP Image Awards, four Black Reel Awards and an Academy Award nomination for Best Picture.",
      birth: "1986",
    },
    imageURL:
      "https://artworks.thetvdb.com/banners/v4/movie/31110/backgrounds/636fafaf50adc.jpg",
  },
  {
    title: "The Menu",
    description:
      "A couple travels to a coastal island to eat at an exclusive restaurant where the chef has prepared a lavish menu, with some shocking surprises.",
    genre: {
      name: "Horror",
      description:
        "Horror is a film genre that seeks to elicit fear or disgust in its audience for entertainment purposes. Horror films often explore dark subject matter and may deal with transgressive topics or themes. Broad elements include monsters, apocalyptic events, and religious or folk beliefs.",
    },
    director: {
      name: "Mark Mylod",
      bio: "Mark Mylod is a British television and film director and executive producer. He is known for his work on the television series Succession and Shameless.",
      birth: "1965",
    },
    imageURL:
      "https://artworks.thetvdb.com/banners/v4/movie/337249/posters/632289ce2fc4d.jpg",
  },
  {
    title: "The Wonder",
    description:
      "Haunted by her past, a nurse travels from England to a remote Irish village in 1862 to investigate a young girl's supposedly miraculous fast.",
    genre: {
      name: "Drama",
      description:
        "In film and television, drama is a category or genre of narrative fiction intended to be more serious than humorous in tone.",
    },
    director: {
      name: "Sebastián Lelio",
      bio: "Sebastián Lelio Watt is a Chilean director, screenwriter, editor and producer. He received critical acclaim for directing the films Gloria and A Fantastic Woman, the latter of which won an Academy Award for Best Foreign Language Film.",
      birth: "1974",
    },
    imageURL:
      "https://artworks.thetvdb.com/banners/v4/movie/245161/posters/6355833b03dff.jpg",
  },
  {
    title: "Stutz",
    description:
      "In candid conversations with actor Jonah Hill, leading psychiatrist Phil Stutz explores his early life experiences and unique, visual model of therapy.",
    genre: {
      name: "Documentary",
      description:
        "A non-fiction motion picture intended to document reality primarily for the purposes of instruction, education, or maintaining a historical record. American film critic and filmmaker, Pare Lorentz, defines a documentary film as a factual film which is dramatic.",
    },
    director: {
      name: "Jonah Hill",
      bio: "Jonah Hill Feldstein is an American actor, comedian, and filmmaker. He is known for his comedic roles in films including Superbad, Knocked Up, 21 Jump Street, This Is the End, and 22 Jump Street.",
      birth: "1983",
    },
    imageURL:
      "https://artworks.thetvdb.com/banners/v4/movie/341151/posters/6372afe725189.jpg",
  },
  {
    title: "Disenchanted",
    description:
      "It has been 15 years since Giselle and Robert wed, but Giselle has grown disillusioned with life in the city, so they move their growing family to the sleepy suburban community of Monroeville in search of a more fairy tale life. Unfortunately, it isn’t the quick fix she had hoped for. Suburbia has a whole new set of rules and a local queen bee, Malvina Monroe, who makes Giselle feel more out of place than ever. Frustrated that her happily ever after hasn’t been so easy to find, she turns to the magic of Andalasia for help, accidentally transforming the entire town into a real-life fairy tale and placing her family’s future happiness in jeopardy. Now, Giselle is in a race against time to reverse the spell and determine what happily ever after truly means to her and her family.",
    genre: {
      name: "Adventure",
      description:
        "Adventure fiction is a type of fiction that usually presents danger, or gives the reader a sense of excitement. Some adventure fiction also satisfies the literary definition of romance fiction.",
    },
    director: {
      name: "Adam Shankman",
      bio: "Adam Michael Shankman is an American film director, producer, writer, dancer, author, actor, and choreographer. He was a permanent judge on season 6–7 of the television program So You Think You Can Dance.",
      birth: "1964",
    },
    imageURL:
      "https://artworks.thetvdb.com/banners/v4/movie/36635/posters/631ccb33d104f.jpg",
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
