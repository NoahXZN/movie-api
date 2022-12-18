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
    director: "Robert Zemeckis",
    genre: "Drama"
  },
  {
    title: "Welcome Home Roscoe Jenkins",
    director: "Malcolm D. Lee",
    genre: "Comedy"
  },
  {
    title: "Major Payne",
    director: "Nick Castle",
    genre: "Comedy"
  },
  {
    title: "Charlie Countryman",
    director: "Fredrik Bond",
    genre: "Romance"
  },
  {
    title: "Saving Private Ryan",
    director: "Steven Speilberg",
    genre: "Drama"
  },
  {
    title: "The Fast and the Furious",
    director: "Rob Cohen",
    genre: "Action"
  },
  {
    title: "Borat! Cultural Learnings of America for Make Benefit Glorious Nation of Kazakhstan",
    director: "Larry Charles",
    genre: "Comedy"
  },
  {
    title: "Step Brothers",
    director: "Adam McKay",
    genre: "Comedy"

  },
  {
    title: "War of the Worlds",
    director: "Steven Speilberg",
    genre: "Action"
  },
  {
    title: "Inglourious Basterds",
    director: "Quentin Tarantino",
    genre: "Action"
  }
];
  

app.use(express.static('public'));
app.use(morgan('common'));

app.get('/', (req, res) => {
    res.send('Welcome to my Moviedatabase');
});

app.get('/movies', (req, res) => {
    res.json(movies);
});

app.get("/documentation", (req, res) => {
    res.sendFile("public/documentation.html", { root: __dirname });
  });

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("Uh Oh, something isn't where it is supposed to be, i'll go looking, please try later");
});

app.post('/users', (req, res) => {
  const newUser = req.body;

  if (newUser.name) {
    newUser.id = uuid.v4();
    users.push(newUser);
    res.status(201).json(newUser)
  }else{
    res.status(400).send('users need names')
  }

})

//UPDATE
app.put('/users/:id', (req, res) => {
  const {id} = req.params;
  const updatedUser = req.body;

  let user = users.find(user => user.id == id);

  if (user) {
    user.name = updatedUser.name;
    res.status(200).json(user)
	}else{
      res.status(400).send('no such user')
    };

})

//CREATE
app.post('/users/:id:movieTitle', (req, res) => {
  const {id, movieTitle} = req.params;
  

  let user = users.find(user => user.id == id);

  if (user) {
    user.favoriteMovies.push(movieTitle);
    res.status(200).send('{movieTitle} has been added to user {id}`s array');
  }else{
      res.status(400).send('no such user')
    }
  })

  //DELETE

  app.delete('/users/:id:movieTitle', (req, res) => {
    const {id, movieTitle} = req.params;
    
  
    let user = users.find(user => user.id == id);
  
    if (user) {
      user.favoriteMovies = user.favoriteMovies.filter(title !== movieTitle);
      res.status(200).send('${movieTitle} has been removed from user ${id}`s array');
    }else{
        res.status(400).send('no such user')
      }
    })


      //DELETE

  app.delete('/users/:id', (req, res) => {
    const {id} = req.params;
    
  
    let user = users.find(user => user.id == id);
  
    if (user) {
      users = users.filter(user => user.id !== id);
      res.status(200).send('user ${id} has been deleted');
    }else{
        res.status(400).send('no such user')
      }
    })



//READ
app.get('/movies', (req, res) => {
  res.status(200).json(movies);
})

//READ
app.get('/movies/:title', (req, res) => {
//  console.log("ss")
  const {title} = req.params;
  const movie = movies.find(movie => movie.title === title);


  if (movie) {
    res.status(200).json(movie);
  }else {
    res.status(400).send('no such movie');
  }
})

//READ
app.get('/movies/genre/:genreName', (req, res) => {
  const {genreName} = req.params;
  const genre = movies.find(movies => movies.Genre.Name === genreName).Genre;


  if (genre) {
    res.status(200).json(genre);
  }else {
    res.status(400).send('no such genre');
  }
})

//READ
app.get('/movies/director/:directorName', (req, res) => {
  const {directorName} = req.params;
  const director = movies.find(movies => movies.Director.Name === directorName).Director;


  if (director) {
    res.status(200).json(director);
  }else {
    res.status(400).send('no such genre');
  }
})

app.listen(8080, () => {
    console.log('Your app is listening on Port 8080.');
});
