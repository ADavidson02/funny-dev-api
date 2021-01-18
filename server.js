
const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json())

app.set('port', 3001);

app.locals.title = 'FunnyDev API';

app.use(cors())
app.options('/api/v1/favorites/:id', cors())


app.locals.favorites = [
  {
    id: 326,
    joke:
      "“Debugging” is like being the detective in a crime drama where you are also the murderer",
  },
  {
    id: 327,
    joke: "!false (It/’s funny because it/’s true.)",
  },
  {
    id: 328,
    joke:
      "I went to a street where the houses were numbered 8k, 16k, 32k, 64k, 128k, 256k and 512k/./It was a trip down Memory Lane.",
  },
  {
    id: 329,
    joke:
      "If doctors were like software engineers, they would say things like “Have you tried killing yourself and being reborn?",
  },
  {
    id: 330,
    joke:
      "The best thing about a Boolean is that even if you are wrong, you are only off by a bit.",
  },
  {
    id: 331,
    joke: "[“hip”,”hip”] (hip hip array!)",
  },
  {
    id: 332,
    joke: 'When Apple employees die, does their life HTML5 in front of their eyes?'
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
  console.log(parsedId)
  const match = app.locals.favorites.find(favorite => parseInt(favorite.id) === parsedId);
  
  if(!match) {
    console.log('match', match)
    return response.status(404).json({error: `No joke found with an id of ${id}.` })
  }
  const updatedFavorites = app.locals.favorites.filter(favorite => parseInt(favorite.id) !== parsedId);
  app.locals.favorites = updatedFavorites;

  return response.status(202).json(app.locals.favorites);
})

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on port ${app.get('port')}.`)
})

module.exports = app;
