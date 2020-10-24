import { Router } from 'express'
import itemControllers from './item.controllers'

const router = Router()

router
  .route('/')
  .get((req, res) => {
    // We can set a status code of the response - can also end the response with .end()
    // res.status(404).end()

    // We can also send back an object/whatever we want - converts to JSON by default
    res.status(404).send({ message: 'not found' })
    // We could add code underneath, but Node wont run it as it will return once a response is done
  })
  .post(itemControllers.createOne)

router
  .route('/:id')
  .get(itemControllers.getOne)
  .put(itemControllers.updateOne)
  .delete(itemControllers.removeOne)

export default router
