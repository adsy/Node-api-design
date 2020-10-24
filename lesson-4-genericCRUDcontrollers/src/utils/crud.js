/* eslint-disable no-unused-vars */
export const getOne = model => async (req, res) => {
  const id = req.params.id
  const userId = req.user._id

  const doc = await model.findOne({ _id: id, createdBy: userId }).exec()

  if (!doc) {
    res.status(404).end()
  }

  res.status(200).json({ data: doc })
}

export const getMany = model => async (req, res) => {
  const docs = await model.find({ createdBy: req.user._id }).exec()

  // send back status 200 and return a Json with the data property containing the array of docs.
  res.status(200).json({ data: docs })
}

export const createOne = model => async (req, res) => {
  // ... - object spread -> same as merging an object.
  // In this case it would have the propertys of the item to create.
  const docs = await model.create({ ...req.body, createdBy: req.user._id })
  res.status(201).json({ data: docs })
}

export const updateOne = model => async (req, res) => {
  const doc = await model.findOneAndUpdate(
    {
      id: req.params._id,
      createdBy: req.user._id
    },
    req.body,
    { new: true }
  )

  if (!doc) res.status(400).end()

  res.status(200).json({ data: doc })
}

export const removeOne = model => async (req, res) => {
  const doc = await model.findOneAndRemove({
    id: req.params.id,
    createdBy: req.user._id
  })

  if (!doc) res.status(400).end()

  res.status(200).json({ data: doc })
}

export const crudControllers = model => ({
  removeOne: removeOne(model),
  updateOne: updateOne(model),
  getMany: getMany(model),
  getOne: getOne(model),
  createOne: createOne(model)
})
