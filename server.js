
const express = require('express');
const app = express();
const cors = require('cors')

app.set('port', 3001);
app.use(express.json())
app.use(cors());

app.locals.title = 'FunnyDev API';
// app.locals.favorites = favorites;


app.locals.favorites = [
  {id: 22, joke: 'haha'},
  {id: 4, setup: 'why did the chicken cross the road', delivery: 'because it can'}
]


app.get('/api/v1/favorites', (request, response) => {
  return response.status(200).json(app.locals.favorites);
})

// app.get("/api/v1/favorites/:id", (request, response) => {
//   response.json({
//     id: request.params.id,
//   });
// });

// app.get("/api/v1/favorites/:id", (request, response) => {
//   const id = parseInit(request.params.id);
//   const favorite = app.locals.favorites.find((favorite) => favorite.id === id);

//   if (!favorite) {
//     response.sendStatus(404);
//   }
//   response.json(favorite);
// });

app.post('/api/v1/favorites', (request, response) => {
  const newJoke = request.body

  app.locals.favorites = [...app.locals.favorites, newJoke]

  response.status(201).json( newJoke)
})

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on port ${app.get('port')}.`)
})