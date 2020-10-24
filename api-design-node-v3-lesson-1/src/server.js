import express from 'express'
import { json, urlencoded } from 'body-parser'
import morgan from 'morgan'
import cors from 'cors'

export const app = express()
const router = express.Router()

app.disable('x-powered-by')

// All the code below is example of 'middleware' code. Executed before the routes are declared below.

app.use(cors())
app.use(json())
app.use(urlencoded({ extended: true }))
app.use(morgan('dev'))
app.use('/api', router)

// We can create our own custom 'middleware' where we need to call the next() function where it will pass onto
// the (req,res) callback in the route declartion.
const log = (req, res, next) => {
  console.log('logging')
  next()
}

// Have to call localhost:3000/api/me to get {'me':'hello} returned as an object. App registers the 'router' middleware we created under the /api route.
// Use router if you didn't want to put all your links in the same file, or if your API had its own set of rules.
router.get('/me', (req, res) => {
  res.send({
    me: 'hello'
  })
})

// To create a route and GET data - can use app.get for HTTP Get request.
// Takes the string for the route, and then a callback function which takes a req,res and next function.

app.get('/', log, (req, res) => {
  // Can send back data using the res.send() function
  res.send('Hello World')
})

app.post('/', (req, res) => {
  console.log(req.body)
  res.send('Message logged.')
})

// Put is REST call for updating a resource
app.put('/data', (req, res) => {})

// Delete is REST call for deleting a resource
app.delete('/data', (req, res) => {})

app.get('/data', (req, res) => {
  res.send({
    message: 'Data is sent via the data route as well'
  })
})

app.post('/data', (req, res) => {
  console.log(req.body)
  res.send('Data sent to server')
})

// Example Routers
const routes = [
  'get /cat',
  'get /cat/:id',
  'post /cat/',
  'put /cat/:id',
  'delete /cat/:id'
]

// We can define the callback functions of the required verbs for one route in particular which is used multiple times.
// Can still pass in controllers and middleware to the verb functions.
router
  .route('/cat')
  .get(() => {})
  .post(() => {})

router
  .route('/cat/:id')
  .get(() => {})
  .put(() => {})
  .delete(() => {})

// Function starts the server - specify a port for us to listen to.
export const start = () => {
  app.listen(3000, () => {
    console.log('Listing on https://localhost:3000')
  })
}
