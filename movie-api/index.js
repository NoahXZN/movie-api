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

