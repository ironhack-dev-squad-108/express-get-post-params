const express = require('express')
const path = require('path')
const bodyParser = require('body-parser') // NEW

const app = express()

app.use(bodyParser.urlencoded({ extended: true })) // NEW

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'hbs');

// Route: GET http://localhost:3000/
app.get('/', function (req, res) {
  res.render("index")
})

// NEW: 'get'=>'post'
app.post('/login', function (req, res) {
  console.log("req.body = ", req.body) // NEW
  if (req.body.username === 'maxence' && req.body.password === 'chartreuse') {
    res.render("secret")
  }
  else {
    res.redirect('/') // NEW: redirects the user to a new page: GET /
  }
})


// Route: GET http://localhost:3000/users/whatIWant
app.get('/users/:username', (req, res, next) => {
  console.log('TCL: req.params.username', req.params.username)
  // Render the view profile.hbs
  res.render('profile', {
    username: req.params.username
  })
})

// Example:
// http://localhost:3000/a/b/c/d
// http://localhost:3000/apple/b/carrot/d
app.get('/:a/b/:c/d', (req, res, next) => {
  res.send(req.params)
})

app.get('/en/locations/:city', (req, res, next) => {
  res.send(req.params.city)
})

// Example: http://localhost:3000/search?city=Barcelona&country=Spain
app.get('/search', (req, res, next) => {
  let greetings = 'Hello'
  if (req.query.city === 'Berlin') greetings = 'Hallo'
  if (req.query.city === 'Paris') greetings = 'Bonjour'
  let nbOfMillisecondsBetweenDates = 
    new Date(req.query['end-date']) - new Date(req.query['start-date'])
  let nbOfDays = nbOfMillisecondsBetweenDates/ (1000*24*60*60)
  res.render('search', {
    greetings,
    nbOfDays
  })
})



app.listen(3000, () => console.log('App listening on port 3000!'))
