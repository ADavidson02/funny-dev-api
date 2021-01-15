
const express = require('express');
const app = express();
const cors = require('cors')

app.set('port', 3001);
app.use(express.json())
app.use(cors());

app.locals.title = 'FunnyDev API';
// app.locals.favorites = favorites;


app.locals.favorites = [
  {
    id: 326,
    joke: '“Debugging” is like being the detective in a crime drama where you are also the murderer'
  },
  { 
    id: 327, 
    joke: "!false (It/’s funny because it/’s true.)" 
  },
];


app.get('/api/v1/favorites', (request, response) => {
  return response.status(200).json(app.locals.favorites);
})

app.post('/api/v1/favorites', (request, response) => {
  const newJoke = request.body

  app.locals.favorites = [...app.locals.favorites, newJoke]

  response.status(201).json( newJoke)
})

app.delete('/api/v1/favorites/:id', (request, response) => {
  const { id } = request.params;
  const parsedId = parseInt(id);
  const match = app.locals.favorites.find(favorite => parseInt(favorite.id)=== parsedId);

  if(!match) {
    return response.status(404).json({error: `No joke found with an id of ${id}.` })
  }
  const updatedFavorites = app.locals.favorites.filter(favorite => parseInt(favorite.id) !== parsedId);
  app.locals.favorites = updatedFavorites;

  return response.status(202).json(app.locals.favorites);
})

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on port ${app.get('port')}.`)
})
