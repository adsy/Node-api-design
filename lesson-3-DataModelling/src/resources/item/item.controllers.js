/* eslint-disable no-unused-vars */
import mongoose from 'mongoose'
import { Item } from './item.model'
import { connect } from '../../utils/db'

const run = async () => {
  await connect('mongodb://localhost:27017/api-test')
  const item = await Item.create({
    name: 'CleanUp',
    created: mongoose.Types.ObjectId(),
    list: mongoose.Types.ObjectId()
  })

  console.log(item)

  // exec function turns the fake promise into a real promise and also ends the query - no more added methods
  console.log(await Item.findById(item._id).exec())

  // Code below will find and item by that id
  const updated = await Item.findByIdAndUpdate(
    item._id,
    { name: 'eat' },
    { new: true }
  ).exec()

  const removed = await Item.findByIdAndRemove(item._id).exec()

  // Returns the updated item in the update function
  console.log(updated)

  console.log(removed)
}

run()

// GET / Read many
// GET /:id Read one
// POST / Create one
// PUT /:id Update one
// DELETE /:id Delete one
